import { HttpExtensionProtocol } from '@/layer/plugin';
import axios, { Axios } from 'axios';
import { AsyncContainerModule } from 'inversify';
import { CacheableHttpClientExtension } from './http/CacheableHttpClientExtension';
import { SecurityHttpClientExtension } from './http/SecurityHttpClientExtension';

export class EnvironmentModule {
  static create(protocol: HttpExtensionProtocol): AsyncContainerModule {
    return new AsyncContainerModule(async (bind) => {
      /* ==================================================== */
      /* =========== Http Plugins ========== */
      /* ==================================================== */
      // 原生插件
      bind(CacheableHttpClientExtension).toSelf();
      // 扩展插件
      // TODO - 仅作为示例，具体插件扫描加载暂时搁置
      bind(SecurityHttpClientExtension).toSelf();

      /* ==================================================== */
      /* =========== Http Extension Execute ========== */
      /* ==================================================== */
      const client = axios.create({
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // client level
      await protocol.client.promise(client);
      // interceptor level
      await protocol.interceptor.request.promise(client.interceptors.request);
      await protocol.interceptor.response.promise(client.interceptors.response);

      bind(Axios).toConstantValue(client);
    });
  }
}
