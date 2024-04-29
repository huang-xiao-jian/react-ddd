import { FormilyConnector } from '@/layer/environment/di';
import { FormExtensionProtocol } from '@/layer/plugin';
import { ContainerModule } from 'inversify';
import { HumanNameConnector } from './entity/HumanNameConnector';
import { HUMAN_NAME_RULE } from './vo/HumanRule';

export class HumanModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      // 统一使用 FormilyConnector 作为标识，覆写逻辑
      bind(FormilyConnector)
        .to(HumanNameConnector)
        .whenTargetNamed(HUMAN_NAME_RULE)
        .onActivation(async (context, connector) => {
          const protocol = context.container.get(FormExtensionProtocol);
          const artifact = await protocol.formily.for(HUMAN_NAME_RULE).promise(connector);

          return artifact;
        });
    });
  }
}
