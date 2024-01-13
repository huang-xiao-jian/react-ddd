import { DocumentUploadBoundary } from '@/polymerizer/document-boundary';
import { App, Card } from 'antd';

export default () => {
  return (
    <App>
      <Card title="附件管理" extra={<DocumentUploadBoundary />}></Card>
    </App>
  );
};
