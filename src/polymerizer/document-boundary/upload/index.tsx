import { BoundedContextLauncher } from '@/layer/environment';
import { DocumentUploadIgniterView, DocumentUploadWorkspaceView } from '@/polymerizer/document-view/upload';
import { DocumentUploadWorkspace } from '@/polymerizer/document/upload/Workspace';
import { App } from 'antd';
import { useEvt } from 'evt/hooks';
import { isError, map } from 'lodash-es';
import { FC, Suspense } from 'react';
import { suspend } from 'suspend-react';
import { DocumentUploadModule } from './Module';

interface DocumentUploadBoundaryProps {
  /**
   * 附件上传失败事件传递，一般无需额外动作
   */
  onCancel?: () => void;
  /**
   * 附件上传成功事件传递，一般外部执行刷新操作
   */
  onSuccess?: () => void;
}

interface InternalBoundaryProps extends DocumentUploadBoundaryProps {
  /**
   * 需要支持多态
   */
  name: string;
}

const InternalBoundary: FC<InternalBoundaryProps> = ({ name, onCancel, onSuccess }) => {
  const { message } = App.useApp();

  // 依赖注入实例化阶段
  const container = suspend(async () => {
    const container = DocumentUploadModule.create();

    await Promise.all(
      map(container.getAll(BoundedContextLauncher), async (launcher) => {
        await launcher.onBootstrap();
      }),
    );

    return container;
  }, [name, 'DocumentUploadModule']);

  // 聚合根绑定阶段
  const workspace = container.get(DocumentUploadWorkspace);

  // 输出关联阶段
  useEvt(
    (ctx) => {
      workspace.broadcaster.attach(ctx, (action) => {
        switch (action.type) {
          case 'CANCEL_PIPELINE':
            onCancel?.();
            break;
          case 'SEAL_PIPELINE':
            onSuccess?.();
            break;
          default:
            break;
        }
      });

      workspace.dispatcher.attach(ctx, (action) => {
        if (action.type === 'UPLOAD_FAILURE') {
          if (isError(action.error)) {
            message.error(action.error.message);
          }
        }
      });
    },
    [workspace],
  );

  return (
    <>
      <DocumentUploadWorkspaceView scheduler={workspace} />
      <DocumentUploadIgniterView scheduler={workspace} />
    </>
  );
};

export const DocumentUploadBoundary: FC<DocumentUploadBoundaryProps> = (props) => {
  return (
    <Suspense fallback={<DocumentUploadIgniterView.Pure />}>
      <InternalBoundary name="InApplicationDocumentUpload" {...props} />
    </Suspense>
  );
};
