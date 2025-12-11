# Multi-Step Form

A simple multi-step form built with Vue 3, TypeScript, Vite, and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

For production:

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev` – Start the local development server.  
- `npm run build` – Build the app for production.  
- `npm run preview` – Preview the production build locally.

## Project Structure

- `src/main.ts` – App entry point and mount.  
- `src/App.vue` – Multi-step layout, navigation logic, and step handling.  
- `src/components/StepOne.vue` … `StepFour.vue` – Individual form steps.  
- `src/components/ThankYou.vue` – Final confirmation screen.  

## Tech Stack

- Vue 3 + TypeScript for typed components and Composition API.
- Vite as build tool and dev server.
- Tailwind CSS for responsive card layout and form styling.
- DaisyUI as a Tailwind CSS component library for buttons, cards, and other UI elements.