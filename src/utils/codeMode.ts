// src/utils/codeMode.ts
import { useEffect, useRef, RefObject, useCallback } from "react";
import {
  CodeFallParticle,
  CodeFallParticleOptions,
  EffectType,
} from "../types";

export const useCodeModeEffect = (
  effect: EffectType,
  options?: CodeFallParticleOptions
) => {
  const ref: RefObject<HTMLButtonElement | HTMLAnchorElement> = useRef(null);
  const particles: CodeFallParticle[] = useRef([]).current;

  const particleCount = options?.particleCount || 150;
  const size = options?.size || 14;

  const cleanupParticles = () => {
    particles.forEach((p) => p.element.remove());
    particles.length = 0;
  };

  const generateParticle = () => {
    const left = Math.random() * window.innerWidth;
    const top = 0;
    const particle = document.createElement("div");

    const textColor = options?.color || "dark";

    const code = generateRandomCode(1);

    particle.textContent = code;
    particle.style.color = textColor;
    particle.style.fontWeight = "bold";
    particle.style.fontSize = `${size}px`;
    particle.style.position = "fixed";
    particle.style.top = `${top}px`;
    particle.style.left = `${left}px`;

    document.body.appendChild(particle);

    const speed = 3 + Math.random() * 5;

    particles.push({
      element: particle,
      color: textColor,
      left,
      size,
      speedDown: speed,
      top,
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
        p.element.textContent = generateRandomCode(1);
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
    }, 10); // Faster generation
  }, [particleCount, particles]);

  useEffect(() => {
    // Skip server-side rendering
    if (typeof document === "undefined") return;

    let animationFrame: number;

    const loop = () => {
      refreshParticles();
      animationFrame = requestAnimationFrame(loop);
    };

    if (ref.current && effect === "codemode") {
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

// Function to generate a random code-like string
function generateRandomCode(length: number) {
  const characters = "0123456789ABCDEF";
  let code = "";
  const randomIndex = Math.floor(Math.random() * characters.length);
  code = characters.charAt(randomIndex);
  return code;
}
