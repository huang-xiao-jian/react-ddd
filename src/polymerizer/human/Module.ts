import { FormilyConnector, FormilyConnectorExtension } from '@/layer/environment/di';
import { ContainerModule } from 'inversify';
import { HumanNameConnector } from './entity/HumanNameConnector';
import { HUMAN_NAME_CONNECTOR } from './vo/HumanRule';

export class HumanModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      bind(HumanNameConnector).toSelf();
      // 统一使用 FormilyConnector 作为标识，覆写逻辑
      bind(FormilyConnector)
        .toDynamicValue((context) => context.container.get(HumanNameConnector))
        .whenTargetNamed(HUMAN_NAME_CONNECTOR)
        .onActivation(async (context, connector) => {
          const extension = await context.container.getNamedAsync(FormilyConnectorExtension, HUMAN_NAME_CONNECTOR);
          const artifact = extension.decorate(connector);

          return artifact;
        });
    });
  }
}
