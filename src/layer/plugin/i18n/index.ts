import { injectable } from 'inversify';
import { AsyncParallelHook, AsyncSeriesBailHook, HookMap } from 'tapable';
import { AcceptableLoadablePath, LanguageDefinition, LanguageMatcher } from './definition';

@injectable()
export class I18nExtensionProtocol {
  // 支持的语言集合
  public readonly scanner: AsyncParallelHook<[LanguageDefinition[]]>;
  // 语言包加载地址，单一语言包加载地址必须符合相同 pattern
  public readonly language: HookMap<AsyncSeriesBailHook<LanguageMatcher, AcceptableLoadablePath>>;
  // 语言包覆盖文案 namespace 级别
  public readonly namespace: HookMap<HookMap<AsyncParallelHook<[AcceptableLoadablePath[]]>>>;

  constructor() {
    this.scanner = new AsyncParallelHook(['collection']);
    this.language = new HookMap(() => new AsyncSeriesBailHook(['matcher']));
    this.namespace = new HookMap(() => new HookMap(() => new AsyncParallelHook(['collection'])));
  }
}
