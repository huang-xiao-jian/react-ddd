import { DocumentTypePicker } from '@/polymerizer/document/baseline/document-type';
import { FormItem, FormLayout, Select } from '@formily/antd-v5';
import { Field, FormProvider } from '@formily/react';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface DocumentTypePickerProps {
  scheduler: DocumentTypePicker;
}

export const DocumentTypePickerView: FC<DocumentTypePickerProps> = observer(({ scheduler }) => {
  return (
    <FormProvider form={scheduler.form}>
      <FormLayout layout="vertical">
        <Field
          name="docTypeCodes"
          title="Document Type"
          decorator={[FormItem]}
          component={[
            Select,
            {
              mode: 'multiple',
            },
          ]}
        />
      </FormLayout>
    </FormProvider>
  );
});

DocumentTypePickerView.displayName = 'DocumentTypePickerView';
