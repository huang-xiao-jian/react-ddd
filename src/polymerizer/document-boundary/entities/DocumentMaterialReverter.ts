import { FundamentalDocumentMaterial } from '@/polymerizer/document-fundamental';
import { DocumentReference, DocumentType, DocumentTypeCategory } from '@/polymerizer/document/vo';
import dayjs from 'dayjs';
import { injectable } from 'inversify';
import { first, forEach, map } from 'lodash-es';
import { v4 } from 'uuid';

/**
 * 保存上传数据时，域内数据结构向基础设施数据结构转换
 */
@injectable()
export class DocumentMaterialReverter {
  revert(documentTypes: DocumentType[], documentFiles: DocumentReference[]): FundamentalDocumentMaterial[] {
    const documents: FundamentalDocumentMaterial[] = [];
    const fileGroupNo = first(documentTypes)?.category === DocumentTypeCategory.Group ? v4() : undefined;

    // 数据逆向转换
    forEach(documentFiles, (file) => {
      const doc: FundamentalDocumentMaterial = {
        id: file.code,
        code: file.code,
        url: file.url,
        docName: file.name,
        docTypeCodes: map(documentTypes, 'code'),
        description: file.annotation,
        fileGroupNo,
        receivedTime: dayjs(file.receivedTime).format(),
      };

      documents.push(doc);
    });

    return documents;
  }
}
