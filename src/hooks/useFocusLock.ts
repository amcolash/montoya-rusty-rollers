import { useCallback, useEffect, useRef } from 'react';

export function useFocusLock(enabled: boolean = true) {
  const elementRef = useRef(null);

  function getFocusableElements() {
    const focusableEls = elementRef.current?.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    );

    return focusableEls;
  }

  // Function from https://hidde.blog/using-javascript-to-trap-focus-in-an-element/
  const keyHandler = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      const focusableEls = getFocusableElements();
      if (!focusableEls.length) return;

      const firstFocusableEl = focusableEls[0];
      const lastFocusableEl = focusableEls[focusableEls.length - 1];
      const KEYCODE_TAB = 9;

      const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        /* shift + tab */ if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } /* tab */ else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    },
    [enabled]
  );

  const trapHandler = useCallback(
    (e: FocusEvent) => {
      if (!enabled) return;

      if (!elementRef.current?.contains(e.target)) {
        const focusableEls = getFocusableElements();
        if (!focusableEls.length) return;

        e.preventDefault();
        const firstFocusableEl = focusableEls[0];
        firstFocusableEl.focus();
      }
    },
    [enabled]
  );

  useEffect(() => {
    elementRef.current?.addEventListener('keydown', keyHandler);
    document.addEventListener('focusin', trapHandler);

    const focusableEls = getFocusableElements();
    if (!focusableEls.length) return;
    focusableEls[0].focus();

    return () => {
      elementRef.current?.removeEventListener('keydown', keyHandler);
      document.removeEventListener('focusin', trapHandler);
    };
  }, [elementRef.current, keyHandler, trapHandler]);

  useEffect(() => {
    document.body.style.overflow = enabled ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [enabled]);

  return elementRef;
}
