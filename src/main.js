
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
window.activePuck = null;

setTimeout(() => {
  GAME = {
    load: () => {
      LOOP.addItem(ScreenCleanerGI);
      LOOP.addItem(PegsGI)
      LOOP.addItem(LandingPad);
      SetLeftColumn();
      SetRightColumn();
      document.addEventListener('keydown', event => {
        if (!window.activePuck || event.code !== 'Space') return;
        window.activePuck.drop();
      });
    },
    startWith: (name) => {
      if (window.activePuck) {
        window.activePuck.delete();
      }
      window.activePuck = PuckFactory(name)
      LOOP.addItem(window.activePuck);
      LandingPad.updatePadFor(GetCousin(name));
      document.getElementById("big-title").textContent = `🎅 ${name} 🎅`;
    },
    restart: () => {
      if (window.activePuck) {
        window.activePuck.restart();
      }
    },
    save: () => {
      if (!window.activePuck || !this.activePuck.hasLanded()) return;
      window.activePuck.save();
      closeModel();
    },
    dropPuck: () => {
      if (!window.activePuck) return;
      window.activePuck.drop();
    }
  };

  GAME.load();
}, 1000)

function openModel(giver, receiver) {
  document.getElementById("giver").textContent = giver;
  document.getElementById("receiver").textContent = receiver;
  document.getElementById("myModal").style.display = "block";
}

function closeModel() {
  document.getElementById("myModal").style.display = "none";
}

function RandomResets() {
  for (var i = 0; i < 3; ++i) {
    let hasReset = false;
    let receivers = GetCousinsReceiving();
    while (!hasReset || receivers.length !== 0) {
      r = Math.floor((Math.random() * 100) % receivers.length);
      let receiver = receivers[r];
      if (receiver.family !== window.activePuck.cousin.family) {
        let givers = GetCousinsGiving();
        let giver = givers.find(g => g.givesTo === receiver.name)
        giver.givesTo = "";
        hasReset = true;
      }
    }
  }
  SetLeftColumn();
  SetRightColumn();
}

function RandomReset() {

}