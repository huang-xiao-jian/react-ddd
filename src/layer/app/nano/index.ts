import { EnvironmentModule } from '@/layer/environment';
import { AsyncLaunchGuardian } from '@/layer/environment/di';
import { PluginModule } from '@/layer/plugin';
import { SupportExtensionModule, SupportModule } from '@/layer/support';
import { Container } from 'inversify';

export async function mount() {
  const container = new Container({
    defaultScope: 'Singleton',
  });

  // plugin level
  container.load(PluginModule.create());
  // environment level
  container.load(EnvironmentModule.create());
  // support level
  container.load(SupportModule.create());
  container.load(SupportExtensionModule.create());
  // force async launch
  container.bind(AsyncLaunchGuardian).toSelf();

  // 利用 inversify 自身机制处理阻塞实例化
  await container.getAllAsync(AsyncLaunchGuardian);
}
