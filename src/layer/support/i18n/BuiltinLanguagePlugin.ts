import { I18nExtensionProtocol } from '@/layer/plugin';
import { injectable } from 'inversify';

@injectable()
export class BuiltinLanguagePlugin {
  constructor(protocol: I18nExtensionProtocol) {
    protocol.scanner.tapPromise('BuiltinLanguage', async (collection) => {
      collection.push(
        {
          name: 'English',
          lng: 'en-US',
        },
        {
          name: '简体中文',
          lng: 'zh-CN',
        },
        {
          name: '日本語',
          lng: 'ja-JP',
        },
      );
    });

    protocol.language.for('en-US').tapPromise('en-US', async (matcher) => {
      return `${matcher.publicPath}/locale/${matcher.lng}/${matcher.namespace}.json`;
    });

    protocol.language.for('zh-CN').tapPromise('zh-CN', async (matcher) => {
      return `${matcher.publicPath}/locale/${matcher.lng}/${matcher.namespace}.json`;
    });

    protocol.language.for('ja-JP').tapPromise('ja-JP', async (matcher) => {
      return `${matcher.publicPath}/locale/${matcher.lng}/${matcher.namespace}.json`;
    });
  }
}
