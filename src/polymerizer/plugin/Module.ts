import { ContainerModule } from 'inversify';
import { HttpExtensionProtocol } from './Http';

export class PluginModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      bind(HttpExtensionProtocol).toSelf();
    });
  }
}
