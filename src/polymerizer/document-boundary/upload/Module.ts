import { OnLaunch } from '@/layer/environment';
import { DocumentFundamentalModule } from '@/polymerizer/document-fundamental';
import { DocumentTypeManifest, DocumentUploader } from '@/polymerizer/document/port';
import { DocumentUploadDomainModule } from '@/polymerizer/document/upload';
import { Container } from 'inversify';
import { DocumentMaterialReverter } from '../entities/DocumentMaterialReverter';
import { DocumentTypeTransformer } from '../entities/DocumentTypeTransformer';
import { DocumentUploadLauncher } from '../entities/DocumentUploadLauncher';
import { DocumentTypeDeliverImpl } from '../port/DocumentTypeDeliver';
import { DocumentUploaderImpl } from '../port/DocumentUploader';

export class DocumentUploadModule {
  static create(): Container {
    const container = new Container({
      defaultScope: 'Singleton',
    });

    // fundamental
    container.load(DocumentFundamentalModule.create());

    // adapter
    container.bind(DocumentMaterialReverter).toSelf();
    container.bind(DocumentTypeTransformer).toSelf();
    container.bind(DocumentTypeDeliverImpl).toSelf();
    container.bind(DocumentTypeManifest).toService(DocumentTypeDeliverImpl);
    container.bind(DocumentUploader).to(DocumentUploaderImpl);
    container.bind(OnLaunch).to(DocumentUploadLauncher);

    // domain
    container.load(DocumentUploadDomainModule.create());

    return container;
  }
}
