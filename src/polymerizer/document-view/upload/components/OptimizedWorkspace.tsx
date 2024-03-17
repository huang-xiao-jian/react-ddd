import { NonNullable } from '@/components/NonNullable';
import { DocumentUploadWorkspace } from '@/polymerizer/document/upload';
import { Button, Divider, Flex, Modal, Space } from 'antd';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { DocumentUploadHotzoneView } from './Hotzone';

interface DocumentUploadWorkspaceProps {
  scheduler: DocumentUploadWorkspace;
}

const DocumentUploadWorkspaceFooter: FC<DocumentUploadWorkspaceProps> = observer(({ scheduler }) => {
  return (
    <Flex justify="flex-end">
      <Space size={16}>
        <Button disabled={scheduler.saving} onClick={scheduler.onCancel}>
          Cancel
        </Button>
        <Button key="submit" type="primary" disabled={scheduler.hotzone$?.invalid} loading={scheduler.saving}>
          Submit
        </Button>
      </Space>
    </Flex>
  );
});

export const OptimizedDocumentUploadWorkspaceView: FC<DocumentUploadWorkspaceProps> = observer(({ scheduler }) => {
  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      width={510}
      open={scheduler.visible}
      cancelText="Cancel"
      okText="Confirm"
      title="Upload Document"
      closable={false}
      footer={() => <DocumentUploadWorkspaceFooter scheduler={scheduler} />}
    >
      <Divider />
      <NonNullable value={scheduler.hotzone$}>
        {(hotzone) => <DocumentUploadHotzoneView hotzone={hotzone} />}
      </NonNullable>
    </Modal>
  );
});
