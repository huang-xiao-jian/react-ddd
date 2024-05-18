import { ContainerModule } from 'inversify';
import { SecurityHttpClientExtension } from './http/SecurityHttpClientExtension';

/**
 * TODO - 仅作为示例，具体插件扫描加载暂时搁置
 */
export class EnvironmentExtensionModule {
  static create(): ContainerModule {
    return new ContainerModule(async (bind) => {
      // 扩展插件
      bind(SecurityHttpClientExtension).toSelf();
    });
  }
}
