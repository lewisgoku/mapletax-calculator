---
name: MapleTax Calculator Design System
colors:
  surface: '#fff8f7'
  surface-dim: '#efd4d3'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0f0'
  surface-container: '#ffe9e8'
  surface-container-high: '#fee2e1'
  surface-container-highest: '#f8dcdc'
  on-surface: '#261818'
  on-surface-variant: '#5a4040'
  inverse-surface: '#3d2c2c'
  inverse-on-surface: '#ffedec'
  outline: '#8e7070'
  outline-variant: '#e2bebe'
  surface-tint: '#b71d36'
  primary: '#73001a'
  on-primary: '#ffffff'
  primary-container: '#9e0027'
  on-primary-container: '#ffa6a8'
  inverse-primary: '#ffb3b4'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#9af1c6'
  on-secondary-container: '#0b714e'
  tertiary: '#003e3c'
  on-tertiary: '#ffffff'
  tertiary-container: '#005754'
  on-tertiary-container: '#87cbc6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad9'
  primary-fixed-dim: '#ffb3b4'
  on-primary-fixed: '#40000a'
  on-primary-fixed-variant: '#920023'
  secondary-fixed: '#9df4c9'
  secondary-fixed-dim: '#81d8ae'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005237'
  tertiary-fixed: '#aaefea'
  tertiary-fixed-dim: '#8fd3ce'
  on-tertiary-fixed: '#00201f'
  on-tertiary-fixed-variant: '#00504d'
  background: '#fff8f7'
  on-background: '#261818'
  surface-variant: '#f8dcdc'
  maple-red: '#9e0027'
  maple-red-container: '#c41e3a'
  emerald: '#006c4a'
  charcoal: '#1c1b1b'
  surface-warm: '#fcf9f8'
  outline-fine: '#8f6f6f'
  outline-subtle: '#e3bebd'
typography:
  h1:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  data-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1'
  data-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1'
  label:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style

The design system is rooted in the principles of Modern Flat Minimalism, drawing inspiration from Swiss International Typographic Style. It prioritizes information hierarchy and mathematical precision over decorative flourishes. The brand voice is institutional and reliable, reflecting the gravity of tax and personal finance while remaining accessible to the modern Canadian taxpayer. 

The visual language communicates "no-nonsense" through strict adherence to a grid, sharp edges, and a deliberate absence of depth-simulating effects like shadows or gradients. By utilizing a high-contrast palette and generous whitespace, the interface reduces cognitive load, allowing users to focus on complex financial calculations with clarity and confidence.

## Colors

The color strategy for this design system is highly functional. The "Maple Red" is reserved strictly for primary calls to action, ensuring it remains a high-signal element that drives users toward completion. "Emerald" is used exclusively for positive financial outcomes, such as take-home pay or tax refunds, creating a consistent psychological link between the color and favorable data.

In Light Mode, the warm off-white background softens the starkness of the charcoal text, providing an editorial feel. In Dark Mode, the palette shifts to deep grays to maintain the "flat" aesthetic without losing legibility. Secondary UI elements like icons, dividers, and disabled states utilize neutral grays to remain subordinate to financial data.

## Typography

This design system employs **Inter** for its utilitarian and neutral character, which excels in data-heavy environments. The hierarchy is established through weight and scale rather than stylistic variation. 

A critical requirement is the use of `tabular-nums` for all currency and numerical data. This ensures that columns of numbers align perfectly, facilitating easier comparison and scanning of financial statements. Labels are rendered in uppercase with slight tracking to distinguish them from interactive body text. Headline weights are kept substantial to anchor the card-based layout.

## Layout & Spacing

This design system follows a **Fixed Grid** model. The primary container is centered with a maximum width of 1200px, divided into a 12-column grid for desktop views. 

Spacing is governed by an 8pt linear scale, though a 4px "base" unit is available for tight component-level adjustments. Generous whitespace is mandated between cards to prevent the UI from feeling cluttered by the complexity of the data. Vertical rhythm is maintained by using the `md` (24px) unit for standard gaps between sections and card internal padding.

## Elevation & Depth

In accordance with the "flat and clean" mandate, this design system rejects drop shadows, blurs, and 3D effects. Depth is communicated solely through:
1.  **0.5px Borders:** Used to define the boundaries of cards and input fields. In high-density areas, borders help separate distinct data sets without adding visual weight.
2.  **Tonal Backgrounds:** Surfaces (cards) use a pure white background in light mode to lift them slightly off the warm off-white page background.
3.  **Strict Layering:** Overlays or modals do not use shadows; instead, they utilize a high-contrast border and a semi-opaque solid color backdrop to isolate focus.

## Shapes

The shape language is strictly **Sharp (0px radius)**. Every element, from buttons and input fields to the main layout cards, must feature 90-degree corners. This reinforces the professional, precise, and institutional nature of the brand. There are no exceptions for "pill-shaped" elements; even tags and chips must maintain a rectangular form factor.

## Components

### Buttons
- **Primary:** Solid Maple Red (#C41E3A) with white text. Sharp corners. No hover gradient; use a subtle brightness shift instead.
- **Secondary:** Transparent background with a 1px Charcoal border.
- **Ghost:** Text-only for utility actions.

### Cards
- Pure white (#FFFFFF) background in light mode.
- 0.5px solid border (#D1D1CB).
- Standard internal padding of 24px.

### Input Fields
- Sharp edges, 1px border.
- Active state uses a 1px Maple Red border (no outer glow).
- Labels positioned above the input in the 'label' typography style.

### Data Tables & Lists
- Use thin 0.5px horizontal dividers only; no vertical lines.
- All currency values must use the `data-md` or `data-lg` typography variants to ensure tabular alignment.
- Positive amounts use Emerald text; negative or neutral amounts use Charcoal.

### Chips/Tags
- Small rectangular containers with 1px gray borders.
- Used for status indicators (e.g., "Filed", "Pending").