// Reference:
// useEvent RFC https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md

import { useCallback, useLayoutEffect, useRef } from "react";

export function useEvent<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T | undefined,
) {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    // eslint-disable-next-line no-restricted-syntax -- DTM-7148
    ((...args) => {
      return callbackRef.current?.(...args);
    }) as T,
    [],
  );
}
