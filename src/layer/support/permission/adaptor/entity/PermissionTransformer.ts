import { PermissionProfile } from '@/layer/support/permission/domain';
import { FundamentalPermissionProfile } from '@/layer/support/permission/fundamental';
import { injectable } from 'inversify';

@injectable()
export abstract class PermissionTransformer {
  abstract transform(profile: FundamentalPermissionProfile): PermissionProfile;
}
