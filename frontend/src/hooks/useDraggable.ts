import { useState, useRef, useEffect, useCallback } from "react";

export const useDraggable = (initialX = 100, initialY = 100) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if ((e.target as HTMLElement).tagName === "BUTTON") return;
      e.preventDefault();
      setDragging(true);
      offsetRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [position],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging || !elementRef.current) return;

      const { offsetWidth: width, offsetHeight: height } = elementRef.current;

      const newX = Math.max(
        0,
        Math.min(window.innerWidth - width, e.clientX - offsetRef.current.x),
      );
      const newY = Math.max(
        0,
        Math.min(window.innerHeight - height, e.clientY - offsetRef.current.y),
      );

      setPosition({ x: newX, y: newY });
    },
    [dragging],
  );

  const handleMouseUp = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (!dragging) return;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    document.body.style.userSelect = dragging ? "none" : "";
  }, [dragging]);

  return { position, handleMouseDown, elementRef };
};
