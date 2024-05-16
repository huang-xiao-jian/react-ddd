type Callback = (...args: any[]) => void;

function debounce(callback: Callback, delay: number) {
  let timeoutId: number;

  return function (this: any, ...args: any[]) {
    const context = this;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // @ts-ignore
    timeoutId = setTimeout(() => {
      callback.apply(context, args);
    }, delay);
  };
}
