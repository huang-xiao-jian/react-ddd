import { DocumentTypeManifest } from '@/polymerizer/document/port';
import { DocumentType } from '@/polymerizer/document/vo';
import { injectable } from 'inversify';
import { filter } from 'lodash-es';

/**
 * 字面量选项反向转换原始选项
 * 实践中存在需求与价值
 */
@injectable()
export class DocumentTypeReflector {
  constructor(private readonly manifest: DocumentTypeManifest) {}

  reflect(docTypeCodes: string[]): DocumentType[] {
    const selection = new Set(docTypeCodes);
    const documentTypes = filter(this.manifest.documentTypes, (item) => selection.has(item.code));

    return documentTypes;
  }
}
