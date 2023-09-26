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

  const particleCount = options?.particleCount || 30;
  const speed = options?.speedDown || 5;
  const size = options?.size || 10;

  // Function to remove all particles
  const cleanupParticles = () => {
    particles.forEach((p) => p.element.remove());
    particles.length = 0;
  };

  const generateParticle = () => {
    const left = Math.random() * window.innerWidth;
    const top = 0;
    const particle = document.createElement("div");

    const textColor = options?.color === "light" ? "white" : "black";

    // Generate a random string of numbers to simulate code
    const code = generateRandomCode(8);

    particle.textContent = code;
    particle.style.color = textColor;
    particle.style.fontWeight = "bold";
    particle.style.fontSize = `${size}px`;
    particle.style.position = "fixed";
    particle.style.top = `${top}px`;
    particle.style.left = `${left}px`;
    particle.style.zIndex = "2147483647";

    document.body.appendChild(particle);

    // Determine the color for this particle
    const color = options?.color || "dark";

    particles.push({
      element: particle,
      color,
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
        // Change the code content to a new random string
        p.element.textContent = generateRandomCode(8);
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
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}
