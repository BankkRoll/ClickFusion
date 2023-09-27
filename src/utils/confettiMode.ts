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
  const particlePool: HTMLElement[] = [];

  const particleCount = options?.particleCount || 100;
  const speed = options?.speedDown || 6;
  const colorMode = options?.color || "rainbow";
  const burstCount = 3;

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
    particles.forEach((p) => {
      p.element.style.display = "none";
      if (p.element instanceof HTMLElement) {
        particlePool.push(p.element);
      }
    });
    particles.length = 0;
  };

  const generateParticle = () => {
    let particle: HTMLElement;
    if (particlePool.length > 0) {
      particle = particlePool.pop()!;
      particle.style.display = "block";
    } else {
      particle = document.createElement("div");
      document.body.appendChild(particle);
    }

    const left = Math.random() * window.innerWidth;
    const top = 0;
    const color =
      colorMap[colorMode][
        Math.floor(Math.random() * colorMap[colorMode].length)
      ];
    const size = 5 + Math.random() * 7;
    const rotateX = Math.random() * 360;
    const rotateY = Math.random() * 360;
    const rotateZ = Math.random() * 360;

    particle.style.position = "fixed";
    particle.style.top = `${top}px`;
    particle.style.left = `${left}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.willChange = "transform";

    particles.push({
      element: particle,
      left,
      size,
      speedDown: speed,
      top,
      color,
      rotateX,
      rotateY,
      rotateZ,
    });
  };

  const refreshParticles = useCallback(() => {
    particles.forEach((p, index) => {
      p.top += p.speedDown;
      p.rotateX += 3;
      p.rotateY += 3;
      p.rotateZ += 3;

      if (p.top > window.innerHeight) {
        p.element.style.display = "none";
        if (p.element instanceof HTMLElement) {
          particlePool.push(p.element);
        }
        particles.splice(index, 1);
      } else {
        p.element.style.transform = `translate3d(${p.left}px, ${p.top}px, 0) rotateX(${p.rotateX}deg) rotateY(${p.rotateY}deg) rotateZ(${p.rotateZ}deg)`;
      }
    });
  }, [particles]);

  const handleClick = useCallback(() => {
    cleanupParticles();
    let generatedCount = 0;
    let burstIntervalId = setInterval(() => {
      for (let i = 0; i < burstCount; i++) {
        generateParticle();
        generatedCount++;
      }
      if (generatedCount >= particleCount) {
        clearInterval(burstIntervalId);
      }
    }, 60);
  }, [particleCount, burstCount]);

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
