import { injectable } from 'inversify';

/**
 * Interface defining method called once the application has fully started and
 * is bootstrapped.
 *
 */
@injectable()
export abstract class OnLaunch {
  /**
   * 处理无法同步阻塞 Injector 实例化
   */
  abstract onLaunch(): Promise<any>;
}
