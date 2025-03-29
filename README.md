# T-Mer Timer App

A modern, minimalist timer application built with Next.js and TypeScript.

## Features

- Clean, intuitive interface
- Keyboard shortcuts for quick control
- Customizable timer duration
- Visual and audio notifications
- Responsive design for all devices
- Beautiful mouse trail effect

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
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

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