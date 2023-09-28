import React from 'react';
import { ClickFusionProps } from '../types';
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
declare const ClickFusion: React.FC<ClickFusionProps>;
export default ClickFusion;
