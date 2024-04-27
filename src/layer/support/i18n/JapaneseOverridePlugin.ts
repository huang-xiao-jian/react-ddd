import { I18nExtensionProtocol } from '@/polymerizer/plugin';
import { injectable } from 'inversify';

@injectable()
export class JapaneseOverridePlugin {
  constructor(protocol: I18nExtensionProtocol) {
    protocol.namespace
      .for('en-US')
      .for('baseline')
      .tapPromise('JapaneseOverridePlugin', async (collections) => {
        collections.push(new URL('./namespace/baseline.json', import.meta.url));
      });
  }
}
