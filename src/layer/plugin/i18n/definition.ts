export type LoadablePath = string | URL;

export interface LoadablePathFactory {
  (lng: string, namespace: string): LoadablePath;
}

export type AcceptableLoadablePath = LoadablePath | LoadablePathFactory;

export interface LanguageDefinition {
  /**
   * 标准化语言表示，不要骚操作
   */
  lng: string;
  /**
   * 语言名，视图层渲染
   */
  name: string;
}

export interface LanguageMatcher {
  /**
   * 资源上下文前缀
   */
  publicPath: string;
  /**
   * 语言标识
   */
  lng: string;
  /**
   * 语言文案空间
   */
  namespace: string;
}
