import axios from 'axios';
import { ContainerModule } from 'inversify';
import { HttpExtensionProtocol, HttpService } from '../plugin/http';
import { CacheableHttpClientExtension } from './http/CacheableHttpClientExtension';
import { SecurityHttpClientExtension } from './http/SecurityHttpClientExtension';

export class EnvironmentModule {
  static create(): ContainerModule {
    return new ContainerModule(async (bind) => {
      /* ==================================================== */
      /* =========== Http Plugins ========== */
      /* ==================================================== */
      // 原生插件
      bind(CacheableHttpClientExtension).toSelf();
      // TODO - 仅作为示例，具体插件扫描加载暂时搁置
      // 扩展插件
      bind(SecurityHttpClientExtension).toSelf();
      // 初始 HttpClient
      bind(HttpService)
        .toConstantValue({
          client: axios.create({
            headers: {
              'Content-Type': 'application/json',
            },
          }),
        })
        .onActivation(async (context, http) => {
          const protocol = context.container.get(HttpExtensionProtocol);
          // client level
          const client = await protocol.client.promise(http.client);
          // interceptor level
          await protocol.interceptor.request.promise(client.interceptors.request);
          await protocol.interceptor.response.promise(client.interceptors.response);

          return {
            client,
          };
        });
    });
  }
}
