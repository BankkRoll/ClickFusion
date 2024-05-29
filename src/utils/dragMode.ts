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

    const rect = element.getBoundingClientRect();
    const initialLeft = rect.left;
    const initialTop = rect.top;

    const canvas = document.createElement("div");
    canvas.style.position = "fixed";
    canvas.style.left = "0";
    canvas.style.top = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "-1";
    canvas.style.backgroundColor =
      options?.color === "light"
        ? "rgba(255, 255, 255, 0.7)"
        : options?.color === "dark"
        ? "rgba(0, 0, 0, 0.7)"
        : "transparent";
    document.body.appendChild(canvas);

    const originalStyle = {
      position: element.style.position,
      left: element.style.left,
      top: element.style.top,
      zIndex: element.style.zIndex,
      cursor: element.style.cursor,
    };

    let isDragging = false;
    let offsetX = 0,
      offsetY = 0;

    const startDrag = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      offsetX = clientX - rect.left;
      offsetY = clientY - rect.top;
      element.style.cursor = "grabbing";
      element.style.zIndex = "2147483647";
    };

    const doDrag = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const x = clientX - offsetX;
      const y = clientY - offsetY;

      const maxBoundX = (options?.maxWidth || window.innerWidth) - rect.width;
      const maxBoundY =
        (options?.maxHeight || window.innerHeight) - rect.height;

      const boundedX = Math.min(Math.max(0, x), maxBoundX);
      const boundedY = Math.min(Math.max(0, y), maxBoundY);

      element.style.left = `${boundedX}px`;
      element.style.top = `${boundedY}px`;
    };

    const stopDrag = () => {
      isDragging = false;
      element.style.cursor = "grab";
    };

    element.style.position = "fixed";
    element.style.left = `${initialLeft}px`;
    element.style.top = `${initialTop}px`;
    element.style.cursor = "grab";
    element.addEventListener("mousedown", startDrag);
    element.addEventListener("touchstart", startDrag, { passive: true });
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("touchmove", doDrag, { passive: true });
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);

    return () => {
      element.removeEventListener("mousedown", startDrag);
      element.removeEventListener("touchstart", startDrag);
      window.removeEventListener("mousemove", doDrag);
      window.removeEventListener("touchmove", doDrag);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);
      document.body.removeChild(canvas);
      Object.assign(element.style, originalStyle);
    };
  }, [effect, options]);

  return ref;
};
