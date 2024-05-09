import { ContainerModule } from 'inversify';

export class ConfigDomainModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {});
  }
}
