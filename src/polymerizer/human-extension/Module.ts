import { ContainerModule } from 'inversify';
import { HumanNameConnectorExtension } from './entity/HumanNameConnector';

export class HumanExtensionModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      bind(HumanNameConnectorExtension).toSelf();
    });
  }
}
