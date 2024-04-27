import { ContainerModule } from 'inversify';
import { HttpExtensionProtocol } from './entity/Http';
import { QiankunExtensionProtocol, QiankunMicroApplicationRegistry } from './entity/Qiankun';

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
    });
  }
}
