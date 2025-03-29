# Global Styles

## Overview
The global styles file provides the foundation for the application's styling system, implementing Tailwind CSS utilities, custom theme variables, and component-specific styles. It establishes a consistent design system across the application.

## Technical Details
- **Location**: `app/globals.css`
- **Type**: Global CSS file
- **Dependencies**:
  - Tailwind CSS
  - Custom theme variables
  - Component-specific styles

## Style Structure

### Tailwind Integration
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- Base styles
- Component classes
- Utility classes
- Custom extensions

### Theme Configuration

#### Light Theme Variables
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}
```

#### Dark Theme Variables
```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}
```

### Base Styles
```css
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```
- Global border styles
- Body background
- Text colors
- Base typography

### Component Styles

#### Slider Customization
```css
.slider-custom .slider-track {
  height: 4px !important;
  background-color: #e9eaeb !important;
}
.slider-custom .slider-range {
  background-color: #c732b3 !important;
}
.slider-custom .slider-thumb {
  width: 20px !important;
  height: 20px !important;
  background-color: white !important;
  border: 2px solid #c732b3 !important;
}
```
- Track styling
- Range indicator
- Thumb appearance
- Custom colors

## Color System

### Primary Colors
- Background: HSL(0, 0%, 100%)
- Foreground: HSL(222.2, 84%, 4.9%)
- Primary: HSL(222.2, 47.4%, 11.2%)
- Accent: HSL(210, 40%, 96.1%)

### Dark Mode Colors
- Background: HSL(222.2, 84%, 4.9%)
- Foreground: HSL(210, 40%, 98%)
- Primary: HSL(210, 40%, 98%)
- Accent: HSL(217.2, 32.6%, 17.5%)

## Typography

### Base Styles
- Font family inheritance
- Line height normalization
- Text color inheritance
- Font smoothing

### Component Typography
- Heading styles
- Body text styles
- Link styles
- List styles

## Layout System

### Container Styles
- Max-width constraints
- Padding and margins
- Responsive breakpoints
- Grid system

### Spacing System
- Consistent spacing scale
- Margin utilities
- Padding utilities
- Gap utilities

## Component-Specific Styles

### Timer Component
- Background colors
- Text colors
- Animation styles
- Layout styles

### Controls Component
- Button styles
- Input styles
- Slider styles
- Interactive states

## Responsive Design

### Breakpoints
- Mobile-first approach
- Tablet breakpoints
- Desktop breakpoints
- Large screen support

### Adaptive Styles
- Fluid typography
- Responsive spacing
- Flexible layouts
- Touch-friendly

## Performance Considerations
1. **CSS Optimization**
   - Purge unused styles
   - Minimize CSS
   - Efficient selectors
   - Reduced specificity

2. **Loading Performance**
   - Critical CSS
   - Deferred loading
   - Resource hints
   - Cache optimization

## Accessibility
1. **Color Contrast**
   - WCAG compliance
   - Dark mode support
   - Focus states
   - Error states

2. **Typography**
   - Readable font sizes
   - Line heights
   - Letter spacing
   - Font weights

## Testing Considerations
1. **Style Testing**
   - Theme switching
   - Component styles
   - Responsive behavior
   - Animation states

2. **Browser Compatibility**
   - Cross-browser support
   - Feature detection
   - Fallback styles
   - Vendor prefixes

3. **Performance Testing**
   - CSS bundle size
   - Loading time
   - Render performance
   - Animation smoothness

4. **Accessibility Testing**
   - Color contrast
   - Focus management
   - Screen reader support
   - Keyboard navigation

5. **Responsive Testing**
   - Device breakpoints
   - Orientation changes
   - Touch interactions
   - Layout adaptation 