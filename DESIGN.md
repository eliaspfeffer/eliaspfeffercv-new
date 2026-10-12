---
name: Elias Pfeffer portfolio
description: Portrait-centered extension of the existing portfolio
colors:
  ink: "#202823"
  paper: "#f7f7f4"
  secondary-text: "#535c55"
  subtle-surface: "#e7ebe5"
  divider: "#bbc4ba"
  link-hover: "#345843"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(3.75rem, 6.2vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.95rem"
    lineHeight: 1.7
rounded:
  square: "0px"
spacing:
  panel: "24px"
  desktop-gutter: "40px"
  project-row: "80px"
components:
  topic:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "0.55rem 0.75rem"
  topic-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "0.55rem 0.75rem"
  project-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "24px"
---

# Design System: Elias Pfeffer portfolio

## Overview

**Creative North Star: "Elias at the center"**

This records the built local portrait extension, not a new global brand commitment. The existing portfolio's restrained typography, factual project content and component library remain. The photograph supplies the expressive material; flat opaque panels keep the work readable over it.

**Key Characteristics:**
- Real photography carries the composition.
- Opaque paper panels protect reading contrast.
- Existing Inter typography and project media remain.
- Native scrolling preserves ordinary browser navigation.

## Colors

The surface uses softly tinted paper with green-black text. The color tokens above describe authored styles. Browser extensions such as Dark Reader can transform these colors; they are not a separate authored theme. Existing shadcn/Tailwind tokens still serve embedded controls and media.

## Typography

Inter is loaded through next/font in app/layout.tsx. Display typography is reserved for Elias's name. Project titles use a compact bold hierarchy; descriptions retain comfortable line height. Keep the original factual copy, allowing natural wrapping rather than shortening project titles to fit.

## Layout

The home composition is documented in .impeccable/surfaces/home.md. Containers reach 1600px. Desktop side gutters are generous; mobile uses smaller gutters. Navigation remains fixed and anchor targets respect its height. The centered photograph and staggered columns are specific to this surface, not a prescription for other routes.

## Elevation & Depth

Portrait panels and project panels are flat, without drop shadows. Existing media widgets keep their incumbent rendering. Opaque backgrounds matter for legibility against the image and under browser color transformations.

## Shapes

Project panels and topic filters use square edges. Existing rounded media and component-library controls remain. Do not reinterpret the photograph with a geometric cutout.

## Components

Navigation preserves the name, Projects and Contact anchors. Intro links use underlines with inline Lucide arrows. Project panels preserve external links, media, tags and dates. Topic filters and newsletter selections are buttons with pressed states. The email field has an accessible name, and subscription feedback uses status or alert roles.

Carousel controls have accessible labels. Image autoplay is disabled when reduced motion is requested, while manual navigation remains available. The portrait requires no JavaScript scroll handler.

## Do's and Don'ts

### Do:
- Do preserve project content, media and links.
- Do use opaque surfaces behind text over the photograph.
- Do keep keyboard controls and reduced-motion behavior working.

### Don't:
- Don't replace the real portrait with generated likenesses.
- Don't hide essential content behind scroll animations.
- Don't treat the local experiment as permission to publish.
