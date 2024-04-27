import { HttpExtensionProtocol } from '@/layer/plugin';
import { setupCache } from 'axios-cache-interceptor';
import { injectable } from 'inversify';
import { startsWith } from 'lodash-es';

@injectable()
export class CacheableHttpClientExtension {
  constructor(protocol: HttpExtensionProtocol) {
    protocol.client.tap('axios-cache-interceptor', (client) => {
      return setupCache(client, {
        cachePredicate: {
          responseMatch(res) {
            // cache configuration fetch: /api/config
            // cache static assets
            return startsWith(res.config.url, '/api/config') || startsWith(res.config.url, '/static');
          },
        },
      });
    });
  }
}
