import { FormilyConnector } from '@/layer/environment/di';
import { FormExtensionProtocol } from '@/layer/plugin';
import { ConfigReader, HumaneNameElement } from '@/layer/support/config';
import { HUMAN_NAME_RULE } from '@/polymerizer/human';
import { FormPath, onFormReact } from '@formily/core';
import { injectable } from 'inversify';
import { join } from 'lodash-es';

@injectable()
export class HumanNameConnectorExtension {
  /**
   * 实例化阶段动态获取
   */
  constructor(protocol: FormExtensionProtocol, configReader: ConfigReader) {
    protocol.formily.for(HUMAN_NAME_RULE).tapPromise(HUMAN_NAME_RULE, async (basement) => {
      const elements = await configReader.read('HumanName');
      const connector: FormilyConnector = {
        connect(baseline = new FormPath('')) {
          const separator = ' / ';
          const fields: Record<HumaneNameElement, FormPath> = {
            first: baseline.concat('first'),
            middle: baseline.concat('middle'),
            last: baseline.concat('last'),
            full: baseline.concat('full'),
          };
          /**
           * 逻辑调整示例，修改拼接连接符号，忽略禁用逻辑
           */
          onFormReact((form) => {
            if (elements.size >= 3) {
              const candidates = [
                form.getValuesIn(fields.first),
                form.getValuesIn(fields.middle),
                form.getValuesIn(fields.last),
              ];

              form.setValuesIn(fields.full, join(candidates, separator));
            }
          });
        },
      };

      return connector;
    });
  }
}
