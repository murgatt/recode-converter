type TFunction = (...args: any[]) => void;

export function debounce<T extends TFunction>(func: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<T>): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  } as T;
}
