import { DocumentTypeManifest } from '@/polymerizer/document/port';
import { DocumentType } from '@/polymerizer/document/vo';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';

@injectable()
export class DocumentTypeDeliverImpl extends DocumentTypeManifest {
  constructor() {
    super();
    makeObservable(this);
  }

  @observable.ref documentTypes: DocumentType[] = [];

  /**
   * 支持响应式与命令式风格
   */
  @action.bound
  onReceive(documentTypes: DocumentType[]) {
    this.documentTypes = documentTypes;
  }
}
