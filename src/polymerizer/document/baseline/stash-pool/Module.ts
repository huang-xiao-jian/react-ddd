import { ContainerModule } from 'inversify';
import { StashPoolItemFactory } from './ItemFactory';
import { StashPoolProtocol } from './Protocol';
import { StashPool } from './StashPool';

/**
 * dependOn: DocumentPortModule
 */
export class StashPoolModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      bind(StashPool).toSelf();
      bind(StashPoolProtocol).toSelf();
      bind(StashPoolItemFactory).toSelf();
    });
  }
}
