import { HttpExtensionProtocol } from '@/polymerizer/plugin';
import { injectable } from 'inversify';
import { extend } from 'lodash-es';

@injectable()
export class SecurityHttpClientExtension {
  constructor(protocol: HttpExtensionProtocol) {
    protocol.interceptor.request.tap('security-xsrf', (interceptor) => {
      interceptor.use((config) => {
        config.headers = extend({}, config.headers, {
          'x-csrf-token': 'SecurityHttpClientExtension',
        });

        return config;
      });
    });
  }
}
