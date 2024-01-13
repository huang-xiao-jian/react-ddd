import { DocumentTypeManifest } from '@/polymerizer/document/port';
import { DocumentType, DocumentTypeCategory } from '@/polymerizer/document/vo';
import { injectable } from 'inversify';
import { first, forEach, isEmpty, isNil } from 'lodash-es';

@injectable()
export class DocumentTypeMutuallyExclusiveRule {
  private readonly singletons: Set<string>;

  private readonly multiples: Set<string>;

  constructor(manifest: DocumentTypeManifest) {
    this.singletons = new Set();
    this.multiples = new Set();

    forEach(manifest.documentTypes, (item) => {
      item.category === DocumentTypeCategory.Group ? this.multiples.add(item.code) : this.singletons.add(item.code);
    });
  }

  /**
   * 计算需要被禁止选择的选项集合
   */
  execute(selections?: DocumentType['code'][]): Set<string> {
    /**
     * 未选择不限制选项
     */
    if (isNil(selections) || isEmpty(selections)) {
      return new Set();
    }

    // 仅用来规避首项空检测
    const initial = first(selections);

    if (isNil(initial)) {
      return new Set();
    }

    /**
     * 使用第一选项匹配
     */
    return this.multiples.has(initial) ? new Set(this.singletons) : new Set(this.multiples);
  }
}
