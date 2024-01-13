import { Simplify } from 'type-fest';
import { EventFrom } from 'xstate';
import { createModel } from 'xstate/lib/model';

export const InternalModel = createModel(
  {},
  {
    events: {
      /**
       * 开始上传
       */
      UPLOAD_BEGIN: () => ({}),
      /**
       * 文件上传成功
       */
      UPLOAD_SUCCESS: () => ({}),
      /**
       * 文件上传失败
       */
      UPLOAD_FAILURE: (error: unknown) => ({ error }),
    },
  },
);

export const ExternalModel = createModel(
  {},
  {
    events: {
      /**
       * 上传流程已取消
       */
      CANCEL_PIPELINE: () => ({}),
      /**
       * 上传流程已执行完毕，上传成功
       */
      SEAL_PIPELINE: () => ({}),
    },
  },
);

export type DocumentUploadInternalEvent = Simplify<EventFrom<typeof InternalModel>>;
export type DocumentUploadExternalEvent = Simplify<EventFrom<typeof ExternalModel>>;
