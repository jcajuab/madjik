import { useCallback, useRef } from "react";

export function useModal() {
  const ref = useRef<HTMLDialogElement>(null);

  const show = useCallback(() => {
    if (ref.current) ref.current.showModal();
  }, []);

  const close = useCallback(() => {
    if (ref.current) ref.current.close();
  }, []);

  return { ref, show, close };
}
