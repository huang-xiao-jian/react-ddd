import { ContainerModule } from 'inversify';
import { JapaneseOverridePlugin } from './i18n';

export class SupportExtensionModule {
  static create(): ContainerModule {
    return new ContainerModule(async (bind) => {
      bind(JapaneseOverridePlugin).toSelf();
    });
  }
}
