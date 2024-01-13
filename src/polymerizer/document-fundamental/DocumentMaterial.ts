/**
 * 上传文件数据结构
 */
export interface FundamentalDocumentMaterial {
  id: string;
  code: string;
  url: string;
  docName: string;
  receivedTime: string;
  docTypeCodes: string[];
  fileGroupNo?: string;
  description?: string;
}
