import { injectable } from 'inversify';
import { AtomicConfigReader, HumaneNameElements } from '../../config-domain';
import { FundamentalHumanNameReader } from '../../config-fundamental';
import { AdaptableHumanNameTransformer } from './HumanNameTransformer';

@injectable()
export class AdaptableHumanNameReader extends AtomicConfigReader<'HumanName'> {
  // 用于快速区分关联配置
  static TARGET_NAME = 'HumanName';

  constructor(
    private readonly fundamental: FundamentalHumanNameReader,
    private readonly transformer: AdaptableHumanNameTransformer,
  ) {
    super();
  }

  async read(): Promise<HumaneNameElements> {
    const raw = await this.fundamental.read();
    const artifact = this.transformer.transform(raw);

    return artifact;
  }
}
