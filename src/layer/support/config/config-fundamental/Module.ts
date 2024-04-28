import { ContainerModule } from 'inversify';
import { FundamentalConfigReader } from './entity/ConfigReader';
import { FundamentalHumanNameReader } from './entity/HumanNameReader';

export class ConfigFundamentalModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      bind(FundamentalConfigReader).to(FundamentalHumanNameReader).whenTargetNamed('HumanName');
    });
  }
}
