
class GameLoop {
  constructor() {
    this.items = [];
    this.lastUpdateTime = 0;
    this.fps = 55;
    this._state = "Looping";
  }

  get state() {
    return this._state;
  }

  addItem(item) {
    if (typeof item !== 'object' || item === null) {
      console.error('Invalid item: Must be an object');
      return;
    }

    if (typeof item.id !== 'string') {
      console.error('item.id must be a string');
      return;
    }

    const requiredMethods = ['handleInput', 'update', 'render', 'isFinished'];
    for (const method of requiredMethods) {
      if (typeof item[method] !== 'function') {
        console.error(`Invalid item: Missing method ${method}`);
        return;
      }
    }

    if (this.getItem(item.id)) {
      console.error(`Item with ID ${item.id} already exists`);
      return;
    }

    this.items.push(item);
    if (this.items.length === 1) {
      this.lastUpdateTime = performance.now();
      this.loop();
    }
  }

  getItem(id) {
    return this.items.find(i => i.id === id);
  }

  removeItem(id) {
    const item = this.getItem(id);
    this.items = this.items.filter(v => v.id !== id);
    return item;
  }

  pause() {
    this._state = "Paused";
  }

  unpause() {
    this._state = "Looping";
    this.lastUpdateTime = Date.now();
    this.loop();
  }

  loop() {
    const now = Date.now();
    const elapsedTime = now - this.lastUpdateTime;
    this.lastUpdateTime = now;

    this.input();
    this.update(elapsedTime);
    this.render();

    if (this.state !== "Looping" || this.items.length === 0) return;

    let waitTime = (1000 / Math.max(this.fps, 0.000001)) - elapsedTime;
    if (waitTime < 0) {
      waitTime = 0;
    }
    setTimeout(() => this.loop(), waitTime);
  }

  input() {
    this.items.forEach(i => i.handleInput());
  }

  update(elapsedMilliseconds) {
    this.items.forEach(i => i.update(elapsedMilliseconds));
    this.items = this.items.filter(item => !item.isFinished());
  }

  render() {
    this.items.forEach(i => i.render());
  }
}

const LOOP = new GameLoop();