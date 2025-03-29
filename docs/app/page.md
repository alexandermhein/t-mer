# Page Component

## Overview
The Page component serves as the main entry point for the timer application, providing the layout structure and integrating all major components. It implements a clean, minimalist design with a dark background and centered content.

## Technical Details
- **Location**: `app/page.tsx`
- **Type**: Server Component (default in Next.js 13+)
- **Dependencies**:
  - Next.js Suspense
  - TimerWrapper component
  - MouseTrail component

## Component Structure

### Main Component
```typescript
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-timer-background relative">
      <MouseTrail />
      <div className="absolute top-4 text-gray-300 text-sm">T:mer – Built in Hong Kong</div>
      <Suspense fallback={<TimerFallback />}>
        <TimerWrapper />
      </Suspense>
    </main>
  )
}
```

### Fallback Component
```typescript
function TimerFallback() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute w-full text-center text-[25vw] font-bold text-gray-200 select-none">00:00</div>
      <div className="absolute z-10 bg-white rounded-lg shadow-lg p-10 w-full max-w-md mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-gray-100 rounded-full px-6 py-3 text-gray-800 font-medium">Loading...</div>
        </div>
      </div>
    </div>
  )
}
```

## Styling

### Main Container
```css
.flex min-h-screen flex-col items-center justify-center bg-timer-background relative
```
- Flex container
- Minimum full viewport height
- Column direction
- Centered content
- Dark background
- Relative positioning

### Attribution Text
```css
.absolute top-4 text-gray-300 text-sm
```
- Absolute positioning
- Top spacing
- Light gray text
- Small font size

### Fallback Container
```css
.relative w-full h-screen flex items-center justify-center overflow-hidden
```
- Relative positioning
- Full width
- Full viewport height
- Centered content
- Hidden overflow

### Fallback Timer Display
```css
.absolute w-full text-center text-[25vw] font-bold text-gray-200 select-none
```
- Absolute positioning
- Full width
- Centered text
- Responsive font size
- Bold weight
- Light gray text
- Non-selectable

### Fallback Controls
```css
.absolute z-10 bg-white rounded-lg shadow-lg p-10 w-full max-w-md mx-auto
```
- Absolute positioning
- High z-index
- White background
- Rounded corners
- Shadow effect
- Padding
- Maximum width
- Centered horizontally

## Component Integration

### MouseTrail Integration
- Positioned at the root level
- Provides visual enhancement
- Non-interfering with main functionality

### TimerWrapper Integration
- Wrapped in Suspense for loading state
- Centered in the viewport
- Handles URL parameter configuration

### Fallback State
- Shows during TimerWrapper loading
- Maintains visual consistency
- Provides user feedback

## Performance Considerations
- Uses Suspense for code splitting
- Optimizes initial load
- Handles loading states gracefully
- Efficient component mounting

## Accessibility
- Semantic HTML structure
- Clear visual hierarchy
- Proper contrast ratios
- Screen reader compatibility

## Testing Considerations
1. **Layout Testing**
   - Responsive behavior
   - Component positioning
   - Overflow handling
   - Visual alignment

2. **Loading States**
   - Fallback display
   - Transition smoothness
   - Content visibility
   - State persistence

3. **Component Integration**
   - MouseTrail functionality
   - TimerWrapper behavior
   - State management
   - Event handling

4. **Visual Testing**
   - Background color
   - Text contrast
   - Shadow effects
   - Rounded corners
   - Spacing consistency

5. **Responsive Testing**
   - Different screen sizes
   - Orientation changes
   - Device compatibility
   - Layout adaptation 