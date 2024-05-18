import { FormilyConnector, FormilyConnectorExtension } from '@/layer/environment/di';
import { ConfigReader, HumaneNameElements } from '@/layer/support/config';
import { FormPath } from '@formily/core';
import { injectable, postConstruct } from 'inversify';

@injectable()
export class HumanNameConnectorExtension extends FormilyConnectorExtension {
  /**
   * 实例化阶段动态获取
   */
  private elements: HumaneNameElements = new Set();

  /**
   * 异步阻塞获取姓名相关配置
   */
  @postConstruct()
  private async onInit(): Promise<any> {
    this.elements = await this.configReader.read('HumanName');
  }

  constructor(private readonly configReader: ConfigReader) {
    super();
  }

  decorate(basement: FormilyConnector): FormilyConnector {
    const connector: FormilyConnector = {
      connect(baseline = new FormPath('')) {
        // 仅作为示例使用，清除所有功能
      },
    };

    return connector;
  }
}
