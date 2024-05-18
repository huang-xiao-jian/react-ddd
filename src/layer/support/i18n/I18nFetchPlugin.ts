import { AcceptableLoadablePath, HttpService, I18nExtensionProtocol, LanguageMatcher } from '@/layer/plugin';
import { injectable } from 'inversify';
import { extend, forEach, isFunction, map } from 'lodash-es';

@injectable()
export class I18nFetchPlugin {
  public readonly type = 'backend';

  constructor(
    private readonly protocol: I18nExtensionProtocol,
    private readonly http: HttpService,
  ) {}

  private async fetch(filepath: AcceptableLoadablePath, matcher: LanguageMatcher): Promise<{}> {
    const path = isFunction(filepath) ? filepath(matcher.lng, matcher.namespace) : filepath;
    const url = path.toString();
    const response = await this.http.client.get(url);

    return response.data;
  }

  private async override<P extends object>(
    basement: P,
    filepaths: AcceptableLoadablePath[],
    matcher: LanguageMatcher,
  ): Promise<P> {
    const extras = await Promise.all(map(filepaths, async (filepath) => this.fetch(filepath, matcher)));

    forEach(extras, (extra) => {
      extend(basement, extra);
    });

    return basement;
  }

  async read(lng: string, namespace: string) {
    const publicPath = __webpack_public_path__.replace(/\/$/, '');
    const matcher: LanguageMatcher = {
      publicPath,
      lng,
      namespace,
    };

    const filepath = await this.protocol.language.for(lng).promise(matcher);
    const basement = await this.fetch(filepath, matcher);
    const overrides: AcceptableLoadablePath[] = [];

    // namespace 级别文案覆盖
    this.protocol.namespace.for(lng).for(namespace).promise(overrides);

    return this.override(basement, overrides, matcher);
  }
}
