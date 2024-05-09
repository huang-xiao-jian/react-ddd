import { AtomicConfigReader, HumaneNameElements } from '@/layer/support/config/domain';
import { FundamentalHumanNameReader } from '@/layer/support/config/fundamental';
import { injectable } from 'inversify';
import { HumanNameTransformer } from './HumanNameTransformer';

@injectable()
export class AdaptableHumanNameReader extends AtomicConfigReader<'HumanName'> {
  // 用于快速区分关联配置
  static TARGET_NAME = 'HumanName';

  constructor(
    private readonly fundamental: FundamentalHumanNameReader,
    private readonly transformer: HumanNameTransformer,
  ) {
    super();
  }

  async read(): Promise<HumaneNameElements> {
    const raw = await this.fundamental.read();
    const artifact = this.transformer.transform(raw);

    return artifact;
  }
}
