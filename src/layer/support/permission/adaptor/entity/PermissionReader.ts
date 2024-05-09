import { PermissionReader, type PermissionProfile } from '@/layer/support/permission/domain';
import { injectable } from 'inversify';

@injectable()
export class AdaptablePermissionReader extends PermissionReader {
  async read(): Promise<PermissionProfile[]> {
    return [];
  }
}
