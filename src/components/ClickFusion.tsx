import React, { ReactElement, cloneElement, ReactNode } from 'react';
import { ClickFusionProps } from '../types';
import {
  useCoolModeEffect,
  useRainModeEffect,
  usePartyModeEffect,
  useConfettiModeEffect,
  useCodeModeEffect,
  useDragModeEffect,
} from "../utils";

/**
 * ClickFusion Component
 *
 * This component is responsible for rendering particle effects around a single child element.
 *
 * @param {ClickFusionProps} props - The props that define the type of particle effect to use and its options.
 * @param {string} props.effect - The type of particle effect to use ('coolmode', 'rainmode', 'partymode', 'confettimode', 'codemode', 'dragmode').
 * @param {BaseParticleOptions | undefined} props.particleOptions - The options for customizing particle behavior.
 * @param {ReactNode} props.children - The child element around which the particle effect will be rendered.
 * 
 * @returns {ReactElement | null} - The React element with particle effects, or null for an unsupported effect.
 */
const ClickFusion: React.FC<ClickFusionProps> = ({ effect, particleOptions, children }) => {
  let output: ReactNode = children;

  // Always call all hooks, even if not all are used
  const coolModeRef = useCoolModeEffect(effect, particleOptions);
  const rainModeRef = useRainModeEffect(effect, particleOptions);
  const partyModeRef = usePartyModeEffect(effect, particleOptions);
  const confettiModeRef = useConfettiModeEffect(effect, particleOptions);
  const codeModeRef = useCodeModeEffect(effect, particleOptions);
  const dragModeRef = useDragModeEffect(effect, particleOptions);

  // Choose the correct ref based on the effect
  const refs = {
    'coolmode': coolModeRef,
    'rainmode': rainModeRef,
    'partymode': partyModeRef,
    'confettimode': confettiModeRef,
    'codemode': codeModeRef,
    'dragmode': dragModeRef
  };

  const activeRef = refs[effect] || null;

  if (!activeRef) {
    console.error(`Unsupported effect "${effect}"`);
    return null;
  }

  // Clone the child and attach ref
  const child = React.Children.only(children) as ReactElement;
  output = cloneElement(child, { ref: activeRef });

  return (
    <div className={`click-fusion ${effect}`}>
      {output}
    </div>
  );
};

export default ClickFusion;
