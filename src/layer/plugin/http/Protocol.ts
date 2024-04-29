import type { Axios, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios';
import { injectable } from 'inversify';
import { AsyncSeriesHook, AsyncSeriesWaterfallHook } from 'tapable';

@injectable()
export class HttpInterceptorExtensionProtocol {
  /**
   * Request 拦截器
   */
  public readonly request: AsyncSeriesHook<AxiosInterceptorManager<AxiosRequestConfig>>;

  /**
   * Response 拦截器
   */
  public readonly response: AsyncSeriesHook<AxiosInterceptorManager<AxiosResponse>>;

  constructor() {
    this.request = new AsyncSeriesHook(['interceptor']);
    this.response = new AsyncSeriesHook(['interceptor']);
  }
}

@injectable()
export class HttpExtensionProtocol {
  /**
   * 作用于 HttpClient 实例级别，返回 HttpClient 实例，复用与否，取决于具体实现
   * 应用场景：
   *   - 修改默认参数
   *   - 替换实现方式
   */
  public readonly client: AsyncSeriesWaterfallHook<Axios, Axios>;

  constructor(public readonly interceptor: HttpInterceptorExtensionProtocol) {
    this.client = new AsyncSeriesWaterfallHook(['axios']);
  }
}
