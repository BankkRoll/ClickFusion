// src/utils/partyMode.ts
import { useEffect, useRef, RefObject } from "react";
import { PartyParticle, PartyParticleOptions, EffectType } from "../types";

export const usePartyModeEffect = (
  effect: EffectType,
  options?: PartyParticleOptions
) => {
  const ref: RefObject<HTMLButtonElement | HTMLAnchorElement> = useRef(null);

  useEffect(() => {
    if (ref.current && effect === "partymode") {
      // Initialization of the particle effect
      return applyParticleEffect(ref.current, options);
    }
  }, [effect, options]);

  return ref;
};

// Singleton pattern for generating or fetching the particle effect container
const getContainer = () => {
  const id = "_partyMode_effect";
  let existingContainer = document.getElementById(id);

  if (existingContainer) {
    return existingContainer;
  }

  const container = document.createElement("div");
  container.setAttribute("id", id);
  container.setAttribute(
    "style",
    "overflow:hidden; position:fixed; height:100%; top:0; left:0; right:0; bottom:0; pointer-events:none; z-index:2147483647"
  );

  document.body.appendChild(container);

  return container;
};

let instanceCounter = 0;

// Core logic for applying particle effects
const applyParticleEffect = (
  element: HTMLElement,
  options?: PartyParticleOptions
): (() => void) => {
  instanceCounter++;

  const limit = 150;

  let particles: PartyParticle[] = [];
  let autoAddParticle = false;
  let mouseX = 0;
  let mouseY = 0;

  const container = getContainer();

  // Function to generate a single particle
  function generateParticle() {
    const size = options?.size || 2 + Math.random() * 6;
    const top = mouseY - size / 2;
    const left = mouseX - size / 2;
    const direction = Math.random() <= 0.5 ? -1 : 1;
    const speed = Math.random() * 10 + 5;
    const color = `hsl(${Math.random() * 360}, 70%, 50%)`;

    // Create the SVG element
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", `${size}px`);
    svg.setAttribute("height", `${size}px`);

    // Create the polygon element (triangle)
    const triangle = document.createElementNS(svgNS, "polygon");
    triangle.setAttribute("points", `${size / 2},0 ${size},${size} 0,${size}`);
    triangle.setAttribute("fill", color);

    // Append the triangle to the SVG
    svg.appendChild(triangle);

    // Create the particle div to hold the SVG
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.transform = `translate3d(${left}px, ${top}px, 0px)`;
    particle.appendChild(svg);

    container.appendChild(particle);

    particles.push({
      direction: Math.random() * 2 * Math.PI,
      element: particle,
      left,
      size,
      speed,
      top,
    });
  }

  // Update existing particles' positions and other properties
  function refreshParticles() {
    particles.forEach((p) => {
      const dx = p.speed * Math.cos(p.direction);
      const dy = p.speed * Math.sin(p.direction);

      p.left = p.left + dx;
      p.top = p.top + dy;

      // If particle is outside the viewport, remove it
      if (
        p.top > window.innerHeight ||
        p.left > window.innerWidth ||
        p.top < 0 ||
        p.left < 0
      ) {
        particles = particles.filter((o) => o !== p);
        p.element.remove();
      }

      p.element.setAttribute(
        "style",
        `position:absolute; will-change:transform; top:${p.top}px; left:${p.left}px;`
      );
    });
  }

  let animationFrame: number | undefined;

  // Animation loop for particles
  function loop() {
    if (autoAddParticle && particles.length < limit) {
      generateParticle();
    }

    refreshParticles();
    animationFrame = requestAnimationFrame(loop);
  }

  loop();

  const isTouchInteraction = "ontouchstart" in window;

  const tap = isTouchInteraction ? "touchstart" : "mousedown";
  const tapEnd = isTouchInteraction ? "touchend" : "mouseup";
  const move = isTouchInteraction ? "touchmove" : "mousemove";

  const updateMousePosition = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e) {
      mouseX = e.touches?.[0].clientX;
      mouseY = e.touches?.[0].clientY;
    } else {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
  };

  const tapHandler = (e: MouseEvent | TouchEvent) => {
    updateMousePosition(e);
    autoAddParticle = true;
  };

  const disableAutoAddParticle = () => {
    autoAddParticle = false;
  };

  element.addEventListener(move, updateMousePosition, { passive: true });
  element.addEventListener(tap, tapHandler, { passive: true });
  element.addEventListener(tapEnd, disableAutoAddParticle, { passive: true });
  element.addEventListener("mouseleave", disableAutoAddParticle, {
    passive: true,
  });

  // Cleanup logic
  return () => {
    element.removeEventListener(move, updateMousePosition);
    element.removeEventListener(tap, tapHandler);
    element.removeEventListener(tapEnd, disableAutoAddParticle);
    element.removeEventListener("mouseleave", disableAutoAddParticle);

    // Cancel animation loop once animations are done
    const interval = setInterval(() => {
      if (animationFrame && particles.length === 0) {
        cancelAnimationFrame(animationFrame);
        clearInterval(interval);

        // Clean up container if this is the last instance
        if (--instanceCounter === 0) {
          container.remove();
        }
      }
    }, 500);
  };
};
