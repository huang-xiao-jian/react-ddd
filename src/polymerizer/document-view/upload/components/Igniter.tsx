import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC, ReactElement } from 'react';

import { DocumentUploadWorkspace } from '@/polymerizer/document/upload';

interface DocumentUploadIgniterProps {
  scheduler: DocumentUploadWorkspace;
}

export function DocumentUploadIgniterView(props: DocumentUploadIgniterProps): ReactElement {
  const { scheduler } = props;

  return (
    <Button type="primary" icon={<UploadOutlined />} onClick={scheduler.onActive}>
      Upload Document
    </Button>
  );
}

// Suspense 加载模式占位
const PureDocumentUploadIgniter: FC = () => {
  return (
    <Button type="primary" icon={<UploadOutlined />} loading>
      Upload Document
    </Button>
  );
};

DocumentUploadIgniterView.Pure = PureDocumentUploadIgniter;
