import { isNil } from 'lodash-es';
import { ReactNode, useMemo } from 'react';

interface NonNullableProps<T extends any> {
  value: T;
  children: (v: NonNullable<T>) => ReactNode;
}

export function NonNullable<T>(props: NonNullableProps<T>): ReactNode {
  if (isNil(props.value)) {
    return null;
  }

  const children = useMemo(() => props.children(props.value as NonNullable<T>), [props.value]);

  return <>{children}</>;
}
