/* ==================================================== */
/* =========== 权限模块划分为两级管理 ========== */
/* ==================================================== */
export interface FundamentalPermissionProfile {
  /**
   * 权限唯一标识
   */
  id: string;
  /**
   * 权限逻辑容器
   */
  module: string;
  subModule: string;
  /**
   * 权限类型：数据权限、功能权限
   * 数据权限，需要进一步配置 Level 权限
   */
  category: 'DATA' | 'FUNCTION';
  /**
   * 数据权限配置全量 Level 数据
   */
  attributes: any[];
  /**
   * 数据权限约束条件，JSON Schema 模式，需要进一步解析，或者基础设施层解析
   */
  attributesRules: string;
}

export interface FundamentalPermissionSubModule {
  module: string;
  permissions: FundamentalPermissionProfile[];
}

export interface FundamentalPermissionModule {
  module: string;
  subModules: FundamentalPermissionSubModule[];
}
