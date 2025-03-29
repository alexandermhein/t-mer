# Development Guide

This document outlines the development setup, workflow, and best practices for the T-Mer project.

## Table of Contents
- [Environment Setup](#environment-setup)
- [Git Workflow](#git-workflow)
- [Environment Variables](#environment-variables)
- [Development Guidelines](#development-guidelines)
- [Deployment](#deployment)

## Environment Setup

### Prerequisites
- Node.js (LTS version recommended)
- Git
- npm or yarn

### Initial Setup
1. Clone the repository:
   ```bash
   git clone git@github.com:alexandermhein/t-mer.git
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
   Edit `.env.local` with your specific configuration.

### Development Server
To start the development server:
```bash
npm run dev
# or
yarn dev
```
The application will be available at `http://localhost:3000`.

## Git Workflow

### Branch Structure
- `main`: Production branch
- `develop`: Development branch
- Feature branches: `feature/*`
- Bug fix branches: `fix/*`
- Release branches: `release/*`

### Workflow Steps

1. **Starting New Work**
   ```bash
   # Ensure you're on develop branch
   git checkout develop
   git pull origin develop

   # Create and switch to new feature branch
   git checkout -b feature/your-feature-name
   ```

2. **Making Changes**
   - Make your changes
   - Commit with meaningful messages:
     ```bash
     git add .
     git commit -m "feat: description of your changes"
     ```

3. **Completing Feature**
   ```bash
   # Push your feature branch
   git push origin feature/your-feature-name

   # Switch back to develop
   git checkout develop
   git pull origin develop

   # Merge your feature
   git merge feature/your-feature-name
   git push origin develop
   ```

4. **Preparing for Production**
   ```bash
   # Switch to main branch
   git checkout main
   git pull origin main

   # Merge develop into main
   git merge develop
   git push origin main
   ```

### Commit Message Guidelines
- Use conventional commits format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `style:` for formatting changes
  - `refactor:` for code refactoring
  - `test:` for adding tests
  - `chore:` for maintenance tasks

## Environment Variables

### Available Environment Files
- `.env.example`: Template file with all possible variables
- `.env.development`: Development environment settings
- `.env.production`: Production environment settings
- `.env.local`: Local overrides (not committed to git)

### Required Variables
```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Optional Variables
```env
# Authentication
AUTH_SECRET=your-secret-here
AUTH_URL=http://localhost:3000

# Database
DATABASE_URL=your-database-url

# External Services
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful comments for complex logic
- Keep components small and focused

### Testing
- Write unit tests for critical functionality
- Include integration tests for API endpoints
- Run tests before committing changes:
  ```bash
  npm test
  # or
  yarn test
  ```

### Performance
- Optimize images and assets
- Implement proper code splitting
- Monitor bundle size
- Use performance monitoring tools

## Deployment

### Development
- Development environment is automatically deployed from the `develop` branch
- URL: [Development URL]

### Production
- Production environment is deployed from the `main` branch
- URL: https://t-mer.vercel.app

### Deployment Process
1. Ensure all tests pass
2. Merge `develop` into `main`
3. Push to `main`
4. Monitor deployment status
5. Verify changes in production

## Troubleshooting

### Common Issues
1. **Environment Variables Not Loading**
   - Ensure `.env.local` exists
   - Check variable naming (NEXT_PUBLIC_ prefix for client-side)
   - Restart development server

2. **Build Failures**
   - Clear `.next` directory
   - Remove `node_modules`
   - Reinstall dependencies
   - Check for TypeScript errors

3. **Git Issues**
   - Use `git status` to check current state
   - Ensure you're on the correct branch
   - Pull latest changes before starting work

## Support

For additional support or questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the project documentation 