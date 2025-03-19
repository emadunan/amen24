import { useState, useCallback, useRef } from "react";

export function useDraggable(initialX = 1400, initialY = 100) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const elementRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef<{
    startX: number;
    startY: number;
    initX: number;
    initY: number;
  } | null>(null);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    dragState.current = {
      startX: event.clientX,
      startY: event.clientY,
      initX: rect.left,
      initY: rect.top,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragState.current || !elementRef.current) return;

      const elementRect = elementRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate new position
      let newX =
        dragState.current.initX +
        (moveEvent.clientX - dragState.current.startX);
      let newY =
        dragState.current.initY +
        (moveEvent.clientY - dragState.current.startY);

      // Clamp X within viewport
      newX = Math.max(0, Math.min(viewportWidth - elementRect.width, newX));

      // Clamp Y within viewport
      newY = Math.max(0, Math.min(viewportHeight - elementRect.height, newY));

      requestAnimationFrame(() => {
        setPosition({ x: newX, y: newY });
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      dragState.current = null;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  return { position, handleMouseDown, elementRef };
}
