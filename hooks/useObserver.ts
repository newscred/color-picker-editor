import { useEffect } from "react";
import { useEvent } from "./useEvent";

export default function useObserver({
  target,
  onChange,
}: {
  target: HTMLElement | null;
  onChange: (target: HTMLElement) => void;
}) {
  const onMutate = useEvent(() => {
    if (target) {
      onChange(target);
    }
  });

  useEffect(() => {
    if (!target) {
      return;
    }

    const observer = new window.MutationObserver(onMutate);

    observer.observe(target, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [onMutate, target]);
}
