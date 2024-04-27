import { ContainerModule } from 'inversify';
import { HttpExtensionProtocol } from './http';
import { I18nExtensionProtocol } from './i18n';
import { QiankunExtensionProtocol, QiankunMicroApplicationRegistry } from './qiankun';

export class PluginModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      /* ==================================================== */
      /* =========== Http ========== */
      /* ==================================================== */
      bind(HttpExtensionProtocol).toSelf();
      /* ==================================================== */
      /* =========== Qiankun ========== */
      /* ==================================================== */
      bind(QiankunMicroApplicationRegistry).toSelf();
      bind(QiankunExtensionProtocol).toSelf();
      /* ==================================================== */
      /* =========== I18n ========== */
      /* ==================================================== */
      bind(I18nExtensionProtocol).toSelf();
    });
  }
}
