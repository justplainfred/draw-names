
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const ScreenCleanerGI = {
  id: "screen-cleaner",
  handleInput: () => { },
  update: () => { },
  render: () => {
    ctx.save();
    ctx.fillStyle = '#90E0EF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  },
  isFinished: () => { }
}

let GAME = {}


setTimeout(() => {
  GAME = {
    load: () => {
      LOOP.addItem(ScreenCleanerGI);
      LOOP.addItem(PegsGI)
      SetLeftColumn();
      SetRightColumn();  
    },
    startWith: (name) => {
      if (this.activePuck) {
        this.activePuck.delete();
      }
      this.activePuck = PuckFactory(name)
      LOOP.addItem(this.activePuck);
    },
    restart: () => {
      if (this.activePuck) {
        this.activePuck.restart();
      }
    },
    next: () => {
      if (!this.activePuck || !this.activePuck.hasLanded()) return;
      this.activePuck.save();
    },
    dropPuck: () => {
      if (!this.activePuck) return;
      this.activePuck.drop();
    }
  };

  GAME.load();
}, 1000)




