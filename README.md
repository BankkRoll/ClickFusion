- `ClickFusion.tsx`: A React functional component that wraps around a button or link to apply the particle effect.

- `coolMode.ts`, `partyMode.ts` and `rainMode.ts`: Utility files that contain hooks (`useCoolModeEffect`, `usePartyModeEffect` and `useRainingModeEffect`) to apply specific particle effects.

- `index.d.ts`: Type definitions for our project, ensuring type safety and better developer experience.

---

```sql
|-- src/
| |-- components/
| | |-- ClickFusion.tsx
| |-- utils/
| | |-- index.ts
| | |-- coolMode.ts
| | |-- rainMode.ts
| | |-- partyMode.ts
|-- types/
| |-- index.d.ts
|-- README.md
|-- package.json
|-- tsconfig.json
```
---

```ts
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