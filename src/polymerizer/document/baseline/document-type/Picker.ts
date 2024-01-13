import { DocumentType } from '@/polymerizer/document/baseline/vo';
import { Form, createForm } from '@formily/core';
import { injectable } from 'inversify';
import { cloneDeep } from 'lodash-es';
import { DocumentTypeReflector } from './Reflector';
import { DocumentTypeRuleConnector } from './RuleConnector';
import { DocumentTypePickerPayload } from './interface';

/**
 * 附件上传、附件组编辑逻辑复用
 */
@injectable()
export class DocumentTypePicker {
  public readonly form: Form<DocumentTypePickerPayload>;

  // , docTypeCodes?: string[]
  constructor(
    private readonly rule: DocumentTypeRuleConnector,
    private readonly reflector: DocumentTypeReflector,
  ) {
    this.form = createForm<DocumentTypePickerPayload>({
      initialValues: {},
      effects() {
        // 类型互斥规则
        rule.connect();
      },
    });
  }

  /**
   * 外部使用数据需要元数据，将用户选择转化为标准负荷
   */
  async values(): Promise<DocumentType[]> {
    await this.form.validate();

    const payload = cloneDeep(this.form.values);
    const documentTypes = this.reflector.reflect(payload.docTypeCodes);

    return documentTypes;
  }
}
