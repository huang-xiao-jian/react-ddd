import { injectable } from 'inversify';
import { slice } from 'lodash-es';
import { RegistrableApp } from 'qiankun';
import { AsyncParallelHook, HookMap } from 'tapable';

@injectable()
export class QiankunMicroApplicationRegistry {
  private readonly apps: RegistrableApp<any>[] = [];

  register(app: RegistrableApp<any>) {
    this.apps.push(app);
  }

  consume(): RegistrableApp<any>[] {
    return slice(this.apps);
  }
}

@injectable()
export class QiankunExtensionProtocol {
  // 订阅套件：Nano | Graphene
  public readonly delivery: HookMap<AsyncParallelHook<QiankunMicroApplicationRegistry>>;

  constructor() {
    this.delivery = new HookMap(() => new AsyncParallelHook(['registry']));
  }
}
