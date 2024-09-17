
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const screenCleaner = {
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


setTimeout(() => {
  LOOP.addItem(screenCleaner);
  LOOP.addItem(PuckFactory("./assets/Roxie.png", "roxie", 250, 0));
}, 1000)




