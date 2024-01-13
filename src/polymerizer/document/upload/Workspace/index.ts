import { DocumentUploader } from '@/polymerizer/document/port';
import { Evt } from 'evt';
import { injectable, postConstruct, preDestroy } from 'inversify';
import { isNil } from 'lodash-es';
import { action, computed, makeObservable, observable } from 'mobx';
import { DocumentUploadHotzone, DocumentUploadHotzoneFactory } from '../Hotzone';
import { DocumentUploadExternalEvent, ExternalModel, InternalModel, type DocumentUploadInternalEvent } from './event';

@injectable()
export class DocumentUploadWorkspace {
  /**
   * 内部 Action 关联终止信号
   */
  private readonly signal$ = Evt.newCtx();

  @action.bound
  private onDispatch(action: DocumentUploadInternalEvent) {
    // 处理内部状态
    switch (action.type) {
      case 'UPLOAD_BEGIN':
        this.saving = true;
        break;
      case 'UPLOAD_FAILURE':
        this.saving = false;
        break;
      case 'UPLOAD_SUCCESS':
        this.saving = false;
        this.hotzone$ = undefined;
        break;
      default:
        break;
    }
  }

  @postConstruct()
  private onInit() {
    this.dispatcher.attach(this.signal$, this.onDispatch);
  }

  @preDestroy()
  private onDestroy() {
    this.signal$.done();
  }

  constructor(
    private readonly uploader: DocumentUploader,
    private readonly hotzoneFactory: DocumentUploadHotzoneFactory,
  ) {
    makeObservable(this);
  }

  /**
   * 内部事件总线访问端口
   */
  public readonly dispatcher = Evt.create<DocumentUploadInternalEvent>();

  /**
   * 事件总线访问端口
   */
  public readonly broadcaster = Evt.create<DocumentUploadExternalEvent>();

  /**
   * 工作区内核聚合根
   */
  @observable.ref hotzone$?: DocumentUploadHotzone;

  /**
   * 上传工作区可见性
   */
  @computed
  get visible() {
    return !isNil(this.hotzone$);
  }

  /**
   * 数据提交
   */
  @observable.ref saving = false;

  /**
   * 接入层，激活工作区
   */
  @action.bound
  onActive() {
    this.hotzone$ = this.hotzoneFactory.mount();
  }

  /**
   * 接入层，静默工作区
   */
  @action.bound
  onInactive() {
    this.hotzone$ = undefined;
    this.hotzoneFactory.unmount();
  }

  /**
   * 接入层，确认执行提交
   */
  @action.bound
  onOk() {
    // 逻辑上保证变量不为空，如果为空，说明逻辑出现严重问题，第一时间报错
    this.hotzone$!.values().then(async ({ documentTypes, documentFiles }) => {
      this.dispatcher.post(InternalModel.events.UPLOAD_BEGIN());

      try {
        await this.uploader.batchUpload(documentTypes, documentFiles);

        this.dispatcher.post(InternalModel.events.UPLOAD_SUCCESS());
        this.broadcaster.post(ExternalModel.events.SEAL_PIPELINE());
      } catch (error) {
        this.dispatcher.post(InternalModel.events.UPLOAD_FAILURE(error));
      }
    });
  }

  /**
   * 接入层，取消文件上传
   */
  @action.bound
  onCancel() {
    this.broadcaster.post(ExternalModel.events.CANCEL_PIPELINE());
  }
}
