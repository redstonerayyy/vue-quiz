class Timer {
  constructor(duration, steps, callback) {
    this.duration = duration;
    this.time = duration;
    this.steps = steps;
    this.callback = callback;
  }

  start() {
    this.interval = setInterval(() => {
      this.time -= this.steps;
      if (this.time <= 0) {
        clearInterval(this.duration);
        this.callback();
      }
    }, this.steps * 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  reset() {
    clearInterval(this.interval);
    this.time = this.duration;
  }
}

export default Timer;
