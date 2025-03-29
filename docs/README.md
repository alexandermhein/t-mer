# T:MER – Simple Web-based Timer App

A modern, minimalist timer application built with Next.js 13+ and TypeScript. Features a beautiful, responsive design with smooth animations and keyboard controls.

## Features

- 🎯 Clean, minimalist interface
- ⌨️ Keyboard-first controls
- 🌓 Dark/Light mode support
- ⚡ Smooth animations with Framer Motion
- 📱 Fully responsive design
- ♿ Accessibility focused

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Theme**: Custom CSS Variables

## Prerequisites

- Node.js 18.0.0 or later
- npm or yarn package manager

## UI/UX Design Principles

### Visual Design
- **Minimalist Aesthetic**: Clean, uncluttered interface focusing on essential elements
- **Visual Hierarchy**: Clear distinction between primary and secondary information
- **Consistent Spacing**: Systematic use of spacing for improved readability
- **Typography**: Clear, legible font choices with appropriate sizing hierarchy
- **Color Usage**: Purposeful color application for state indication and emphasis

### Interaction Design
- **Keyboard-First Approach**: All functionality accessible via keyboard
- **Progressive Disclosure**: Controls appear contextually to reduce cognitive load
- **Immediate Feedback**: Visual and auditory responses to user actions
- **Gesture Support**: Touch-friendly interactions for mobile devices
- **State Persistence**: Timer state maintained across page refreshes

### Animation Guidelines
- **Purposeful Motion**: Animations serve functional purposes, not just decoration
- **Performance**: Optimized animations for smooth performance
- **Duration**: Quick, snappy transitions (150-300ms) for responsiveness
- **Easing**: Natural easing curves for organic feel
- **Reduced Motion**: Respects user preferences for reduced motion

### Accessibility Standards
- **WCAG 2.1 Compliance**: Meeting AA level standards
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Comprehensive ARIA implementation
- **Color Contrast**: Meeting WCAG contrast requirements
- **Focus Management**: Clear focus indicators and logical tab order

## Project Structure

```
t-mer/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page component
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Timer.tsx         # Main timer component
│   ├── TimerDisplay.tsx  # Timer display component
│   ├── TimerControls.tsx # Timer controls component
│   ├── MouseTrail.tsx    # Mouse trail effect
│   └── TimerWrapper.tsx  # Timer wrapper with URL params
└── docs/                  # Documentation
    ├── app/              # App documentation
    └── components/       # Component documentation
```

## Keyboard Controls

- `Space`: Start/Stop timer
- `R`: Reset timer
- `1-9`: Set duration (in minutes)
- `.`: Add 30 seconds increments (e.g. 3:30 minutes or 11:30 minutes)

## Development

### Code Style

The project uses TypeScript with strict type checking. Follow these guidelines:

- Use functional components with hooks
- Implement proper TypeScript types
- Follow the existing component structure
- Maintain accessibility standards

### Component Documentation

Each component is documented in the `docs/` directory with:
- Technical details
- Props interface
- State management
- Usage examples
- Testing considerations

### Styling

The app uses a combination of:
- Tailwind CSS for utility classes
- Custom CSS variables for theming
- Framer Motion for animations
- Component-specific styles

### UI/UX Development Guidelines

1. **Component Design**
   - Maintain consistent spacing and alignment
   - Use semantic HTML elements
   - Implement responsive breakpoints
   - Follow accessibility best practices

2. **State Management**
   - Clear state transitions
   - Predictable user feedback
   - Error state handling
   - Loading state management

3. **Performance**
   - Optimize animations
   - Minimize re-renders
   - Efficient event handling
   - Resource loading optimization


Created with ❤️ by Alexander Hein 