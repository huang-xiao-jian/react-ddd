import axios from 'axios';
import { injectable } from 'inversify';
import { FundamentalDocumentType } from './DocumentType';

@injectable()
export class FundamentalDocumentTypeQuerier {
  async query(): Promise<FundamentalDocumentType[]> {
    const res = await axios.get<FundamentalDocumentType[]>('/mock/document-types');

    return res.data;
  }
}
