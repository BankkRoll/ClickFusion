// src/utils/rainMode.tsx
import { useEffect, useRef, RefObject, useCallback } from 'react';
import { RainingParticle, RainingParticleOptions, EffectType } from '../types';

export const useRainModeEffect = (effect: EffectType, options?: RainingParticleOptions) => {
  const ref: RefObject<HTMLButtonElement | HTMLAnchorElement> = useRef(null);
  const particles: RainingParticle[] = useRef([]).current;

  const particleCount = options?.particleCount || 30;
  const speed = options?.speedDown || 5;
  const size = options?.size || 50;
  const customImage = options?.particle;

  // Function to remove all particles
  const cleanupParticles = () => {
    particles.forEach((p) => p.element.remove());
    particles.length = 0;
  };

  const generateParticle = () => {
    const left = Math.random() * window.innerWidth;
    const top = 0;
    const particle = document.createElement('div');

    if (customImage) {
      particle.innerHTML = `<img src="${customImage}" width="${size}" height="${size}" />`;
    } else {
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    }

    particle.style.position = 'fixed';
    particle.style.top = `${top}px`;
    particle.style.left = `${left}px`;
    particle.style.zIndex = '2147483647';

    document.body.appendChild(particle);

    particles.push({
      element: particle,
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
    if (typeof document === 'undefined') return;

    let animationFrame: number;

    const loop = () => {
      refreshParticles();
      animationFrame = requestAnimationFrame(loop);
    };

    if (ref.current && effect === 'rainmode') {
      ref.current.addEventListener('click', handleClick);
      loop();
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('click', handleClick);
      }
      cancelAnimationFrame(animationFrame);
      cleanupParticles();
    };
  }, [effect, handleClick, refreshParticles]);

  return ref;
};