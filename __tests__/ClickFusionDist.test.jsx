// __tests__/ClickFusionDist.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClickFusion } from '../dist';

// Define the effects
const effects = ['coolmode', 'rainmode', 'partymode', 'confettimode', 'codemode'];

// Define different types of children
const children = [
  { label: 'Div', element: <div>Click me (Div)</div> },
  { label: 'Button', element: <button>Click me (Button)</button> },
  { label: 'Anchor', element: <a>Click me (Anchor)</a> },
  { label: 'Paragraph', element: <p>Click me (Paragraph)</p> },
  { label: 'Span', element: <span>Click me (Span)</span> },
  { label: 'Heading', element: <h1>Click me (Heading)</h1> },
  // Add more elements here as needed
];

// Loop through each effect and each type of child
effects.forEach(effect => {
  children.forEach(({ label, element }) => {
    test(`renders correctly with effect: ${effect} and child type: ${label}`, () => {
      const { container, getByText } = render(
        <ClickFusion effect={effect}>
          {element}
        </ClickFusion>
      );

      const clickableElement = getByText(`Click me (${label})`);
      
      // Simulate a click event
      userEvent.click(clickableElement);
      
      // Check if the class changes or other side-effects occur
      expect(container.firstChild).toHaveClass('click-fusion');
    });
  });
});