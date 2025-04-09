# Theme Implementation

## Overview
The theme implementation provides a consistent design system with dark/light mode support using CSS variables and Tailwind CSS.

## Technical Details
- **Location**: `components/theme/ThemeProvider.tsx`
- **Type**: Client Component
- **Dependencies**: React, Tailwind CSS

## Implementation

### CSS Variables
```css
:root {
  /* Light theme variables */
  --background: #ffffff;
  --foreground: #1a1a1a;
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --secondary: #f3f4f6;
  --secondary-hover: #e5e7eb;
  --accent: #10b981;
  --accent-hover: #059669;
  --error: #ef4444;
  --error-hover: #dc2626;
  --success: #22c55e;
  --success-hover: #16a34a;
  --warning: #f59e0b;
  --warning-hover: #d97706;
  --info: #3b82f6;
  --info-hover: #2563eb;
}

[data-theme="dark"] {
  /* Dark theme variables */
  --background: #1a1a1a;
  --foreground: #ffffff;
  --primary: #60a5fa;
  --primary-hover: #3b82f6;
  --secondary: #374151;
  --secondary-hover: #4b5563;
  --accent: #34d399;
  --accent-hover: #10b981;
  --error: #f87171;
  --error-hover: #ef4444;
  --success: #4ade80;
  --success-hover: #22c55e;
  --warning: #fbbf24;
  --warning-hover: #f59e0b;
  --info: #60a5fa;
  --info-hover: #3b82f6;
}
```

### Theme Provider Component
```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={`min-h-screen bg-[var(--background)] text-[var(--foreground)]`}>
      {children}
    </div>
  );
}
```

### Tailwind Configuration
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          hover: 'var(--secondary-hover)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
        },
        error: {
          DEFAULT: 'var(--error)',
          hover: 'var(--error-hover)',
        },
        success: {
          DEFAULT: 'var(--success)',
          hover: 'var(--success-hover)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          hover: 'var(--warning-hover)',
        },
        info: {
          DEFAULT: 'var(--info)',
          hover: 'var(--info-hover)',
        },
      },
    },
  },
  plugins: [],
}
```

## Usage Examples

### Basic Usage
```tsx
// In layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// In components
<div className="bg-background text-foreground">
  <button className="bg-primary hover:bg-primary-hover">
    Click me
  </button>
</div>
```

### Theme Toggle
```tsx
function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-secondary hover:bg-secondary-hover"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

## Features
- System theme detection
- Manual theme toggle
- CSS variable-based theming
- Tailwind CSS integration
- Smooth theme transitions
- Persistent theme preference

## Performance Considerations
- Uses CSS variables for efficient updates
- Minimizes re-renders
- Optimizes theme switching
- Handles system theme changes

## Accessibility
- High contrast ratios
- Consistent color scheme
- Clear visual hierarchy
- Screen reader support 