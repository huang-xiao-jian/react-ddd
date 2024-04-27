import { EnvironmentModule } from '@/polymerizer/environment';
import { HttpExtensionProtocol, PluginModule } from '@/polymerizer/plugin';
import { Container } from 'inversify';

async function bootstrap() {
  const container = new Container({
    defaultScope: 'Singleton',
  });

  // plugin level
  container.load(PluginModule.create());
  // environment level
  await container.loadAsync(EnvironmentModule.create(container.get(HttpExtensionProtocol)));
}
