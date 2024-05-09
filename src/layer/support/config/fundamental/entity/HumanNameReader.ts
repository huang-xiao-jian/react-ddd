import { faker } from '@faker-js/faker';
import { injectable } from 'inversify';
import { FundamentalHumanNameElements } from '../vo/HumanName';
import { FundamentalConfigReader } from './ConfigReader';

@injectable()
export class FundamentalHumanNameReader extends FundamentalConfigReader<FundamentalHumanNameElements> {
  async read(): Promise<FundamentalHumanNameElements> {
    const baseline: FundamentalHumanNameElements = ['first', 'middle', 'last', 'full'];
    const artifact = faker.helpers.arrayElements(baseline);

    return artifact;
  }
}
