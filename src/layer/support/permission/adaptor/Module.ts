import { PermissionReader } from '@/layer/support/permission/domain';
import { ContainerModule } from 'inversify';
import { AdaptablePermissionReader } from './entity/PermissionReader';
import { PermissionTransformer } from './entity/PermissionTransformer';

export class PermissionAdaptorModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      bind(PermissionTransformer).toSelf();
      bind(PermissionReader).to(AdaptablePermissionReader);
    });
  }
}
