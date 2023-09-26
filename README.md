# ClickFusion
![Version](https://img.shields.io/github/package-json/v/BankkRoll/ClickFusion)
![Downloads](https://img.shields.io/npm/dw/clickfusion)
![GitHub issues](https://img.shields.io/github/issues/BankkRoll/ClickFusion)
![GitHub pull requests](https://img.shields.io/github/issues-pr/BankkRoll/ClickFusion)
![License](https://img.shields.io/npm/l/clickfusion)

Welcome to ClickFusion, your go-to library for interactive button effects! This npm package simplifies adding particle effects to your buttons or links, offering utility hooks and a React functional component to make your UI interactive and delightful.

## Table of Contents

- [Setting up ClickFusion](#setting-up-clickfusion)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Quick Example](#quick-example)
- [Comprehensive Example](#comprehensive-example)
- [Features](#features)
  - [Customizable Effects](#customizable-effects)
  - [Type Safety](#type-safety)
- [Quick Links](#quick-links)
- [Contributing](#contributing)
- [License](#license)

## Setting up ClickFusion

### Installation

You can install ClickFusion using various package managers:

```bash
# Using npm
npm i clickfusion

# Using bun
bun add clickfusion

# Using yarn
yarn add clickfusion

# Using pnpm
pnpm add clickfusion
```

### Running the Development Server

After installation, you can run your development server:

```bash
# Using npm
npm run dev

# Using bun
bun run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

This will usually start your development server on port 3000. Open [http://localhost:3000](http://localhost:3000) in your web browser to see your app.

### Quick Example

Here's a simple example of how to use ClickFusion in your React application:

```tsx
import React from 'react';
import { ClickFusion } from 'clickfusion';

export default function App() {
  return (
    <ClickFusion effect="coolmode">
      <button>
        Click Me!
      </button>
    </ClickFusion>
  );
}
```

## Comprehensive Example

Below is an example that demonstrates the usage of all three effects (`coolmode`, `rainmode`, and `partymode`) with full property customization. This example assumes you have a function called `doSomething` that you want to execute when the button is clicked.

```tsx
import React from 'react';
import ClickFusion from 'clickfusion';

const doSomething = () => {
  console.log('Button clicked!');
};

export default function App() {
  return (
    <div>
      {/* Using coolmode effect */}
      <ClickFusion 
        effect="coolmode"
        particleOptions={{
          particle: 'customParticleURL', // Optional
          size: 40, // Optional
          speedHorz: 5, // Optional
          speedUp: 10 // Optional
        }}
      >
        <button onClick={doSomething}>
          Click Me for Cool Effect!
        </button>
      </ClickFusion>
      
      {/* Using rainmode effect */}
      <ClickFusion
        effect="rainmode"
        particleOptions={{
          particle: 'customParticleURL', // Optional
          size: 50, // Optional
          speedDown: 5, // Optional
          particleCount: 30 // Optional
        }}
      >
        <button onClick={doSomething}>
          Click Me for Rain Effect!
        </button>
      </ClickFusion>
      
      {/* Using partymode effect */}
      <ClickFusion
        effect="partymode"
        particleOptions={{
          size: 20, // Optional
          particleCount: 45 // Optional
        }}
      >
        <button onClick={doSomething}>
          Click Me for Party Effect!
        </button>
      </ClickFusion>
    </div>
  );
}
```

## Features

### Customizable Effects

ClickFusion is highly customizable. Whether you're looking to change particle images, sizes, or speeds, we've got you covered. [Learn More](https://clickfusion.mintlify.app/essentials/customEffects)

### Type Safety

Our TypeScript support ensures a robust and type-safe development experience. [Learn More](././src/types.d.ts)

## Quick Links

- [ClickFusion GitHub Repository](https://github.com/BankkRoll/ClickFusion)
- [ClickFusion on NPM](https://www.npmjs.com/package/clickfusion)
- [Official Live Documentation](https://clickfusion.mintlify.app/)
- [Documentation Source Code](https://github.com/BankkRoll/ClickFusion-docs)

## Contributing

Feel free to dive into our [GitHub repository](https://github.com/BankkRoll/ClickFusion) to explore the code and contribute.

## License

This project is licensed under the MIT License.
