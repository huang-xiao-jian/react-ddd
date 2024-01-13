import { DocumentType } from '@/polymerizer/document/vo';
import { injectable } from 'inversify';

@injectable()
export abstract class DocumentTypeManifest {
  /**
   * 持续性数据源更新
   */
  abstract documentTypes: DocumentType[];
}
