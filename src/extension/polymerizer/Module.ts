import { FormilyConnectorExtension } from '@/layer/environment/di';
import { HUMAN_NAME_CONNECTOR } from '@/polymerizer/human';
import { ContainerModule } from 'inversify';
import { HumanNameConnectorExtension } from './human';

/**
 * TODO - 仅作为示例，具体插件扫描加载暂时搁置
 */
export class PolymerizerExtensionModule {
  static create(): ContainerModule {
    return new ContainerModule(async (bind) => {
      // self
      bind(HumanNameConnectorExtension).toSelf();
      // extension connection
      bind(FormilyConnectorExtension)
        .toDynamicValue((context) => context.container.get(HumanNameConnectorExtension))
        .whenTargetNamed(HUMAN_NAME_CONNECTOR);
    });
  }
}
