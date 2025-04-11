let intervalId: ReturnType<typeof setInterval> | null = null;
let targetTime: number | null = null;
let isRunning = false;

self.onmessage = (e: MessageEvent) => {
  const { type } = e.data;

  switch (type) {
    case 'START':
      if (!isRunning) {
        isRunning = true;
        targetTime = Date.now() + 1000; // Next tick should be 1 second from now
        startTimer();
      }
      break;

    case 'STOP':
      isRunning = false;
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
      break;
  }
};

function startTimer() {
  // Clear any existing interval
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
  
  // Use setInterval with a short interval for more precise timing
  intervalId = setInterval(() => {
    if (!isRunning || targetTime === null) return;
    
    const now = Date.now();
    
    if (now >= targetTime) {
      // Send tick and set the next target time
      self.postMessage({ type: 'TICK' });
      
      // Calculate the next target time based on the current one
      // This approach prevents timing drift by anchoring to the original sequence
      targetTime += 1000;
    }
  }, 100); // Check every 100ms for better precision
} 