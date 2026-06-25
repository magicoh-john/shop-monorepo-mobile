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
    lineHeight: '120%'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '130%'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '140%'
  headline-sm:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '150%'
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '160%'
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '160%'
  label-lg:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '120%'
    letterSpacing: 0.08em
  label-md:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '120%'
  headline-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 28px
    fontWeight: '400'
    lineHeight: '130%'
  # 한국어 전용 토큰 (Pretendard)
  ko-body-lg:
    fontFamily: Pretendard
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '170%'
  ko-body-md:
    fontFamily: Pretendard
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '170%'
  ko-label-lg:
    fontFamily: Pretendard
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '120%'
    letterSpacing: 0.04em
  ko-label-md:
    fontFamily: Pretendard
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '120%'
  ko-headline-sm:
    fontFamily: Pretendard
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '150%'
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
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.md}'
    typography: '{typography.label-lg}'
    padding: 12px 24px
  button-primary-hover:
    backgroundColor: '{colors.primary-container}'
    textColor: '{colors.on-primary}'
  button-ghost:
    backgroundColor: transparent
    textColor: '{colors.primary}'
    rounded: '{rounded.md}'
    typography: '{typography.label-lg}'
    padding: 12px 24px
  button-ghost-hover:
    backgroundColor: '{colors.surface-container-low}'
    textColor: '{colors.primary}'
  product-card:
    backgroundColor: transparent
    rounded: '{rounded.md}'
    typography: '{typography.body-md}'
  product-card-image:
    rounded: '{rounded.md}'
  product-card-name:
    typography: '{typography.body-md}'
    textColor: '{colors.on-surface}'
    fontWeight: '600'
  product-card-price:
    typography: '{typography.body-md}'
    textColor: '{colors.on-surface-variant}'
  product-card-badge-sale:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.on-secondary}'
    rounded: '{rounded.sm}'
    typography: '{typography.label-md}'
  category-tab:
    typography: '{typography.label-lg}'
    textColor: '{colors.on-surface-variant}'
  category-tab-active:
    textColor: '{colors.on-surface}'
  input-field:
    backgroundColor: '{colors.surface-container-low}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    typography: '{typography.body-md}'
  input-field-focus:
    outline: '1px solid {colors.primary}'
  gnb:
    backgroundColor: '{colors.surface}'
    height: 64px
  gnb-mobile:
    backgroundColor: '{colors.surface}'
    height: 56px
  brand-spotlight:
    backgroundColor: '{colors.surface-container-lowest}'
    typography: '{typography.display-lg}'
---

## Brand & Style

This design system is crafted for a high-end, editorial-focused e-commerce experience tailored to women in their 20s. It draws heavy inspiration from the "K-beauty/fashion" aesthetic, characterized by an obsessive attention to detail, breathable layouts, and an emotional connection to the product narrative.

The style is **Minimalist Editorial**. It prioritizes high-quality photography and intentional whitespace over decorative UI elements. The interface acts as a silent gallery frame—sophisticated, calm, and trustworthy—allowing the product's colors and textures to lead the user experience. The emotional response should be one of "attainable luxury"—refined but welcoming.

## Colors

The palette is anchored by a warm, paper-like neutral base that provides more depth than a standard clinical white.

- **Primary (Deep Forest Green):** Used for primary CTAs, active states, and brand-level messaging to convey stability and premium quality.
- **Secondary (Muted Terracotta):** Used sparingly for highlighting sales, special offers, or emotional calls-to-action that require warmth.
- **Neutral:** A range of soft charcoals and greys maintain readability without the harshness of pure black.
- **Surface:** The background (`#fbf9f8`) should be applied to all main body areas to create a soft, inviting canvas.

## Typography

This system uses a sophisticated typographic pairing to create an editorial rhythm.

**Libre Caslon Text** (Serif) is reserved for high-level headings, brand moments, and product titles in "Spotlight" sections, evoking a magazine-like feel.

**Manrope** (Sans-serif) handles all functional UI, product metadata, and body copy in English. Its modern, balanced proportions ensure legibility at small sizes.

**Pretendard** (Korean Sans-serif) is used for all Korean text — product names, descriptions, labels, UI copy. It is the Korean equivalent of Manrope in this system. Never substitute Manrope for Korean text; Manrope does not support Hangul. Load via: `@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css')`.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with generous vertical rhythm.

- **Desktop:** A 12-column grid with 40px side margins. Large sections (like the Brand Spotlight) use the full width, while product grids span 4 columns (4-up).
- **Vertical Spacing:** Use `section-gap` (80px) between major content blocks to prevent the UI from feeling cluttered.
- **Micro-spacing:** Content within cards uses `stack-sm` (8px) for related metadata and `stack-md` (16px) for separating text from imagery.
- **Mobile:** Transition to a 2-column layout with 16px gutters. Product photography must remain impactful on smaller screens.

## Elevation & Depth

To maintain a clean, editorial look, this system avoids traditional heavy shadows. Instead:

- **Tonal Layers:** Subtle shifts in surface color create separation between sections.
- **Low-Contrast Outlines:** Use 1px borders in `outline-variant` (`#c3c8c1`) for cards and input fields.
- **Soft Ambient Shadows:** Reserved exclusively for floating elements (Modals, Dropdowns). Shadows should be highly diffused (20px–30px blur) at very low opacity (5–8%).

## Shapes

The shape language is defined by **Soft Corners**.

- **Standard Elements (buttons, cards, inputs):** `rounded.md` — 12px.
- **Large Banners/Containers:** `rounded.lg` — 16px.
- **Small Interactive Elements (tags, checkboxes):** `rounded.sm` — 4px.
- **Avatars/Category Icons:** `rounded.full` — circular.

## Components

- **Buttons:** Primary buttons use `colors.primary` background with `colors.on-primary` text and `rounded.md`. Ghost buttons are outline-only for secondary actions.
- **Product Cards:** No outer border or shadow. Image has `rounded.md`. Name in `body-md` bold, price in `body-md` regular. Heart icon (wishlist) in top-right corner.
- **Category Tabs:** Underlined active state. Typography is `label-lg`.
- **Input Fields:** `surface-container-low` background, `rounded.md`. Focus state is 1px border in `colors.primary`.
- **Brand Spotlight:** Full-width, `display-lg` serif heading, `body-lg` paragraph, high-resolution lifestyle image.
- **GNB:** Sticky, 64px height (56px mobile). Background blur or solid `colors.surface`. Icons are thin-line 1.5px stroke.

## Do's and Don'ts

### ✅ DO
- Always use design tokens (`{colors.primary}`) — never hardcode hex values directly in components.
- Use **Pretendard** for all Korean text, **Manrope** for English UI, **Libre Caslon Text** for editorial headings only.
- Apply `section-gap` (80px) between all major page sections without exception.
- Use `colors.secondary` (Terracotta) only for sale badges, discounts, and limited-time CTAs.
- Maintain the warm surface background (`#fbf9f8`) across all page sections — do not use pure white (`#ffffff`) as a page background.
- Keep product card images at exactly `rounded.md` (12px) corner radius.

### ❌ DON'T
- Do not invent new hex color values outside the defined color tokens.
- Do not use `colors.primary` (Deep Forest Green) for decorative elements — reserve it strictly for CTAs and active states.
- Do not apply heavy drop shadows to cards or section containers — this breaks the editorial aesthetic.
- Do not use Libre Caslon Text for body copy, labels, or UI metadata — it is for headings only.
- Do not reduce `section-gap` below 48px even on mobile — whitespace is a core design value.
- Do not use `colors.error` for anything other than form validation errors.
