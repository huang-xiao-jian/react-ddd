import { DocumentTypeManifest } from '@/polymerizer/document/port';
import { FieldDataSource, Form, onFormReact } from '@formily/core';
import { injectable } from 'inversify';
import { map } from 'lodash-es';
import { DocumentTypeMutuallyExclusiveRule } from './MutuallyExclusiveRule';
import { DocumentTypePickerPayload } from './interface';

/**
 * Group | Single 类型互斥
 * 暂时硬绑定 formily 框架
 */
@injectable()
export class DocumentTypeRuleConnector {
  constructor(
    private readonly manifest: DocumentTypeManifest,
    private readonly mutuallyExclusiveRule: DocumentTypeMutuallyExclusiveRule,
  ) {
    console.log(manifest);
  }

  /**
   * 注意在 formily effects 上下文执行，否则无效
   * TODO - 是否有办法确认 formily effects 上下文
   */
  connect() {
    onFormReact((form: Form<DocumentTypePickerPayload>) => {
      const docTypeCodes = form.values.docTypeCodes;
      const disabledDocTypes = this.mutuallyExclusiveRule.execute(docTypeCodes);
      const dataSource: FieldDataSource = map(this.manifest.documentTypes, (item) => {
        return {
          label: item.name,
          value: item.code,
          disabled: disabledDocTypes.has(item.code),
        };
      });

      form.setFieldState('docTypeCodes', {
        dataSource,
      });
    });
  }
}
