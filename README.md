# ClickFusion
![Version](https://img.shields.io/npm/v/clickfusion?style=plastic&logo=npm&cacheSeconds=3600&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fclickfusion)
![Downloads](https://img.shields.io/npm/dt/clickfusion?style=plastic)
![GitHub issues](https://img.shields.io/github/issues/BankkRoll/ClickFusion?style=plastic)
![GitHub pull requests](https://img.shields.io/github/issues-pr/BankkRoll/ClickFusion?style=plastic)
![License](https://img.shields.io/npm/l/clickfusion?style=plastic)

Welcome to ClickFusion, your go-to library for interactive button effects! This npm package simplifies adding particle effects to your buttons, links, divs or other DOMs. Offering a React functional component to make your UI interactive and delightful.

## Quick Links

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">

<a href="https://github.com/BankkRoll/ClickFusion" style="text-decoration: none;">
<kbd style="padding: 10px;">GitHub Package Repo</kbd>
</a>

<a href="https://www.npmjs.com/package/clickfusion" style="text-decoration: none;">
<kbd style="padding: 10px;">NPM Package</kbd>
</a>

<a href="https://clickfusion.mintlify.app/" style="text-decoration: none;">
<kbd style="padding: 10px;">Live Docs Mintlify</kbd>
</a>

<a href="https://github.com/BankkRoll/ClickFusion-docs" style="text-decoration: none;">
<kbd style="padding: 10px;">GitHub Docs Repo</kbd>
</a>

</div>

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

Below is an example that demonstrates the usage of all three effects (`coolmode`, `rainmode`, `partymode`, `confettimode`, `codemode`, `dragmode`) with full property customization.

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
          particleCount: 200, // Optional: number
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

      {/* Using dragmode effect */}
      <ClickFusion 
        effect="dragmode"
        particleOptions={{
          width: 300, // Optional: number
          height: 300, // Optional: number
          color: 'dark' // Optional: 'light' | 'dark' Transparent by default
        }}
      >
        <button>
          Click Me for Drag Effect!
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
