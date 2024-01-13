import { StashPool } from '@/polymerizer/document/baseline/stash-pool';
import { Collapse, Input } from 'antd';
import { map } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import styles from './index.module.less';
import { StashItemActionsView } from './item-actions';

interface DocumentStashPoolViewProps {
  scheduler: StashPool;
}

export const DocumentStashPoolView: FC<DocumentStashPoolViewProps> = observer(({ scheduler }) => {
  return (
    <Collapse bordered={false} activeKey={scheduler.annotatingKey} ghost className={styles.repository}>
      {map(scheduler.documents, (scheduler) => (
        <Collapse.Panel
          key={scheduler.id}
          header={scheduler.file.name}
          showArrow={false}
          extra={<StashItemActionsView scheduler={scheduler} />}
        >
          <Input.TextArea
            allowClear
            value={scheduler.annotation}
            autoSize={{ minRows: 3 }}
            onChange={(event) => {
              scheduler.onAnnotation(event.target.value);
            }}
          />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
});

DocumentStashPoolView.displayName = 'DocumentStashPool';
