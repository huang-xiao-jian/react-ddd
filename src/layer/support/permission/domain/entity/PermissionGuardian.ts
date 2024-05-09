import { injectable } from 'inversify';
import { BehaviorMappings } from '../vo/Behavior';

@injectable()
export abstract class PermissionGuardian {
  abstract can<K extends keyof BehaviorMappings>(key: K): boolean;
}
