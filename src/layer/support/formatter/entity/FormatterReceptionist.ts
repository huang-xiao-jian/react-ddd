import { injectable } from 'inversify';
import { FormatterMappings } from './Formatter';

@injectable()
export abstract class FormatterReceptionist {
  abstract use<K extends keyof FormatterMappings>(key: K): Promise<FormatterMappings[K]>;
}
