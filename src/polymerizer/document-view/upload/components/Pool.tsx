import { DocumentStashPoolView } from '@/polymerizer/document-view/baseline/stash-pool';
import { StashPool } from '@/polymerizer/document/baseline/stash-pool';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Row, Typography, Upload } from 'antd';
import { FC } from 'react';
import { v4 } from 'uuid';

interface DocumentUploadPoolProps {
  scheduler: StashPool;
}

export const DocumentUploadPoolView: FC<DocumentUploadPoolProps> = ({ scheduler }) => {
  return (
    <>
      <Upload
        capture={false}
        action="/mock/upload-file-reference"
        showUploadList={false}
        headers={{ authorization: 'authorization-text' }}
        beforeUpload={(file) => {
          file.uid = v4();
        }}
        onChange={(info) => {
          scheduler.onReceiveFile(info.file);
        }}
      >
        <Button icon={<UploadOutlined />}>Select Document</Button>
      </Upload>
      <Row style={{ marginTop: 4 }}>
        <Typography.Text
          style={{
            fontSize: 12,
            color: '#9FB3C8',
          }}
        >
          You can only upload PDF/DOC/XSL/PNG/JPG
        </Typography.Text>
      </Row>
      <DocumentStashPoolView scheduler={scheduler} />
    </>
  );
};

DocumentUploadPoolView.displayName = 'DocumentUploadPool';
