import { HttpExtensionProtocol, HttpService } from '@/layer/plugin';
import axios from 'axios';
import { ContainerModule } from 'inversify';
import { CacheableHttpClientExtension } from './http/CacheableHttpClientExtension';

export class EnvironmentModule {
  static create(): ContainerModule {
    return new ContainerModule(async (bind) => {
      // 原生插件
      bind(CacheableHttpClientExtension).toSelf();
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
