import { BehaviorMappings } from '../BehaviorMappings';

declare module '../BehaviorMappings' {
  // {behavior}:{concept}:{constraint}
  export interface BehaviorMappings {
    'create:account': boolean;
    'delete:account': boolean;
    'edit:account': boolean;
    'active:account': boolean;
    'freeze:account': boolean;
    'unfreeze:account': boolean;
  }
}
