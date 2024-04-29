import { Axios } from 'axios';
import { injectable } from 'inversify';

@injectable()
export abstract class HttpService {
  abstract readonly client: Axios;
}
