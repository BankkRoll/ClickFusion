// src/utils/dragMode.ts
import { useEffect, useRef, RefObject } from "react";
import { DragParticleOptions, EffectType } from "../types";

export const useDragModeEffect = (
  effect: EffectType,
  options?: DragParticleOptions
) => {
  const ref: RefObject<HTMLElement | null> = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || effect !== "dragmode") return;

    const parent = element.parentElement;
    if (!parent) return;

    // Set parent to relative positioning
    parent.style.position = "relative";

    // Create canvas
    const canvas = document.createElement("canvas");
    const rect = element.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Initialize canvas position
    canvas.style.position = "absolute";
    canvas.style.left = "0";
    canvas.style.top = "0";

    // Set styles for canvas
    canvas.style.zIndex = "-1";

    if (options?.color === "light") {
      canvas.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    } else if (options?.color === "dark") {
      canvas.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    } else {
      canvas.style.opacity = "0";
    }

    parent.appendChild(canvas);

    element.style.position = "absolute";
    element.style.zIndex = "1";
    element.style.cursor = "grab";

    let isDragging = false;
    let offsetX = 0,
      offsetY = 0;

    const startDrag = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      element.style.cursor = "grabbing";
      const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
      const pageY = "touches" in e ? e.touches[0].pageY : e.pageY;
      const rect = element.getBoundingClientRect();
      offsetX = pageX - (rect.left + window.scrollX);
      offsetY = pageY - (rect.top + window.scrollY);
    };

    const doDrag = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
      const pageY = "touches" in e ? e.touches[0].pageY : e.pageY;
      const x = pageX - offsetX;
      const y = pageY - offsetY;

      requestAnimationFrame(() => {
        element.style.left = `${x - window.scrollX}px`;
        element.style.top = `${y - window.scrollY}px`;
      });
    };

    const stopDrag = () => {
      isDragging = false;
      element.style.cursor = "grab";
    };

    element.addEventListener("mousedown", startDrag);
    element.addEventListener("touchstart", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("touchmove", doDrag);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);

    return () => {
      // Remove event listeners and cleanup
      element.removeEventListener("mousedown", startDrag);
      element.removeEventListener("touchstart", startDrag);
      window.removeEventListener("mousemove", doDrag);
      window.removeEventListener("touchmove", doDrag);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);
      // Remove canvas
      parent.removeChild(canvas);
    };
  }, [effect, options]);

  return ref;
};
