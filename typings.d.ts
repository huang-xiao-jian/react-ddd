import 'umi/typings';

interface SchedulerTaskOptions {
  signal?: AbortController;
  priority?: 'background' | 'user-visible' | 'user-blocking';
}

interface Scheduler {
  postTask: (fn: Function, options?: SchedulerTaskOptions) => Promise<void>;
  yield: (options: SchedulerTaskOptions) => Promise<void>;
}

declare global {
  interface Window {
    scheduler: Scheduler;
  }
}
