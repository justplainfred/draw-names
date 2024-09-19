
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
      let giver = GetGiver(name);
      this.activePuck = PuckFactory(giver.src, giver.name, 250, PEG_RADIUS)
      LOOP.addItem(this.activePuck);
    },
    restart: () => {
      if (this.activePuck) {
        this.activePuck.delete();
      }
      this.activePuck = PuckFactory("./assets/Roxie.png", `roxie-${Math.random()}`, 250, PEG_RADIUS)
      LOOP.addItem(this.activePuck);
    },
    dropPuck: () => {
      this.activePuck.drop();
    }
  };

  GAME.load();
}, 1000)




