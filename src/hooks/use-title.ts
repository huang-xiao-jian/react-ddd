import { useEffect } from 'react';

interface TitleSetter {
  setTitle(title: string): void;
}

const inBrowserTitleSetter: TitleSetter = {
  setTitle(title) {
    document.title = title;
  },
};

export function useTitle(title: string, setter: TitleSetter = inBrowserTitleSetter) {
  useEffect(() => {
    setter.setTitle(title);
  }, [title]);
}
