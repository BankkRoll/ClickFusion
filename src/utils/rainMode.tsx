// src/utils/useRainingEffect.ts
import { useEffect, useRef, RefObject } from 'react';
import { RainingParticle, RainingParticleOptions, EffectType } from '../types';

export const useRainingModeEffect = (effect: EffectType, options?: RainingParticleOptions) => {
  const ref: RefObject<HTMLButtonElement | HTMLAnchorElement> = useRef(null);
  let particles: RainingParticle[] = [];
  let intervalId: number;
  let animationFrame: number;

  const particleCount = options?.particleCount || 30;
  const speed = options?.speedDown || 5;
  const size = options?.size || 50;
  const customImage = options?.particle;

  // Function to remove all particles
  const cleanupParticles = () => {
    particles.forEach((p) => p.element.remove());
    particles = [];
  };

  // Singleton pattern for generating or fetching the particle effect container
  const generateParticle = () => {
    const left = Math.random() * window.innerWidth;
    const top = 0;
    const particle = document.createElement('div');

    // Custom image for particle or default square shape
    if (customImage) {
      particle.innerHTML = `<img src="${customImage}" width="${size}" height="${size}" />`;
    } else {
      const svgNS = 'http://www.w3.org/2000/svg';
      const squareSVG = document.createElementNS(svgNS, 'svg');
      const square = document.createElementNS(svgNS, 'rect');
      square.setAttributeNS(null, 'width', size.toString());
      square.setAttributeNS(null, 'height', size.toString());
      square.setAttributeNS(
          null,
          'fill',
          `hsl(${Math.random() * 360}, 70%, 50%)`,
      );

      squareSVG.appendChild(square);
      squareSVG.setAttribute('width', size.toString());
      squareSVG.setAttribute('height', size.toString());

      particle.appendChild(squareSVG);
    }

    particle.style.position = 'fixed';
    particle.style.top = `${top}px`;
    particle.style.left = `${left}px`;

    document.body.appendChild(particle);

    particles.push({
      element: particle,
      left,
      size,
      speedDown: speed,
      top,
    });
  };

  // Function to update the position of all particles
  const refreshParticles = () => {
    particles.forEach((p, index) => {
      p.top += p.speedDown;
      if (p.top > window.innerHeight) {
        p.element.remove();
        particles.splice(index, 1);
      } else {
        p.element.style.transform = `translate3d(${p.left}px, ${p.top}px, 0)`;
      }
    });
  };

  useEffect(() => {
    if (ref.current && effect === 'rainmode') {
      // Animation loop
      const loop = () => {
        refreshParticles();
        animationFrame = requestAnimationFrame(loop);
      };

      // Handle click event to trigger particle generation
      const handleClick = () => {
        cleanupParticles();
        intervalId = setInterval(() => {
          generateParticle();
          if (particles.length >= particleCount) {
            clearInterval(intervalId);
          }
        }, 100);
      };

      if (ref.current) {
        ref.current.addEventListener('click', handleClick);
      }

      loop();

      // Cleanup logic
      return () => {
        if (ref.current) {
          ref.current.removeEventListener('click', handleClick);
        }

        cancelAnimationFrame(animationFrame);
        clearInterval(intervalId);
        cleanupParticles();
      };
    }
  }, [effect, options]);

  return ref;
};