# t : mer

A modern, minimalist timer application built with Next.js and TypeScript.

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

- 🎯 Clean, minimalist interface
- ⌨️ Keyboard-first controls
- 🔗 Shareable timer states via URL

## Getting Started

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

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

## Git Branch Structure

This project follows a structured branching strategy to maintain code quality and organization:

| Branch Name   | Purpose                                      |
|---------------|----------------------------------------------|
| `main`        | Stable, production-ready code                |
| `develop`     | Latest development changes (unstable)       |
| `feature/*`   | New features being developed                 |
| `bugfix/*`    | Fixes for bugs in the code                   |
| `hotfix/*`    | Urgent fixes that need to be applied to `main` |

### Workflow

1. Start with the `develop` branch for ongoing work
2. Create a `feature/*` or `bugfix/*` branch as needed
3. Merge changes back to `develop` when complete
4. Periodically merge `develop` into `main` to keep it updated

### Branch Naming Conventions

- Feature branches: `feature/feature-name`
- Bug fix branches: `bugfix/bug-description`
- Hot fix branches: `hotfix/fix-description`

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

## Keyboard Shortcuts

- `Space`: Start/Stop timer
- `R`: Reset timer
- `1-9`: Set duration (in minutes)
- `Enter`: Apply duration input
- `.`: Add 30 seconds to current duration

## Documentation

- [Development Guide](docs/DEVELOPMENT.md) - Comprehensive guide for developers
- [API Documentation](docs/API.md) - API endpoints and usage
- [Component Library](docs/components/README.md) - UI components documentation

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Project Structure

```
t-mer/
├── app/                 # Next.js app directory
├── components/         # Reusable components
├── docs/              # Documentation
├── public/            # Static assets
├── styles/            # Global styles
└── types/             # TypeScript type definitions
```

## Contributing

Please read our [Development Guide](docs/DEVELOPMENT.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
