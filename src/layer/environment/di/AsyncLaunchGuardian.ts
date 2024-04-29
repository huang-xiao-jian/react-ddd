import { injectable, multiInject, optional } from 'inversify';
import { map } from 'lodash-es';
import { OnLaunch } from './Lifecycle';

@injectable()
export class AsyncLaunchGuardian implements OnLaunch {
  constructor(
    @optional()
    @multiInject(OnLaunch)
    private readonly launchers: OnLaunch[] = [],
  ) {}

  async onLaunch(): Promise<any> {
    await Promise.all(map(this.launchers, async (launcher) => launcher.onLaunch()));
  }
}
