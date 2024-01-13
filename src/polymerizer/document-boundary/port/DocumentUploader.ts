import { FundamentalDocumentUploader } from '@/polymerizer/document-fundamental';
import { DocumentUploader } from '@/polymerizer/document/port';
import { DocumentReference, DocumentType } from '@/polymerizer/document/vo';
import { injectable } from 'inversify';
import { DocumentMaterialReverter } from '../entities/DocumentMaterialReverter';

@injectable()
export class DocumentUploaderImpl implements DocumentUploader {
  constructor(
    private readonly documentMaterialReverter: DocumentMaterialReverter,
    private readonly fundamentalDocumentUploadHandler: FundamentalDocumentUploader,
  ) {}

  async batchUpload(documentTypes: DocumentType[], documentFiles: DocumentReference[]): Promise<any> {
    await this.fundamentalDocumentUploadHandler.batchUpload(
      this.documentMaterialReverter.revert(documentTypes, documentFiles),
    );
  }
}
