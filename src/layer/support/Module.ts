import { ContainerModule } from 'inversify';

export class SupportExtensionModule {
  static create(): ContainerModule {
    return new ContainerModule(async (bind) => {});
  }
}

export class SupportModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {});
  }
}
