import { ContainerModule } from 'inversify';
import { map } from 'lodash-es';
import { AdaptableHumanNameReader, HumanNameTransformer } from './adaptor';
import { AtomicConfigReader, ConfigReader } from './domain';
import { FundamentalConfigReader, FundamentalHumanNameReader } from './fundamental';

export class ConfigModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      // fundamental
      bind(FundamentalConfigReader).to(FundamentalHumanNameReader).whenTargetNamed('HumanName');
      // adaptor
      bind(HumanNameTransformer).toSelf();
      // 使用单一入口绑定，context binding 便于聚合
      bind(AtomicConfigReader).to(AdaptableHumanNameReader).whenTargetNamed(AdaptableHumanNameReader.TARGET_NAME);
      // domain
      bind(ConfigReader).toDynamicValue((context) => {
        const artifact: ConfigReader = {
          async read(key) {
            // 如果不存在，直接抛出错误即可
            const impl = context.container.getNamed(AtomicConfigReader, key);
            const response = await impl.read();

            return response;
          },
          async batchRead(...args) {
            return Promise.all(map(args, (key) => this.read(key))) as any;
          },
        };

        return artifact;
      });
    });
  }
}
