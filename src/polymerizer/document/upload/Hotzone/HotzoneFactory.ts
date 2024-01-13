import { Container, injectable } from 'inversify';
import { forEach } from 'lodash-es';
import { Subscription } from 'xstate';
import { DocumentTypeModule } from '../../baseline/document-type';
import { StashPoolModule } from '../../baseline/stash-pool';
import { DocumentUploadHotzone } from './Hotzone';

@injectable()
export class DocumentUploadHotzoneFactory {
  constructor(private readonly container: Container) {}

  private subscriptions: Subscription[] = [];

  mount(): DocumentUploadHotzone {
    const container = this.container.createChild({
      defaultScope: 'Singleton',
    });

    // 延迟加载模块
    const documentType$ = DocumentTypeModule.create();
    const stashPool$ = StashPoolModule.create();

    container.load(documentType$);
    container.load(stashPool$);
    container.bind(DocumentUploadHotzone).toSelf();

    // 资源释放
    this.subscriptions.push({
      unsubscribe() {
        container.unbindAll();
      },
    });

    return container.get(DocumentUploadHotzone);
  }

  unmount() {
    forEach(this.subscriptions, (subscription) => {
      subscription.unsubscribe();
    });
  }
}
