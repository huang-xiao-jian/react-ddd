import axios from 'axios';
import { injectable } from 'inversify';
import { FundamentalDocumentMaterial } from './DocumentMaterial';

@injectable()
export class FundamentalDocumentMaterialQuerier {
  async execute(): Promise<FundamentalDocumentMaterial[]> {
    const res = await axios.get<FundamentalDocumentMaterial[]>('http://localhost:3000/documents');

    return res.data;
  }
}
