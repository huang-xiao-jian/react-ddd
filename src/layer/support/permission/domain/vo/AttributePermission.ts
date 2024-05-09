/* ==================================================== */
/* =========== 原子限制条件 ========== */
/* ==================================================== */
export interface ColonyAttributeFactor {
  /**
   * 限制条件作用目标，一般为数据模型特定字段
   */
  path: string;
  /**
   * 集合规则：用户自定义规则受限于系统全量集合
   * in / contains_all 核心差异在于规则执行阶段，对值校验规则不同，分别作用于普通值、集合
   * 规则配置阶段，不存在差异
   */
  type: 'in' | 'contains_all';
  /**
   * 系统定于选项集合
   */
  values: string[];
}

export type BoundaryInclusive = 'force-open' | 'force-close' | 'flexible';

export interface IntervalAttributeFactor {
  /**
   * 限制条件作用目标，一般为数据模型特定字段
   */
  path: string;
  /**
   * 区间规则：用户自定义数据区间受限于系统区间。系统区间未给出的情况下，用户自行决定区间
   */
  type: 'between';
  /**
   * 开闭区间定义
   */
  lowerBoundaryInclusive: BoundaryInclusive;
  upperBoundaryInclusive: BoundaryInclusive;
}

export type AttributeFactor = ColonyAttributeFactor | IntervalAttributeFactor;

/* ==================================================== */
/* =========== 用户配置规则 ========== */
/* ==================================================== */
export interface ColonyFactorRule {
  path: string;
  type: 'in';
  values: string[];
}

export interface IntervalFactorRule {
  path: string;
  type: 'between';
  lowerBound: number;
  upperBound: number;
  includeLowerBound: boolean;
  includeUpperBound: boolean;
}

export type FactorRule = ColonyFactorRule | IntervalFactorRule;
// 多个最小编排单位组合为数据权限原子规则，关系为 “与”
export type FactorRuleSlice = FactorRule[];
// 多个规则切片单位组合，关系为 ”或“
export type EffectiveFactorRule = FactorRuleSlice[];

/**
 * 属性权限
 */
export interface AttributePermission {
  /**
   * 权限唯一标识
   */
  id: number;
  /**
   * 权限名称
   */
  name: string;
  /**
   * TODO - 实际语义存疑
   */
  priority: number;
  /**
   * 属性配置规则，注意此处与基础设施层结构定义出现分叉，以领域概念为准
   */
  rule: EffectiveFactorRule;
}

/**
 * 目前全量属性允许编辑
 */
export type AttributePermissionAlteration = AttributePermission;
