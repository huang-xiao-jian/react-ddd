import { StashItemStatus, StashPoolItem } from '@/polymerizer/document/baseline/stash-pool';
import { DeleteOutlined, Loading3QuartersOutlined, MessageOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Case, Switch } from 'react-if';
import styles from './index.module.less';

interface StashItemActionsProps {
  scheduler: StashPoolItem;
}

export const StashItemActionsView: FC<StashItemActionsProps> = observer(({ scheduler }) => {
  return (
    <Switch>
      <Case condition={scheduler.status === StashItemStatus.Uploading}>
        <Button loading type="text" size="small" className={styles.icon} icon={<Loading3QuartersOutlined />} />
      </Case>
      <Case condition={scheduler.status === StashItemStatus.Exception}>
        <Button
          type="text"
          size="small"
          icon={<DeleteOutlined />}
          className={styles.icon}
          onClick={scheduler.onRemove}
        />
        <Button type="text" size="small" className={styles.icon} />
      </Case>
      <Case condition={scheduler.status === StashItemStatus.Uploaded}>
        <Button
          type="text"
          size="small"
          icon={<MessageOutlined />}
          className={clsx(styles.icon, {
            [styles.active]: scheduler.annotating,
          })}
          onClick={scheduler.onSwitchAnnotate}
        />
        <Button
          type="text"
          size="small"
          className={styles.icon}
          icon={<DeleteOutlined />}
          onClick={scheduler.onRemove}
        />
      </Case>
    </Switch>
  );
});

StashItemActionsView.displayName = 'StashItemActions';
