import { DocumentReference, DocumentType } from '@/polymerizer/document/vo';

export abstract class DocumentUploader {
  /**
   * 文件上传处理
   */
  abstract batchUpload(documentTypes: DocumentType[], documentFiles: DocumentReference[]): Promise<any>;
}
