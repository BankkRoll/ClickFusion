// types.d.ts

// Base Particle
export interface BaseParticle {
    element: HTMLElement | SVGSVGElement;
    left: number;
    size: number;
    top: number;
  }
  // Base ParticleOptions
  export interface BaseParticleOptions {
    particle?: string;
    size?: number;
  }
  
  // Specific to CoolMode
  export interface CoolParticle extends BaseParticle {
    direction: number;
    speedHorz: number;
    speedUp: number;
    spinSpeed: number;
    spinVal: number;
  }
  // Specific to CoolMode
  export interface CoolParticleOptions extends BaseParticleOptions {
    speedHorz?: number;
    speedUp?: number;
  }
  
  // Specific to RainingMode
  export interface RainingParticle extends BaseParticle {
    speedDown: number;
  }
  // Specific to RainingMode
  export interface RainingParticleOptions extends BaseParticleOptions {
    speedDown?: number;
    particleCount?: number;
  }
  
  // Specific to PartyMode
  export interface PartyParticle extends BaseParticle {
    direction: number;
    speed: number;
  }
  // Specific to PartyMode
  export interface PartyParticleOptions extends BaseParticleOptions {
    particleCount?: number;
  }
  
  // For EffectType
  export type EffectType = 'coolmode' | 'rainmode' | 'partymode';
  
  // For ClickFusionProps
  export interface ClickFusionProps {
    effect: EffectType;
    particleOptions?: BaseParticleOptions;
    children: React.ReactNode;
  }
  