let timerId: number | null = null;
let intervalId: number | null = null;
let lastTick: number = 0;
let isRunning: boolean = false;
let startTime: number = 0;
let elapsedTime: number = 0;

function preciseTimer() {
  if (!isRunning) return;
  
  const now = Date.now();
  const elapsed = now - lastTick;
  
  if (elapsed >= 1000) {
    self.postMessage({ type: 'TICK' });
    lastTick = now - (elapsed % 1000); // Adjust for drift
  }
  
  timerId = self.requestAnimationFrame(preciseTimer);
}

// Start an interval for background reliability
function startBackgroundTimer() {
  if (intervalId !== null) return;
  
  startTime = Date.now() - elapsedTime;
  
  intervalId = self.setInterval(() => {
    if (!isRunning) return;
    
    const now = Date.now();
    const currentElapsed = now - startTime;
    const secondsElapsed = Math.floor(currentElapsed / 1000);
    const previousSeconds = Math.floor(elapsedTime / 1000);
    
    if (secondsElapsed > previousSeconds) {
      self.postMessage({ type: 'TICK' });
    }
    
    elapsedTime = currentElapsed;
  }, 100); // Check frequently to ensure we don't miss seconds
}

self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data;

  switch (type) {
    case 'START':
      isRunning = true;
      lastTick = Date.now();
      startTime = Date.now();
      elapsedTime = 0;
      
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