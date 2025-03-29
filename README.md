# t : mer

A modern, minimalist timer application built with Next.js 13+ and TypeScript. Features a beautiful, responsive design with smooth animations and keyboard controls.

## Features

- 🎯 Clean, minimalist interface
- ⌨️ Keyboard-first controls
- 🔗 Shareable timer states via URL

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Theme**: Custom CSS Variables
- **Testing**: Jest & React Testing Library
- **Deployment**: Vercel

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/alexandermhein/t-mer.git
   cd t-mer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Documentation

For comprehensive documentation, visit our [Wiki](https://github.com/alexandermhein/t-mer/wiki):

- [Getting Started](https://github.com/alexandermhein/t-mer/wiki/Getting-Started)
- [User Guide](https://github.com/alexandermhein/t-mer/wiki/User-Guide)
- [Architecture](https://github.com/alexandermhein/t-mer/wiki/Architecture)
- [Components](https://github.com/alexandermhein/t-mer/wiki/Components)
- [Development Guide](https://github.com/alexandermhein/t-mer/wiki/Development-Guide)
- [API Reference](https://github.com/alexandermhein/t-mer/wiki/API-Reference)
- [Styling Guide](https://github.com/alexandermhein/t-mer/wiki/Styling-Guide)

## Keyboard Controls

- `Space`: Start/Stop timer
- `R`: Reset timer
- `1-9`: Set duration (in minutes)

## Project Structure

```
t-mer/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page component
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── timer.tsx         # Main timer component
│   ├── timer-display.tsx  # Timer display component
│   ├── timer-controls.tsx # Timer controls component
│   ├── mouse-trail.tsx    # Mouse trail effect
│   ├── theme-provider.tsx # Theme management
│   ├── timer-wrapper.tsx  # URL parameter handling
│   └── ui/              # Shared UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── styles/               # Additional styles
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── docs/                # Documentation
```

## Development

### Prerequisites

- Node.js 18.0.0 or later
- npm, yarn, or pnpm package manager
- Git

### Code Style

The project uses TypeScript with strict type checking. Follow these guidelines:

- Use functional components with hooks
- Implement proper TypeScript types
- Follow the existing component structure
- Maintain accessibility standards
- Write comprehensive tests
- Document your changes

### Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Building for Production

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   ```

2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   # or
   pnpm start
   ```

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/alexandermhein/t-mer/wiki/Contributing) for details on how to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [License](https://github.com/alexandermhein/t-mer/wiki/License) page for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Deployed on [Vercel](https://vercel.com)

## Built in Hong Kong 🇭🇰

Created with ❤️ by Alexander Hein 