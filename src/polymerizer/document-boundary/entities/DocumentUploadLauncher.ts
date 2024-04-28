import { OnLaunch } from '@/layer/environment';
import { FundamentalDocumentTypeQuerier } from '@/polymerizer/document-fundamental';
import { injectable } from 'inversify';
import { DocumentTypeDeliverImpl } from '../port/DocumentTypeDeliver';
import { DocumentTypeTransformer } from './DocumentTypeTransformer';

@injectable()
export class DocumentUploadLauncher implements OnLaunch {
  constructor(
    private readonly querier: FundamentalDocumentTypeQuerier,
    private readonly transformer: DocumentTypeTransformer,
    private readonly deliver: DocumentTypeDeliverImpl,
  ) {}

  async onLaunch(): Promise<void> {
    const fundamentalDocumentTypes = await this.querier.query();
    const documentTypes = this.transformer.batchTransform(fundamentalDocumentTypes);

    this.deliver.onReceive(
      // 域外数据转换域内数据结构
      documentTypes,
    );
  }
}
