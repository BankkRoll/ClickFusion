// src/utils/confettiMode.ts
import { useEffect, useRef, RefObject, useCallback } from "react";
import {
  ConfettiParticle,
  ConfettiParticleOptions,
  EffectType,
} from "../types";

export const useConfettiModeEffect = (
  effect: EffectType,
  options?: ConfettiParticleOptions
) => {
  const ref: RefObject<HTMLButtonElement | HTMLAnchorElement> = useRef(null);
  const particles: ConfettiParticle[] = useRef([]).current;

  const particleCount = options?.particleCount || 100;
  const speed = options?.speedDown || 5;
  const colorMode = options?.color || "rainbow";

  const colorMap = {
    rainbow: ["red", "orange", "yellow", "green", "blue", "purple"],
    red: ["red"],
    orange: ["orange"],
    yellow: ["yellow"],
    green: ["green"],
    blue: ["blue"],
    purple: ["purple"],
  };

  const cleanupParticles = () => {
    particles.forEach((p) => p.element.remove());
    particles.length = 0;
  };

  const generateParticle = () => {
    const left = Math.random() * window.innerWidth;
    const top = 0;
    const color =
      colorMap[colorMode][
        Math.floor(Math.random() * colorMap[colorMode].length)
      ];
    const shapes = ["circle", "rect", "triangle", "ellipse", "star", "hexagon"];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = 5 + Math.random() * 7;

    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.top = `${top}px`;
    particle.style.left = `${left}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;

    const shapeStyles: { [key: string]: Partial<CSSStyleDeclaration> } = {
      circle: { borderRadius: "50%" },
      rect: {},
      triangle: { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" },
      ellipse: { borderRadius: "50% 25%" },
      star: {
        clipPath:
          "polygon(50% 0%, 61.8% 38.2%, 98.1% 38.2%, 68.4% 61.8%, 79.4% 95.1%, 50% 76.2%, 20.6% 95.1%, 31.6% 61.8%, 1.9% 38.2%, 38.2% 38.2%)",
      },
      hexagon: {
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      },
    };

    Object.assign(particle.style, shapeStyles[shape]);

    document.body.appendChild(particle);

    particles.push({
      element: particle,
      left,
      size,
      speedDown: speed,
      top,
      color,
    });
  };

  const refreshParticles = useCallback(() => {
    particles.forEach((p, index) => {
      p.top += p.speedDown;
      if (p.top > window.innerHeight) {
        p.element.remove();
        particles.splice(index, 1);
      } else {
        p.element.style.transform = `translate3d(${p.left}px, ${p.top}px, 0)`;
      }
    });
  }, [particles]);

  const handleClick = useCallback(() => {
    cleanupParticles();
    let intervalId = setInterval(() => {
      generateParticle();
      if (particles.length >= particleCount) {
        clearInterval(intervalId);
      }
    }, 100);
  }, [particleCount, particles]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    let animationFrame: number;

    const loop = () => {
      refreshParticles();
      animationFrame = requestAnimationFrame(loop);
    };

    if (ref.current && effect === "confettimode") {
      ref.current.addEventListener("click", handleClick);
      loop();
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("click", handleClick);
      }
      cancelAnimationFrame(animationFrame);
      cleanupParticles();
    };
  }, [effect, handleClick, refreshParticles]);

  return ref;
};
