// src/components/ClickFusion.tsx
import React, { ReactElement, cloneElement, ReactNode } from 'react';
import { useCoolModeEffect, useRainingModeEffect, usePartyModeEffect } from '../utils';
import { ClickFusionProps } from '../types';

// Mapping effect names to their corresponding hooks
const effectToHookMap = {
  'coolmode': useCoolModeEffect,
  'rainmode': useRainingModeEffect,
  'partymode': usePartyModeEffect
};

const ClickFusion: React.FC<ClickFusionProps> = ({ effect, particleOptions, children }) => {
  let output: ReactNode = children;

  // Retrieve the appropriate hook dynamically based on the effect
  const useEffectHook = effectToHookMap[effect];
  if (!useEffectHook) {
    console.error(`Unsupported effect "${effect}"`);
    return null;
  }

  const ref = useEffectHook(effect, particleOptions);

  // Conditionally clone the child and attach ref, excluding 'rainmode'
  if (effect !== 'rainmode') {
    const child = React.Children.only(children) as ReactElement;
    output = cloneElement(child, { ref });
  }

  return (
    <div className={`click-fusion ${effect}`}>
      {output}
    </div>
  );
};

export default ClickFusion;
