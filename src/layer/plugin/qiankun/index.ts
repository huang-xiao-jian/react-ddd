import { injectable } from 'inversify';
import { RegistrableApp } from 'qiankun';
import { AsyncParallelHook, HookMap } from 'tapable';

@injectable()
export class QiankunExtensionProtocol {
  // 订阅套件：Nano | Graphene
  public readonly registry: HookMap<AsyncParallelHook<RegistrableApp<any>[]>>;

  constructor() {
    this.registry = new HookMap(() => new AsyncParallelHook(['registry']));
  }
}
