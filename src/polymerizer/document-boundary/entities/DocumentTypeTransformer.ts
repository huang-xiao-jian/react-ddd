import { FundamentalDocumentType, YesOrNo } from '@/polymerizer/document-fundamental';
import { DocumentType, DocumentTypeCategory } from '@/polymerizer/document/vo';
import { injectable } from 'inversify';
import { map } from 'lodash-es';

@injectable()
export class DocumentTypeTransformer {
  transform(documentType: FundamentalDocumentType): DocumentType {
    const response: DocumentType = {
      name: documentType.attachmentName,
      code: documentType.attachmentCode,
      category: documentType.isMulti === YesOrNo.Yes ? DocumentTypeCategory.Group : DocumentTypeCategory.Singleton,
    };

    return response;
  }

  batchTransform(documentTypes: FundamentalDocumentType[]): DocumentType[] {
    return map(documentTypes, (documentType) => this.transform(documentType));
  }
}
