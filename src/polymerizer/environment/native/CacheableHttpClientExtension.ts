import { HttpExtensionProtocol } from '@/polymerizer/plugin';
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
            // only cache configurations: /api/config
            return startsWith(res.config.url, '/api/config');
          },
        },
      });
    });
  }
}
