
function GetPossiblePadsForCousin (giver) {
  const hopefuls = GetCousinsNotYetReceiving().filter(c => c.family !== giver.family);
  const padSize = boardWidth / hopefuls.length;

  return {
    hopefuls,
    padSize
  }
}

let lp_padSize = null
let lp_hopefuls = null
let lp_winner = undefined


const LandingPad =  {
  id: "landing-pad",
  handleInput: () => { },
  update: () => { },
  render: () => {
    if (!lp_padSize || !lp_hopefuls) return;

    let color = "red";
    for(let i = 0; i < lp_hopefuls.length; ++i) {
      if (lp_winner && lp_winner.name === lp_hopefuls[i].name) {
        ctx.fillStyle = "gold";  
      } else {
        ctx.fillStyle = color;  
      }
      ctx.fillRect(i * lp_padSize, canvas.height - PUCK_SIZE_BUFFER, (i + 1) * lp_padSize, canvas.height);
      
      const image = new Image();
      image.src = lp_hopefuls[i].src;
      ctx.save();
      ctx.beginPath();
      ctx.arc(i * lp_padSize + (lp_padSize / 2), canvas.height - PUCK_RADIUS, PUCK_RADIUS, 0, Math.PI * 2, false);
      ctx.clip();
      ctx.drawImage(image, i * lp_padSize + (lp_padSize / 2) - PUCK_RADIUS, canvas.height - PUCK_RADIUS - PUCK_RADIUS, PUCK_RADIUS * 2, PUCK_RADIUS * 2);
      
      ctx.restore();
      
      color = (color === "red") ? "green" : "red";
    }
    
    
  },
  isFinished: () => { },
  updatePadFor: (newGiver) => {
    lp_winner = undefined;
    let newPads = GetPossiblePadsForCousin(newGiver);
    lp_padSize = newPads.padSize;
    lp_hopefuls = newPads.hopefuls;
  },
  setWinner(x) {
    const i = Math.floor(x / lp_padSize)
    lp_winner = lp_hopefuls[i];
    return lp_hopefuls[i]
  },
}
