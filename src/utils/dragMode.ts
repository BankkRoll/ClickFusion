// src/utils/dragMode.ts
import { useEffect, useRef, RefObject } from "react";
import { DragParticleOptions, EffectType } from "../types";

export const useDragModeEffect = (
  effect: EffectType,
  options?: DragParticleOptions
) => {
  const ref: RefObject<HTMLElement | null> = useRef(null);

  const updateCanvasPosition = (
    canvas: HTMLCanvasElement,
    element: HTMLElement
  ) => {
    const rect = element.getBoundingClientRect();
    canvas.style.left = `${rect.left}px`;
    canvas.style.top = `${rect.top}px`;
  };

  useEffect(() => {
    const element = ref.current;
    if (!element || effect !== "dragmode") return;

    // Create canvas
    const canvas = document.createElement("canvas");
    const canvasWidth = options?.width ?? 400;
    const canvasHeight = options?.height ?? 400;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Initialize canvas position
    updateCanvasPosition(canvas, element);

    // Set styles and positions for canvas
    canvas.style.position = "relative";
    canvas.style.zIndex = "-1";

    if (options?.color === "light") {
      canvas.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    } else if (options?.color === "dark") {
      canvas.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    } else {
      canvas.style.opacity = "0";
    }

    document.body.appendChild(canvas);

    element.style.position = "relative";
    element.style.zIndex = "1";
    element.style.cursor = "grab";

    let isDragging = false;
    let offsetX = 0,
      offsetY = 0;

    const startDrag = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      element.style.cursor = "grabbing";
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      offsetX = clientX - element.getBoundingClientRect().left;
      offsetY = clientY - element.getBoundingClientRect().top;
    };

    const doDrag = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const x = clientX - offsetX;
      const y = clientY - offsetY;

      requestAnimationFrame(() => {
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
      });
    };

    const stopDrag = () => {
      isDragging = false;
      element.style.cursor = "grab";
    };

    const handleScrollOrResize = () => updateCanvasPosition(canvas, element);
    window.addEventListener("scroll", handleScrollOrResize);
    window.addEventListener("resize", handleScrollOrResize);

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
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);

      // Remove canvas
      document.body.removeChild(canvas);
    };
  }, [effect, options]);

  return ref;
};
