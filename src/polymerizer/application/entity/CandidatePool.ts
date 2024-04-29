import { HumanBaseline } from '../../human/vo/Human';
import { HumanBaselineExchangeAction } from './ExchangeAction';

interface MemorableHumanBaseline extends HumanBaseline {
  /**
   * 唯一标识，基于策略推算
   */
  key: string;
}

/**
 * 报案案件 --> 候选人力池
 */
export interface UnidirectionalHumanDelegateProtocol {
  action: HumanBaselineExchangeAction;
  /**
   * 人力信息来源，用以覆盖式更新时使用
   */
  original: string;
  /**
   * 注意额外标识信息
   */
  payload: MemorableHumanBaseline[];
}

/**
 * 候选人力池
 */
interface Subscription {
  unsubscribe: () => void;
}

interface HumanBaselineSubscriber {
  (humans: MemorableHumanBaseline[]): void;
}

interface ConditionalHumanBaselineSubscriber {
  (humans: MemorableHumanBaseline): void;
}

export abstract class HumanBaselineCandidatePool {
  /**
   * 候选人信息写入协议
   */
  abstract consume(protocol: UnidirectionalHumanDelegateProtocol): void;
  /**
   * 全量订阅
   */
  abstract subscribe(subscriber: HumanBaselineSubscriber): Subscription;
  /**
   * 条件订阅
   */
  abstract subscribe(key: string, subscriber: ConditionalHumanBaselineSubscriber): Subscription;
}
