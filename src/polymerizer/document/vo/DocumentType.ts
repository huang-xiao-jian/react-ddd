/**
 * 附件类型分类
 */
export enum DocumentTypeCategory {
  Group = 'Group',
  Singleton = 'Singleton',
}

/**
 * 领域内部概念抽离，避免外部数据结构侵入
 */
export interface DocumentType {
  /**
   * 附件类型名
   */
  name: string;
  /**
   * 附件类型内部值
   */
  code: string;
  /**
   * 附件类别 Group | Singleton
   */
  category?: DocumentTypeCategory;
}
