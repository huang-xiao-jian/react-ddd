import { FormilyConnector } from '@/layer/environment/di';
import { injectable } from 'inversify';
import { AsyncSeriesBailHook, HookMap } from 'tapable';

@injectable()
export class FormExtensionProtocol {
  public readonly formily: HookMap<AsyncSeriesBailHook<FormilyConnector, FormilyConnector>>;

  constructor() {
    this.formily = new HookMap(() => new AsyncSeriesBailHook(['basement']));
  }
}
