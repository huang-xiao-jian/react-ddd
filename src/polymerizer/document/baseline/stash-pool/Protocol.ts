import { injectable } from 'inversify';
import { SyncHook } from 'tapable';

/**
 * 简化 Pool / Item 通信，接入与实现分离
 */
@injectable()
export class StashPoolProtocol {
  // Item 级别直接接入删除动作
  public readonly removal: SyncHook<string> = new SyncHook(['id']);

  // Item 级别直接接入注释模式切换动作
  public readonly annotate: SyncHook<string> = new SyncHook(['id']);
}
