/* ==================================================== */
/* =========== 人力信息 ========== */
/* ==================================================== */
import { Evt } from 'evt';
import { HumanBaselineExchangeAction } from '../../application/entity/ExchangeAction';

/**
 * 个人基本信息
 */
export interface HumanBaseline {
  /**
   * 姓名
   */
  name: string;
  /**
   * 手机号码
   */
  telephone: string;
  /**
   * 证件类型
   */
  idType: string;
  /**
   * 证件号码
   */
  idNo: string;
}

/**
 * 报案人
 */
export interface Claimant extends HumanBaseline {
  /**
   * 报案时间
   */
  when: number;
  /**
   * 与被保人关系
   */
  relationship: string;
}

/**
 * 出险人
 */
export interface Loss extends HumanBaseline {
  /**
   * 出现时间
   */
  when: number;
  /**
   * 出险类型
   */
  lossType: string;
}

/**
 * 受益人
 */
export interface Payee extends HumanBaseline {
  /**
   * 收款账户
   */
  account: string;
}

/**
 * 被保人
 */
export interface Insured extends HumanBaseline {
  /**
   * 被保人类型，例如：独立被保人，团体被保人
   */
  insureType: string;
}

/* ==================================================== */
/* =========== 上报协议 ========== */
/* ==================================================== */

/**
 * 报案人 --> 案件
 */
interface BubbleProtocol {
  action: HumanBaselineExchangeAction;
  payload: HumanBaseline | HumanBaseline[];
}

/**
 * 人员信息区块通过事件总线传递信息
 */
export abstract class HumanBaselineScheduler {
  abstract readonly bus: Evt<BubbleProtocol>;
}
