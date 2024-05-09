import { ContainerModule } from 'inversify';
import { JapaneseOverridePlugin } from './JapaneseOverridePlugin';

export class I18nExtensionModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      // TODO - 仅作为示例，具体插件扫描加载暂时搁置
      // 扩展插件
      bind(JapaneseOverridePlugin).toSelf();
    });
  }
}
