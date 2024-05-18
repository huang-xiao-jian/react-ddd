import { FormilyConnectorExtension } from '@/layer/environment/di';
import { HUMAN_NAME_CONNECTOR } from '@/polymerizer/human';
import { ContainerModule } from 'inversify';
import { HumanNameConnectorExtension } from './entity/HumanNameConnector';

export class HumanExtensionModule {
  static create(): ContainerModule {
    return new ContainerModule(async (bind) => {
      // 原始扩展协议
      bind(HumanNameConnectorExtension).toSelf();
      // 扩展类实例
      bind(FormilyConnectorExtension)
        .toDynamicValue((context) => context.container.get(HumanNameConnectorExtension))
        .whenTargetNamed(HUMAN_NAME_CONNECTOR);
    });
  }
}
