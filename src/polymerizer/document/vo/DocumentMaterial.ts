/**
 * 领域值对象，已上传的文件
 */
export interface DocumentMaterial {
  /**
   * 理赔上下文，上传文件唯一标识
   */
  id: string | number;
  /**
   * 对象存储上下文，上传文件唯一标识
   */
  code: string;
  /**
   * 文件名
   */
  name: string;
  /**
   * 文件接收时间
   */
  receivedTime: string;
  /**
   * 添加的注释
   */
  annotation?: string;
  /**
   * 文档类型
   */
  docTypeCodes: string[];
}

/**
 * 领域对象，已上传文件组
 */
export interface DocumentGroupMaterial {
  /**
   * Group 唯一标识，上传新文件时需要使用
   */
  id: string;
  /**
   * 文档类型
   */
  docTypeCodes: string[];
  /**
   * 文件组内存量附件（已上传）
   */
  stocks: DocumentMaterial[];
}
