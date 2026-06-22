---
name: Serene Editorial
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#434843'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#737973'
  outline-variant: '#c3c8c1'
  surface-tint: '#4d6453'
  primary: '#061b0e'
  on-primary: '#ffffff'
  primary-container: '#1b3022'
  on-primary-container: '#819986'
  inverse-primary: '#b4cdb8'
  secondary: '#9f402d'
  on-secondary: '#ffffff'
  secondary-container: '#fd876f'
  on-secondary-container: '#732010'
  tertiary: '#271013'
  on-tertiary: '#ffffff'
  tertiary-container: '#3f2427'
  on-tertiary-container: '#b0898c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d0e9d4'
  primary-fixed-dim: '#b4cdb8'
  on-primary-fixed: '#0b2013'
  on-primary-fixed-variant: '#364c3c'
  secondary-fixed: '#ffdad3'
  secondary-fixed-dim: '#ffb4a5'
  on-secondary-fixed: '#3e0500'
  on-secondary-fixed-variant: '#802918'
  tertiary-fixed: '#ffd9dc'
  tertiary-fixed-dim: '#e7bcbf'
  on-tertiary-fixed: '#2d1417'
  on-tertiary-fixed-variant: '#5d3f42'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  headline-sm:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.5'
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  label-lg:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.08em
  label-md:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 28px
    fontWeight: '400'
    lineHeight: '1.3'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  section-gap: 80px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

This design system is crafted for a high-end, editorial-focused e-commerce experience tailored to women in their 20s. It draws heavy inspiration from the "K-beauty/fashion" aesthetic, characterized by an obsessive attention to detail, breathable layouts, and an emotional connection to the product narrative.

The style is **Minimalist Editorial**. It prioritizes high-quality photography and intentional whitespace over decorative UI elements. The interface acts as a silent gallery frame—sophisticated, calm, and trustworthy—allowing the product's colors and textures to lead the user experience. The emotional response should be one of "attainable luxury"—refined but welcoming.

## Colors

The palette is anchored by a warm, paper-like neutral base that provides more depth than a standard clinical white. 

- **Primary (Deep Forest Green):** Used for primary CTAs, active states, and brand-level messaging to convey stability and premium quality.
- **Secondary (Muted Terracotta):** Used sparingly for highlighting sales, special offers, or emotional calls-to-action that require warmth.
- **Neutral:** A range of soft charcoals and greys (e.g., #4A4A4A for body text, #E5E1DE for borders) maintain readability without the harshness of pure black.
- **Surface:** The background (#FDFBF9) should be applied to all main body areas to create a soft, inviting canvas.

## Typography

This system uses a sophisticated typographic pairing to create an editorial rhythm. **Libre Caslon Text** (Serif) is reserved for high-level headings, brand moments, and product titles in "Spotlight" sections, evoking a magazine-like feel. 

**Manrope** (Sans-serif) handles all functional UI, product metadata, and body copy. Its modern, balanced proportions ensure legibility at small sizes and high-density information areas like checkout and filters. Use wide letter-spacing on labels to add a sense of luxury and "breathing room."

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with generous vertical rhythm. 

- **Desktop:** A 12-column grid with 40px side margins. Large sections (like the Brand Spotlight) should use the full width, while product grids typically span 4 columns (3-up) or 3 columns (4-up).
- **Vertical Spacing:** Use `section-gap` (80px) between major content blocks (e.g., between Hero and New Arrivals) to prevent the UI from feeling cluttered.
- **Micro-spacing:** Content within cards should use `stack-sm` (8px) for related metadata and `stack-md` (16px) for separating text from imagery.
- **Mobile:** Transition to a 2-column or 1-column layout with 16px gutters to ensure product photography remains impactful on smaller screens.

## Elevation & Depth

To maintain a clean, editorial look, this system avoids traditional heavy shadows. Instead, it uses:

- **Tonal Layers:** Subtle shifts in surface color (e.g., using a slightly cooler grey for the Global Navigation Bar background) to create separation.
- **Low-Contrast Outlines:** Use 1px borders in a very soft neutral (#E5E1DE) for cards and input fields.
- **Soft Ambient Shadows:** Reserved exclusively for floating elements like Modals or Dropdown menus. These shadows should be highly diffused (20px-30px blur) with very low opacity (5-8%) to feel like natural light hitting a matte surface.

## Shapes

The shape language is defined by **Soft Corners**. While the layout is structured and grid-based, the 12px-16px corner radius on buttons, product cards, and banners softens the overall aesthetic, making it feel more approachable and feminine.

- **Standard Elements:** 12px (0.75rem).
- **Large Banners/Containers:** 16px (1rem).
- **Interactive Small Elements:** Use a 4px radius for checkboxes or small tags to keep them crisp.
- **Avatars/Category Icons:** Circular (Full round) to provide a visual contrast to the rectangular product photography.

## Components

- **Buttons:** Primary buttons use the Deep Forest Green background with white text. They should have a 12px radius and use `label-lg` typography. Ghost buttons (outline only) are used for secondary actions.
- **Product Cards:** No outer border or shadow. The image should have a 12px corner radius. Product name in `body-md` (bold) and price in `body-md` (regular). Use a small "Heart" icon in the top right corner for wishlisting.
- **Category Tabs:** Use a clean, underlined style for the active state. Typography should be `label-lg` for a modern, fashion-forward look.
- **Input Fields:** Soft neutral background (#F3F0ED) with 12px radius. Focus state should be a 1px border in Deep Forest Green.
- **Brand Spotlight:** A full-width component using a large serif heading (`display-lg`), a short paragraph in `body-lg`, and a high-resolution lifestyle image.
- **Global Navigation (GNB):** Sticky at the top, using a background blur effect or the solid warm-white base. Icons should be thin-line (1.5px stroke) to match the elegant typography.