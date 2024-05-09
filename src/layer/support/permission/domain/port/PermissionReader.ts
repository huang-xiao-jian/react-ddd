import { injectable } from 'inversify';
import { PermissionProfile } from '../vo/Permission';

@injectable()
export abstract class PermissionReader {
  abstract read(): Promise<PermissionProfile[]>;
}
