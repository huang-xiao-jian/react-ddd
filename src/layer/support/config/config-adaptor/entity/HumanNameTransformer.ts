import { injectable } from 'inversify';
import { HumaneNameElements } from '../../config-domain';
import { FundamentalHumanNameElements } from '../../config-fundamental';

@injectable()
export class AdaptableHumanNameTransformer {
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
