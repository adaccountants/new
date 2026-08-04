# Aura Animate

Act as a senior frontend engineer. Build smooth, scroll-driven UI animations for a modern web design using React, Tailwind CSS, and Framer Motion.

Implement the following animation specifications across the site components:

1. Reusable Scroll Reveal Wrapper (<ScrollAnimate>):

- Create a container wrapper that triggers when 20% of the element enters the viewport (`amount: 0.2`).

- As the element scrolls into view, animate opacity from `0` to `1`, translate vertically from `y: 40px` to `y: 0px`, and scale from `0.96` to `1`.

- Set the animation duration to 0.6s using an `easeOut` easing curve (`[0.22, 1, 0.36, 1]`).

2. Staggered Horizontal Cards Carousel:

- Build a section for service/portfolio cards that animate sequentially when scrolled into view.

- Apply a staggered delay of 0.15s between each card's entry.

- Each card should slide in horizontally from the right (`x: 50px` to `x: 0px`) while fading in.

- Add a hover state: when a card is hovered, scale the background image inside up to `1.05` over 0.3s without affecting the floating overlay pill label.

3. Parallax Hero & Card Micro-Interactions:

- Add subtle parallax effects on scroll for the hero image section and the dark feature container block.

- Include interactive hover physics for buttons (`whileHover={{ scale: 1.03 }}` and `whileTap={{ scale: 0.97 }}`).

Provide the complete production-ready React code, complete with Tailwind CSS classes, Framer Motion properties, and clean type definitions/props.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://scroll-joy-animate.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7c6b96d8-85c0-4833-9ed4-6d94d164b029).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
