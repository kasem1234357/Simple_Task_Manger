import { MutableRefObject, useEffect } from 'react';

const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null> | MutableRefObject<HTMLElement | null>[],
  handler: (event: Event) => void,
  eventType: keyof DocumentEventMap = 'mousedown'
): void => {
  useEffect(() => {
    const listener = (event: Event) => {
      const target = event.target as Node;
      if (!target || !target.isConnected) {
        return;
      }

      const isOutside = Array.isArray(ref)
        ? ref.every((r) => r.current && !r.current.contains(target))
        : ref.current && !ref.current.contains(target);

      if (isOutside) {
        handler(event);
      }
    };

    document.addEventListener(eventType, listener);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener(eventType, listener);
    };
  }, [ref, handler, eventType]); // Dependency array to re-register the event listener if dependencies change
};

export default useOutsideClick;
