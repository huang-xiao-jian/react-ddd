/* ==================================================== */
/* =========== 权限模块划分为两级管理 ========== */
/* ==================================================== */
import { AttributeFactor, AttributePermission } from './AttributePermission';

export interface LitePermissionProfile {
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
   */
  category: 'FUNCTION';
}

export interface AttributePermissionProfile {
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
   * 数据权限，需要进一步配置 Level 权限
   */
  category: 'DATA';
  /**
   * 数据权限配置全量 Level 数据
   */
  levels: AttributePermission[];
  /**
   * 数据权限条件因子
   */
  factors: AttributeFactor[];
}

export type PermissionProfile = LitePermissionProfile | AttributePermissionProfile;

export interface PermissionSubModule {
  module: string;
  permissions: PermissionProfile[];
}

export interface PermissionModule {
  module: string;
  subModules: PermissionSubModule[];
}
