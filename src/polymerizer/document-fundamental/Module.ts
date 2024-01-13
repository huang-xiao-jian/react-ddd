import { ContainerModule } from 'inversify';
import { FundamentalDocumentMaterialQuerier } from './DocumentMaterialQuerier';
import { FundamentalDocumentTypeQuerier } from './DocumentTypeQuerier';
import { FundamentalDocumentUploader } from './DocumentUploader';

export class DocumentFundamentalModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      bind(FundamentalDocumentMaterialQuerier).toSelf();
      bind(FundamentalDocumentTypeQuerier).toSelf();
      bind(FundamentalDocumentUploader).toSelf();
    });
  }
}
