let timerId: number | null = null;
let lastTick: number = 0;
let isRunning: boolean = false;

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

self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data;

  switch (type) {
    case 'START':
      isRunning = true;
      lastTick = Date.now();
      timerId = self.requestAnimationFrame(preciseTimer);
      break;

    case 'STOP':
      isRunning = false;
      if (timerId !== null) {
        self.cancelAnimationFrame(timerId);
        timerId = null;
      }
      break;
  }
}; 