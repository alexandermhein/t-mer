# T-Mer Timer App

A modern, minimalist timer application built with Next.js 13+ and TypeScript. Features a beautiful, responsive design with smooth animations and keyboard controls.

## Features

- 🎯 Clean, minimalist interface
- ⌨️ Keyboard-first controls
- 🌓 Dark/Light mode support
- ⚡ Smooth animations with Framer Motion
- 🎨 Custom theme system
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

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/t-mer.git
   cd t-mer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
- `Enter`: Apply duration input

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

## Building for Production

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)

## Built in Hong Kong 🇭🇰

Created with ❤️ by Alexander Hein 