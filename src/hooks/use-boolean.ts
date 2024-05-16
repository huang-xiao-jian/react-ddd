import { useMemo, useState } from 'react';

interface BoolActions {
  toggle(): void;
  set(value: boolean): void;
  setTrue(): void;
  setFalse(): void;
}

type UseBooleanResponse = [value: boolean, actions: BoolActions];

export function useBoolean(initialValue: boolean = false): UseBooleanResponse {
  const [state, setState] = useState(initialValue);
  const actions: BoolActions = useMemo(
    () => ({
      toggle() {
        setState((prev) => !prev);
      },
      set(value) {
        setState(value);
      },
      setFalse() {
        setState(false);
      },
      setTrue() {
        setState(true);
      },
    }),
    [],
  );

  return [state, actions];
}
