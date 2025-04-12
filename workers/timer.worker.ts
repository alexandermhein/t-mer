let timerId: number | null = null;
let intervalId: number | null = null;
let lastTick: number = 0;
let isRunning: boolean = false;
let startTime: number = 0;
let elapsedTime: number = 0;
let tickCount: number = 0;

function preciseTimer() {
  if (!isRunning) return;
  
  const now = Date.now();
  const targetElapsed = tickCount * 1000;
  const actualElapsed = now - startTime;
  const drift = actualElapsed - targetElapsed;
  
  // If we've reached or passed the time for the next tick (accounting for drift)
  if (actualElapsed >= tickCount * 1000) {
    self.postMessage({ type: 'TICK' });
    tickCount++;
  }
  
  // Calculate optimal delay to minimize drift
  const nextTickTime = startTime + (tickCount * 1000);
  const timeUntilNextTick = nextTickTime - now;
  
  // Use requestAnimationFrame for the next frame
  timerId = self.requestAnimationFrame(preciseTimer);
}

// Start an interval for background reliability
function startBackgroundTimer() {
  if (intervalId !== null) return;
  
  // Reset tick counter when starting timer
  tickCount = 0;
  startTime = Date.now();
  elapsedTime = 0;
  
  // Backup interval that checks more frequently than once per second
  intervalId = self.setInterval(() => {
    if (!isRunning) return;
    
    const now = Date.now();
    const targetElapsed = tickCount * 1000;
    const actualElapsed = now - startTime;
    
    // If we've reached the time for the next tick and haven't ticked yet
    if (actualElapsed >= targetElapsed) {
      self.postMessage({ type: 'TICK' });
      tickCount++;
    }
  }, 100); // Check frequently to ensure we don't miss seconds
}

self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data;

  switch (type) {
    case 'START':
      isRunning = true;
      startTime = Date.now();
      elapsedTime = 0;
      tickCount = 0;
      
      // Use both timers for maximum reliability
      timerId = self.requestAnimationFrame(preciseTimer);
      startBackgroundTimer();
      break;

    case 'STOP':
      isRunning = false;
      if (timerId !== null) {
        self.cancelAnimationFrame(timerId);
        timerId = null;
      }
      if (intervalId !== null) {
        self.clearInterval(intervalId);
        intervalId = null;
      }
      break;
  }
}; 