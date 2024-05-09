import { BehaviorMappings } from '../BehaviorMappings';

declare module '../BehaviorMappings' {
  // {behavior}:{concept}:{constraint}
  export interface BehaviorMappings {
    // withdraw
    'withdraw:workflow': boolean;
    'withdraw:workflow:in-application': boolean;
    'withdraw:workflow:in-case': boolean;
    'withdraw:workflow:in-acceptance': boolean;
    'withdraw:workflow:in-evaluation': boolean;
    'withdraw:workflow:in-approval': boolean;
    // forward
    'forward:workflow': boolean;
    'forward:workflow:in-application': boolean;
    'forward:workflow:in-case': boolean;
    'forward:workflow:in-acceptance': boolean;
    'forward:workflow:in-evaluation': boolean;
    'forward:workflow:in-approval': boolean;
  }
}
