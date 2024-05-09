import { AtomicConfigReader, ConfigReader } from '@/layer/support/config/domain';
import { ContainerModule } from 'inversify';
import { AdaptableHumanNameReader } from './entity/HumanNameReader';
import { HumanNameTransformer } from './entity/HumanNameTransformer';

export class ConfigAdaptorModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      // human name
      bind(HumanNameTransformer).toSelf();
      // 使用单一入口绑定，context binding 便于聚合
      bind(AtomicConfigReader).to(AdaptableHumanNameReader).whenTargetNamed(AdaptableHumanNameReader.TARGET_NAME);

      // singleton
      bind(ConfigReader).toDynamicValue((context) => {
        const artifact: ConfigReader = {
          async read(key) {
            // 如果不存在，直接抛出错误即可
            const impl = context.container.getNamed(AtomicConfigReader, key);
            const response = await impl.read();

            return response;
          },
        };

        return artifact;
      });
    });
  }
}
