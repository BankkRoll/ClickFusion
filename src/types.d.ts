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
  direction: number;
  speedHorz: number;
  speedUp: number;
  spinSpeed: number;
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
  direction: number;
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
  speedDown: number;
  color: string;
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
  speedDown: number;
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
