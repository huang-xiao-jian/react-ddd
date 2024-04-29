import { ContainerModule } from 'inversify';
import { FormExtensionProtocol } from './Form';
import { HttpExtensionProtocol, HttpInterceptorExtensionProtocol } from './http';
import { I18nExtensionProtocol } from './i18n';
import { QiankunExtensionProtocol } from './qiankun';

export class PluginModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      /* ==================================================== */
      /* =========== Http ========== */
      /* ==================================================== */
      bind(HttpExtensionProtocol).toSelf();
      bind(HttpInterceptorExtensionProtocol).toSelf();
      /* ==================================================== */
      /* =========== Qiankun ========== */
      /* ==================================================== */
      bind(QiankunExtensionProtocol).toSelf();
      /* ==================================================== */
      /* =========== I18n ========== */
      /* ==================================================== */
      bind(I18nExtensionProtocol).toSelf();
      /* ==================================================== */
      /* =========== Form ========== */
      /* ==================================================== */
      bind(FormExtensionProtocol).toSelf();
    });
  }
}
