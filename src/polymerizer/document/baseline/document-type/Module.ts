import { ContainerModule } from 'inversify';
import { DocumentTypeMutuallyExclusiveRule } from './MutuallyExclusiveRule';
import { DocumentTypePicker } from './Picker';
import { DocumentTypeReflector } from './Reflector';
import { DocumentTypeRuleConnector } from './RuleConnector';

/**
 * dependOn: DocumentPortModule
 */
export class DocumentTypeModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      bind(DocumentTypeMutuallyExclusiveRule).toSelf();
      bind(DocumentTypeRuleConnector).toSelf();
      bind(DocumentTypeReflector).toSelf();
      bind(DocumentTypePicker).toSelf();
    });
  }
}
