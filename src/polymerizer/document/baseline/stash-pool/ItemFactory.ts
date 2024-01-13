import { DocumentRemoteReference } from '@/polymerizer/document/vo';
import { UploadFile } from 'antd';
import { injectable } from 'inversify';
import { StashPoolItem } from './Item';
import { StashPoolProtocol } from './Protocol';

@injectable()
export class StashPoolItemFactory {
  constructor(private readonly protocol: StashPoolProtocol) {}

  create(file: UploadFile<DocumentRemoteReference>): StashPoolItem {
    return new StashPoolItem(file, this.protocol);
  }
}
