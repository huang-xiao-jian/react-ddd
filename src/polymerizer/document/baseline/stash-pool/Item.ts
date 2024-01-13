import { UploadFile } from 'antd';
import { action, makeObservable, observable } from 'mobx';
import { DocumentReference, DocumentRemoteReference } from '../../vo';
import { StashPoolProtocol } from './Protocol';
import { StashItemStatus } from './Status';

export class StashPoolItem {
  /**
   * 适配 antd#Upload 组件，初始化阶段获取，后续保持不变
   */
  public readonly id: string;

  /**
   * 标准化中间状态
   */
  @observable.ref status: StashItemStatus;

  /**
   * 附件注释信息
   */
  @observable.ref annotation = '';

  /**
   * 是否处于添加注释模式
   */
  @observable.ref annotating = false;

  /**
   * 无语义引用准实时文件
   */
  @observable.ref file: UploadFile<DocumentRemoteReference>;

  private transformFileStatus(status: UploadFile['status']): StashItemStatus {
    const result = // prettier-ignore
      status === 'uploading'
        ? StashItemStatus.Uploading
        : status === 'error'
          ? StashItemStatus.Exception
          : StashItemStatus.Uploaded;

    return result;
  }

  constructor(
    file: UploadFile<DocumentRemoteReference>,
    private readonly protocol: StashPoolProtocol,
  ) {
    this.id = file.uid;
    this.file = file;
    this.status = this.transformFileStatus(file.status);

    makeObservable(this);
  }

  /**
   * 接入层，接收用户删除动作
   */
  @action.bound
  onRemove() {
    this.protocol.removal.call(this.id);
  }

  /**
   * 接入层，接收用户输入注释信息
   */
  @action.bound
  onAnnotation(annotation: string) {
    this.annotation = annotation;
  }

  /**
   * 接入层，接收用户切换注释模式
   */
  @action.bound
  onSwitchAnnotate() {
    this.protocol.annotate.call(this.id);
  }

  /**
   * 接入层，被动接受 repository 调度
   */
  @action.bound
  onActiveAnnotate() {
    this.annotating = true;
  }

  /**
   * 接入层，被动接受 repository 调度
   */
  @action.bound
  onInactiveAnnotate() {
    this.annotating = false;
  }

  /**
   * 接入层，被动接受 repository 调度
   */
  @action.bound
  onReceiveFile(file: UploadFile<DocumentRemoteReference>) {
    this.file = file;
    this.status = this.transformFileStatus(file.status);
  }

  /**
   * 文件上传引用元信息
   */
  @action.bound
  values(): DocumentReference {
    if (this.status === StashItemStatus.Uploaded) {
      const reference: DocumentReference = {
        ...this.file.response!,
        annotation: this.annotation,
        receivedTime: Date.now(),
      };

      return reference;
    }

    throw new Error(`[StashItemScheduler] invalid action for ${this.status}`);
  }
}
