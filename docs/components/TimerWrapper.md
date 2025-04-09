# TimerWrapper Component

## Overview
The TimerWrapper component serves as the entry point for the timer application, handling URL parameter parsing and initial timer configuration. It acts as a bridge between the URL parameters and the core Timer component.

## Technical Details
- **Location**: `components/timer-wrapper.tsx`
- **Type**: Client Component (uses "use client" directive)
- **Dependencies**: 
  - Next.js navigation hooks
  - Timer component

## Component Structure

### Props
None - This is a self-contained component that derives its configuration from URL parameters.

### State Management
- No internal state management
- Uses URL search parameters for configuration

## Business Logic

### URL Parameter Handling
1. **Duration Parameter**
   - Expected format: `?duration=Xmin` (e.g., `?duration=5min`)
   - Supports decimal values (e.g., `?duration=2.5min`)
   - Maximum duration: 30 minutes
   - Default duration: 5 minutes (300 seconds)

2. **Parameter Validation**
   ```typescript
   const getDurationFromParams = () => {
     const durationParam = searchParams.get("duration")
     if (durationParam) {
       const match = durationParam.match(/(\d+(?:\.\d+)?)min/)
       if (match && match[1]) {
         const minutes = parseFloat(match[1])
         if (!isNaN(minutes) && minutes > 0) {
           return Math.min(minutes, 30) * 60
         }
       }
     }
     return 300 // Default 5 minutes
   }
   ```

3. **Auto-start Detection**
   - Timer auto-starts if duration parameter is present
   - Controlled by `shouldAutoStart` boolean

## Usage Examples

### Basic Usage
```tsx
// Default 5-minute timer
<TimerWrapper />

// 10-minute timer with auto-start
<TimerWrapper /> // URL: ?duration=10min

// 2.5-minute timer with auto-start
<TimerWrapper /> // URL: ?duration=2.5min
```

### URL Examples
- `http://localhost:3000/?duration=5min` - 5-minute timer
- `http://localhost:3000/?duration=15min` - 15-minute timer
- `http://localhost:3000/?duration=30min` - 30-minute timer (maximum)
- `http://localhost:3000/?duration=2.5min` - 2.5-minute timer
- `http://localhost:3000/` - Default 5-minute timer

## Error Handling
- Invalid duration parameters default to 5 minutes
- Non-numeric values are handled gracefully
- Values exceeding 30 minutes are capped at 30 minutes

## Integration
- Integrates with Next.js routing system
- Passes configuration to Timer component
- Supports direct URL-based timer configuration

## Best Practices
1. Always validate URL parameters before use
2. Provide sensible defaults for missing parameters
3. Implement proper type checking
4. Use client-side rendering for dynamic parameter handling

## Performance Considerations
- Lightweight component with minimal processing
- No unnecessary re-renders
- Efficient parameter parsing

## Accessibility
- No direct accessibility concerns as this is a wrapper component
- Accessibility is handled by child components

## Testing Considerations
- Test URL parameter parsing
- Test duration limits
- Test auto-start functionality
- Test default values
- Test invalid input handling 