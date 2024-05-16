import { ContainerModule } from 'inversify';
import { DateFormatter } from './entity/DateFormatter';
import { FormatterReceptionist } from './entity/FormatterReceptionist';

export class FormatterModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      bind(DateFormatter).toSelf();
      bind(FormatterReceptionist).toSelf();
    });
  }
}
