import { injectable } from 'inversify';

@injectable()
export abstract class BoundedContextLauncher {
  abstract onBootstrap(): Promise<void>;
}
