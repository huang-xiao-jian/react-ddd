import { DocumentReference, DocumentRemoteReference } from '@/polymerizer/document/vo';
import { UploadFile } from 'antd';
import { injectable, postConstruct } from 'inversify';
import { concat, filter, find, forEach, map, partition, reject, some } from 'lodash-es';
import { action, computed, makeObservable, observable } from 'mobx';
import { StashPoolItem } from './Item';
import { StashPoolItemFactory } from './ItemFactory';
import { StashPoolProtocol } from './Protocol';
import { StashItemStatus } from './Status';

@injectable()
export class StashPool {
  @postConstruct()
  private onInit() {
    this.protocol.removal.tap('RepositoryImplement', (id) => {
      this.onRemove(id);
    });
    this.protocol.annotate.tap('RepositoryImplement', (id) => {
      this.onAnnotate(id);
    });
  }

  constructor(
    private readonly protocol: StashPoolProtocol,
    private readonly stashPoolItemFactory: StashPoolItemFactory,
  ) {
    makeObservable(this);
  }

  /**
   * 上传的文档集合
   */
  @observable.ref documents: StashPoolItem[] = [];

  /**
   * 当前处于上传状态的文件
   */
  @observable blockings: Set<string> = new Set();

  /**
   * 处于编辑模式的 Key
   */
  @computed
  get annotatingKey() {
    return find(this.documents, (item) => item.annotating)?.id;
  }

  @computed
  get invalid() {
    return some([
      // 没有上传任何文件
      this.documents.length === 0,
      // 存在正在上传的文件
      this.blockings.size > 0,
    ]);
  }

  /**
   * 文件分发时，判断新增、更新
   */
  @computed
  get ids() {
    return new Set(map(this.documents, 'id'));
  }

  @action.bound
  onRemove(id: string) {
    // 保留未删除附件
    this.documents = reject(this.documents, ['id', id]);
  }

  @action.bound
  onAnnotate(id: string) {
    const [matches, mismatches] = partition(this.documents, ['id', id]);

    // 未匹配附件，显式关闭注释模式
    forEach(mismatches, (scheduler) => {
      scheduler.onInactiveAnnotate();
    });
    // 匹配附件，根据当前状态切换注释模式
    forEach(matches, (scheduler) => {
      scheduler.annotating ? scheduler.onInactiveAnnotate() : scheduler.onActiveAnnotate();
    });
  }

  /**
   * 统一适配 antd 文件上传组件
   */
  @action.bound
  onReceiveFile(file: UploadFile<DocumentRemoteReference>) {
    // 更新逻辑
    if (this.ids.has(file.uid)) {
      forEach(filter(this.documents, ['id', file.uid]), (stash) => {
        stash.onReceiveFile(file);
      });
    }
    // 新增逻辑
    else {
      this.documents = concat(this.documents, this.stashPoolItemFactory.create(file));
    }

    // 适配上传中文件阻塞规则
    if (file.status === 'uploading') {
      this.blockings.add(file.uid);
    } else {
      this.blockings.delete(file.uid);
    }
  }

  /**
   * 快速获取内部数据
   */
  async values(): Promise<DocumentReference[]> {
    return map(
      filter(this.documents, ['status', StashItemStatus.Uploaded]),
      // 已使用 StashItemStatus.Uploaded 排除，values 必然返回 DocumentReference
      // 否则判定为逻辑错误，直接抛出错误即可
      (stash) => stash.values(),
    );
  }
}
