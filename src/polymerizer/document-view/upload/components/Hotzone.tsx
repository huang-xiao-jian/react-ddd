import { DocumentTypePickerView } from '@/polymerizer/document-view/baseline/document-type';
import { DocumentUploadHotzone } from '@/polymerizer/document/upload';
import { Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { DocumentUploadPoolView } from './Pool';

interface DocumentUploadHotzoneProps {
  hotzone: DocumentUploadHotzone;
}

export const DocumentUploadHotzoneView: FC<DocumentUploadHotzoneProps> = observer(({ hotzone }) => {
  return (
    <>
      <Typography.Paragraph
        style={{
          color: '#627D98',
        }}
      >
        All upload data you currently submit will be recorded. If the file verified failed, it will not be saved.
      </Typography.Paragraph>
      <DocumentTypePickerView scheduler={hotzone.documentType$} />
      <DocumentUploadPoolView scheduler={hotzone.documentStashPool$} />
    </>
  );
});

DocumentUploadHotzoneView.displayName = 'DocumentUploadHotzoneView';
