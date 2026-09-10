import { useEffect } from "react";

/**
 * Trap Tab inside `containerRef` while `open`. Restores focus on close.
 * Escape calls `onClose`.
 */
export default function useFocusTrap(open, containerRef, onClose) {
  useEffect(() => {
    if (!open) return;
    const root = containerRef.current;
    if (!root) return;
    const prev = document.activeElement;
    const focusables = () =>
      [...root.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )].filter(el => el.offsetParent !== null || el.getClientRects().length);

    const list = focusables();
    (list[0] || root).focus();

    const onKey = e => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (prev && typeof prev.focus === "function") prev.focus();
    };
  }, [open, containerRef, onClose]);
}
