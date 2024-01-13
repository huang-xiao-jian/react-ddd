import { Container, ContainerModule } from 'inversify';
import { DocumentUploadHotzoneFactory } from './Hotzone';
import { DocumentUploadWorkspace } from './Workspace';

export class DocumentUploadDomainModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      bind(DocumentUploadWorkspace).toSelf();
      bind(DocumentUploadHotzoneFactory).toDynamicValue((context) => {
        return new DocumentUploadHotzoneFactory(context.container as Container);
      });
    });
  }
}
