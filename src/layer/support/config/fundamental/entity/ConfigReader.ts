import { injectable } from 'inversify';

@injectable()
export abstract class FundamentalConfigReader<T> {
  abstract read(): Promise<T>;
}
