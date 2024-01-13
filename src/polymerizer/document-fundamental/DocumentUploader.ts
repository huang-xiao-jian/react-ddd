import axios from 'axios';
import { injectable } from 'inversify';
import { map } from 'lodash-es';
import { FundamentalDocumentMaterial } from './DocumentMaterial';

@injectable()
export class FundamentalDocumentUploader {
  async batchUpload(documents: FundamentalDocumentMaterial[]): Promise<unknown> {
    // 此处使用 json-server 模拟批量创建，与实际场景存在偏差
    return map(documents, (item) => axios.post('http://localhost:3000/documents', item));
  }
}
