# ClickFusion
![Version](https://img.shields.io/github/package-json/v/BankkRoll/ClickFusion)
![Downloads](https://img.shields.io/npm/dt/clickfusion)
![GitHub issues](https://img.shields.io/github/issues/BankkRoll/ClickFusion)
![GitHub pull requests](https://img.shields.io/github/issues-pr/BankkRoll/ClickFusion)
![License](https://img.shields.io/npm/l/clickfusion)

Welcome to ClickFusion, your go-to library for interactive button effects! This npm package simplifies adding particle effects to your buttons or links, offering utility hooks and a React functional component to make your UI interactive and delightful.

## Quick Links

[![GitHub Package Repo](https://img.shields.io/badge/GitHub%20Package-ClickFusion-blue)](https://github.com/BankkRoll/ClickFusion)
[![NPM Package](https://img.shields.io/badge/NPM%20Package-ClickFusion-blue)](https://www.npmjs.com/package/clickfusion)
[![Live Docs Mintlify](https://img.shields.io/badge/Live%20Docs-ClickFusion-blue)](https://clickfusion.mintlify.app/)
[![GitHub Docs Repo](https://img.shields.io/badge/GitHub%20Docs-ClickFusion-blue)](https://github.com/BankkRoll/ClickFusion-docs)


## Table of Contents

- [Setting up ClickFusion](#setting-up-clickfusion)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Quick Example](#quick-example)
- [Comprehensive Example](#comprehensive-example)
- [Features](#features)
  - [Customizable Effects](#customizable-effects)
  - [Type Safety](#type-safety)
- [Contributing](#contributing)
- [License](#license)

## Setting up ClickFusion

### Installation

You can install ClickFusion using:

  Using npm
  
  ```bash
  npm i clickfusion
  ```
  
  #### Running the Development Server
  After installation, you can run your development server:
  
  ```bash
  npm run dev
  ```
  

<details>
  <summary>Using bun</summary>
  
  ```bash
  bun add clickfusion
  ```
  
  #### Running the Development Server
  After installation, you can run your development server:
  
  ```bash
  bun run dev
  ```
  
</details>

<details>
  <summary>Using yarn</summary>
  
  ```bash
  yarn add clickfusion
  ```
  
  #### Running the Development Server
  After installation, you can run your development server:
  
  ```bash
  yarn dev
  ```
  
</details>

<details>
  <summary>Using pnpm</summary>
  
  ```bash
  pnpm add clickfusion
  ```
  
  #### Running the Development Server
  After installation, you can run your development server:
  
  ```bash
  pnpm dev
  ```
  
</details>

This will usually start your development server on port 3000. Open [http://localhost:3000](http://localhost:3000) in your web browser to see your app.

### Quick Example

Here's a simple example of how to use ClickFusion in your React application:

```tsx
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

Below is an example that demonstrates the usage of all three effects (`coolmode`, `rainmode`, `partymode`, `confettimode`, `codemode`) with full property customization.

```tsx
import { ClickFusion } from 'clickfusion';

export default function App() {
  return (
    <div>
      {/* Using coolmode effect */}
      <ClickFusion 
        effect="coolmode"
        particleOptions={{
          particle: 'customParticleURL', // Optional: string
          size: 40, // Optional: number
          speedHorz: 5, // Optional: number
          speedUp: 10 // Optional: number
        }}
      >
        <button>
          Click Me for Cool Effect!
        </button>
      </ClickFusion>
      
      {/* Using rainmode effect */}
      <ClickFusion
        effect="rainmode"
        particleOptions={{
          particle: 'customParticleURL', // Optional: string
          size: 50, // Optional: number
          speedDown: 5, // Optional: number
          particleCount: 30 // Optional: number
        }}
      >
        <button>
          Click Me for Rain Effect!
        </button>
      </ClickFusion>
      
      {/* Using partymode effect */}
      <ClickFusion
        effect="partymode"
        particleOptions={{
          size: 20, // Optional: number
          particleCount: 45 // Optional: number
        }}
      >
        <button>
          Click Me for Party Effect!
        </button>
      </ClickFusion>

      {/* Using confettimode effect */}
      <ClickFusion 
        effect="confettimode"
        particleOptions={{
          particleCount: 100, // Optional: number
          speedDown: 5, // Optional: number
          color: 'rainbow' // Optional: 'rainbow' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple'
        }}
      >
        <button>
          Click Me for Confetti Effect!
        </button>
      </ClickFusion>

      {/* Using codemode effect */}
      <ClickFusion 
        effect="codemode"
        particleOptions={{
          particleCount: 30, // Optional: number
          speedDown: 5, // Optional: number
          color: 'light' // Optional: 'light' | 'dark'
        }}
      >
        <button>
          Click Me for Code Effect!
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

## Contributing

Feel free to dive into our [GitHub repository](https://github.com/BankkRoll/ClickFusion) to explore the code and contribute.

## License

This project is licensed under the MIT License.
