import { DocumentTypePicker } from '@/polymerizer/document/baseline/document-type';
import { StashPool } from '@/polymerizer/document/baseline/stash-pool';
import { injectable } from 'inversify';
import { computed, makeObservable } from 'mobx';

@injectable()
export class DocumentUploadHotzone {
  constructor(
    public readonly documentType$: DocumentTypePicker,
    public readonly documentStashPool$: StashPool,
  ) {
    makeObservable(this);
  }

  @computed
  get invalid() {
    return this.documentStashPool$.invalid;
  }

  async values() {
    const documentTypes = await this.documentType$.values();
    const documentFiles = await this.documentStashPool$.values();

    return {
      documentTypes,
      documentFiles,
    };
  }
}
