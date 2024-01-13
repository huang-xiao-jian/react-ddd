import { NonNullable } from '@/components/NonNullable';
import { DocumentUploadWorkspace } from '@/polymerizer/document/upload';
import { Divider, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { DocumentUploadHotzoneView } from './Hotzone';

interface DocumentUploadWorkspaceProps {
  scheduler: DocumentUploadWorkspace;
}

export const DocumentUploadWorkspaceView: FC<DocumentUploadWorkspaceProps> = observer(({ scheduler }) => {
  return (
    <Modal
      maskClosable={false}
      width={510}
      destroyOnClose
      cancelText="Cancel"
      okText="Confirm"
      title="Upload Document"
      closable={false}
      open={scheduler.visible}
      onCancel={scheduler.onInactive}
      onOk={scheduler.onOk}
      cancelButtonProps={{
        disabled: scheduler.saving,
      }}
      okButtonProps={{
        disabled: scheduler.hotzone$?.invalid,
      }}
      confirmLoading={scheduler.saving}
    >
      <Divider />
      <NonNullable value={scheduler.hotzone$}>
        {(hotzone) => <DocumentUploadHotzoneView hotzone={hotzone} />}
      </NonNullable>
    </Modal>
  );
});

DocumentUploadWorkspaceView.displayName = 'DocumentUploadWorkspaceView';
