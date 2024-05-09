import { HumaneNameElements } from '@/layer/support/config/domain';
import { FundamentalHumanNameElements } from '@/layer/support/config/fundamental';
import { injectable } from 'inversify';

@injectable()
export class HumanNameTransformer {
  transform(elements: FundamentalHumanNameElements): HumaneNameElements {
    const artifact = new Set(elements);

    if (artifact.has('middle')) {
      artifact.add('first');
      artifact.add('last');
    }

    if (artifact.has('first') || artifact.has('last')) {
      artifact.add('first');
      artifact.add('last');
    }

    return artifact;
  }
}
