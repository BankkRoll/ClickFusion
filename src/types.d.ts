// src/types.d.ts

/**
 * Base properties for all particles
 */
export interface BaseParticle {
  element: HTMLElement | SVGSVGElement;
  left: number;
  size: number;
  top: number;
}

/**
 * Common options for particle effects
 */
export interface BaseParticleOptions {
  /** Custom particle image URL */
  particle?: string;
  /** Size of the particle */
  size?: number;
}

/**
 * Properties specific to CoolMode
 */
export interface CoolParticle extends BaseParticle {
  /** Direction of particles in degrees */
  direction: number;
  /** Horizontal speed of particles */
  speedHorz: number;
  /** Upward speed of particles */
  speedUp: number;
  /** Spin speed of particles in degrees */
  spinSpeed: number;
  /** Spin value of particles in degrees */
  spinVal: number;
}

/**
 * Options specific to CoolMode effect
 */
export interface CoolParticleOptions extends BaseParticleOptions {
  /** Number of particles */
  particleCount?: number;
  /** Horizontal speed of particles */
  speedHorz?: number;
  /** Upward speed of particles */
  speedUp?: number;
}

/**
 * Properties specific to RainingMode
 */
export interface RainingParticle extends BaseParticle {
  /** Downward speed of particles */
  speedDown: number;
}

/**
 * Options specific to RainingMode effect
 */
export interface RainingParticleOptions extends BaseParticleOptions {
  /** Downward speed of particles */
  speedDown?: number;
  /** Number of particles */
  particleCount?: number;
}

/**
 * Properties specific to PartyMode
 */
export interface PartyParticle extends BaseParticle {
  /** Direction of particles in degrees */
  direction: number;
  /** Downward speed of particles */
  speed: number;
}

/**
 * Options specific to PartyMode effect
 */
export interface PartyParticleOptions extends BaseParticleOptions {
  /** Number of particles */
  particleCount?: number;
}

/**
 * Properties specific to ConfettiMode
 */
export interface ConfettiParticle extends BaseParticle {
  /** Downward speed of particles */
  speedDown: number;
  /** Color of particles */
  color: string;
  /** Spin speed of particles in degrees */
  rotateX: number;
  rotateY: number;
  rotateZ: number;
}

/**
 * Options specific to ConfettiMode effect
 */
export interface ConfettiParticleOptions extends BaseParticleOptions {
  /** Downward speed of particles */
  speedDown?: number;
  /** Number of particles */
  particleCount?: number;
  /** Color of particles, can be 'rainbow', 'red', 'orange', 'yellow', 'green', 'blue', 'purple' */
  color?: "rainbow" | "red" | "orange" | "yellow" | "green" | "blue" | "purple";
}

/**
 * Properties specific to CodeFall
 */
export interface CodeFallParticle extends BaseParticle {
  /** Downward speed of particles */
  speedDown: number;
  /** Text color of particles */
  color: "light" | "dark";
}

/**
 *  Options specific to CodeFall effect
 */
export interface CodeFallParticleOptions extends BaseParticleOptions {
  /** Downward speed of particles */
  speedDown?: number;
  /** Number of particles */
  particleCount?: number;
  /** Text color, can be 'light' or 'dark' */
  color?: "light" | "dark";
}

/**
 * Options specific to DragMode effect
 */
export interface DragParticleOptions extends BaseParticleOptions {
  /** Width of the draggable canvas */
  maxWidth?: number;
  /** Height of the draggable canvas */
  maxHeight?: number;
  /** Color of the draggable canvas, can be 'light' or 'dark' or transparent by default */
  color?: "light" | "dark";
}

/**
 * Possible effect types
 */
export type EffectType =
  | "coolmode"
  | "rainmode"
  | "partymode"
  | "confettimode"
  | "codemode"
  | "dragmode";

/**
 * Props for the ClickFusion component
 */
export interface ClickFusionProps {
  /** Type of effect to apply */
  effect: EffectType;
  /** Options for particle behavior */
  particleOptions?: BaseParticleOptions;
  /** Children to wrap the effect around */
  children: React.ReactNode;
}
