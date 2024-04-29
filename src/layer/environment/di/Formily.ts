import { FormPath } from '@formily/core';
import { injectable } from 'inversify';

@injectable()
export abstract class FormilyConnector {
  abstract connect(baseline?: FormPath): void;
}
