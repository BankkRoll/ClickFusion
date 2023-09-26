// src/components/ClickFusion.tsx
import React, { ReactElement, cloneElement, ReactNode } from 'react';
import { useCoolModeEffect, useRainModeEffect, usePartyModeEffect, useConfettiModeEffect } from '../utils';
import { ClickFusionProps } from '../types';
import { useCodeModeEffect } from '../utils/codeMode';

// Mapping effect names to their corresponding hooks
const effectToHookMap = {
  'coolmode': useCoolModeEffect,
  'rainmode': useRainModeEffect,
  'partymode': usePartyModeEffect,
  'confettimode': useConfettiModeEffect,
  'codemode': useCodeModeEffect
};

/**
 * ClickFusion Component
 *
 * This component is responsible for rendering particle effects around a single child element.
 *
 * @param {ClickFusionProps} props - The props that define the type of particle effect to use and its options.
 * @param {string} props.effect - The type of particle effect to use ('coolmode', 'rainmode', 'partymode', 'confettimode', 'codemode').
 * @param {BaseParticleOptions | undefined} props.particleOptions - The options for customizing particle behavior.
 * @param {ReactNode} props.children - The child element around which the particle effect will be rendered.
 * 
 * @returns {ReactElement | null} - The React element with particle effects, or null for an unsupported effect.
 */
const ClickFusion: React.FC<ClickFusionProps> = ({ effect, particleOptions, children }) => {
  let output: ReactNode = children;

  // Retrieve the appropriate hook dynamically based on the effect
  const useEffectHook = effectToHookMap[effect];
  if (!useEffectHook) {
    console.error(`Unsupported effect "${effect}"`);
    return null;
  }

  const ref = useEffectHook(effect, particleOptions);

  // Clone the child and attach ref
  const child = React.Children.only(children) as ReactElement;
  output = cloneElement(child, { ref });

  return (
    <div className={`click-fusion ${effect}`}>
      {output}
    </div>
  );
};

export default ClickFusion;
