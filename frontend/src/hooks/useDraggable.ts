import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";

function remToPx(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function useDraggable<T extends HTMLElement>(
  initialX = 10, // in rem
  initialY = 10, // in rem
  fromRight = false,
  elementWidthRem = 0, // Width in rem
  handleRef?: React.RefObject<T | null>,
) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>(() => ({
    x: 0, // Temporary default (will update in useEffect)
    y: 0,
  }));

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const viewportWidth = window.innerWidth;
      const x = fromRight
        ? viewportWidth - remToPx(elementWidthRem) - remToPx(initialX)
        : remToPx(initialX);

      setPosition({ x, y: remToPx(initialY) });
    }
  }, [fromRight, elementWidthRem, initialX, initialY]);

  const dragState = useRef<{
    startX: number;
    startY: number;
    initX: number;
    initY: number;
  } | null>(null);

  const updatePositionOnResize = useCallback(() => {
    if (!elementRef.current) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const elementRect = elementRef.current.getBoundingClientRect();

    let newX = position.x;
    let newY = position.y;

    if (fromRight) {
      newX = viewportWidth - remToPx(elementWidthRem) - remToPx(initialX);
    } else {
      newX = Math.max(
        0,
        Math.min(viewportWidth - elementRect.width, position.x),
      );
    }

    newY = Math.max(
      0,
      Math.min(viewportHeight - elementRect.height, position.y),
    );

    setPosition({ x: newX, y: newY });
  }, [fromRight, position.x, position.y, initialX, elementWidthRem]);

  useEffect(() => {
    window.addEventListener("resize", updatePositionOnResize);
    return () => window.removeEventListener("resize", updatePositionOnResize);
  }, [updatePositionOnResize]);

  useEffect(() => {
    const preventPullToRefresh = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        event.preventDefault(); // Prevent multi-touch issues
      }
    };

    document.addEventListener("touchstart", preventPullToRefresh, { passive: false });

    return () => {
      document.removeEventListener("touchstart", preventPullToRefresh);
    };
  }, []);

  const startDrag = (x: number, y: number) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    dragState.current = {
      startX: x,
      startY: y,
      initX: rect.left,
      initY: rect.top,
    };
  };

  const handleMouseMove = useCallback((moveEvent: MouseEvent) => {
    if (!dragState.current || !elementRef.current) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const elementRect = elementRef.current.getBoundingClientRect();

    let newX =
      dragState.current.initX + (moveEvent.clientX - dragState.current.startX);
    let newY =
      dragState.current.initY + (moveEvent.clientY - dragState.current.startY);

    newX = Math.max(0, Math.min(viewportWidth - elementRect.width, newX));
    newY = Math.max(0, Math.min(viewportHeight - elementRect.height, newY));

    requestAnimationFrame(() => {
      setPosition({ x: newX, y: newY });
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    dragState.current = null;
  }, [handleMouseMove]);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    if (
      !elementRef.current ||
      (handleRef?.current && !handleRef.current.contains(event.target as Node))
    )
      return;

    startDrag(event.clientX, event.clientY);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);

  // Touch event handlers
  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    if (
      !elementRef.current ||
      (handleRef?.current && !handleRef.current.contains(event.target as Node))
    )
      return;

    const rect = elementRef.current.getBoundingClientRect();
    const touch = event.touches[0];

    dragState.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      initX: rect.left,
      initY: rect.top,
    };

    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (!dragState.current || !elementRef.current) return;

      moveEvent.preventDefault(); // Prevents scrolling
      moveEvent.stopPropagation(); // Stop event bubbling

      const elementRect = elementRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const touch = moveEvent.touches[0];

      let newX =
        dragState.current.initX + (touch.clientX - dragState.current.startX);
      let newY =
        dragState.current.initY + (touch.clientY - dragState.current.startY);

      newX = Math.max(0, Math.min(viewportWidth - elementRect.width, newX));
      newY = Math.max(0, Math.min(viewportHeight - elementRect.height, newY));

      requestAnimationFrame(() => {
        setPosition({ x: newX, y: newY });
      });
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      dragState.current = null;
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false }); // Override passive behavior
    document.addEventListener("touchend", handleTouchEnd);
  }, []);


  return { position, handleMouseDown, handleTouchStart, elementRef };
}
