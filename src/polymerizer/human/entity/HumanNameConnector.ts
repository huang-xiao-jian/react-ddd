import { FormilyConnector } from '@/layer/environment/di';
import { ConfigReader, HumaneNameElement, HumaneNameElements } from '@/layer/support/config';
import { FormPath, onFormMount, onFormReact } from '@formily/core';
import { injectable, postConstruct } from 'inversify';
import { join } from 'lodash-es';

@injectable()
export class HumanNameConnector extends FormilyConnector {
  /**
   * 实例化阶段动态获取
   */
  private elements: HumaneNameElements = new Set();

  /**
   * 异步阻塞获取姓名相关配置
   */
  @postConstruct()
  async onLaunch(): Promise<any> {
    this.elements = await this.configReader.read('HumanName');
  }

  constructor(private readonly configReader: ConfigReader) {
    super();
  }

  /**
   * 规则联动
   * @param [baseline] - 默认使用表单根路径
   */
  connect(baseline: FormPath = new FormPath('')): void {
    const fields: Record<HumaneNameElement, FormPath> = {
      first: baseline.concat('first'),
      middle: baseline.concat('middle'),
      last: baseline.concat('last'),
      full: baseline.concat('full'),
    };

    /**
     * 三要素齐全，全名自动填充，禁止手动
     */
    onFormMount((form) => {
      if (this.elements.size >= 3) {
        form.setFieldState(fields.full, {
          disabled: true,
        });
      }
    });

    onFormReact((form) => {
      if (this.elements.size >= 3) {
        const candidates = [
          form.getValuesIn(fields.first),
          form.getValuesIn(fields.middle),
          form.getValuesIn(fields.last),
        ];

        form.setValuesIn(fields.full, join(candidates, ' '));
      }
    });
  }
}
