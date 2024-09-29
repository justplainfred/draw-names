const GRAVITY = 9.81;
const PUCK_TIME_STEP = 0.05;
const PUCK_RADIUS = 20;

const wins = [
  new Audio('./assets/win.mp3'),
  new Audio('./assets/win.mp3'),
  new Audio('./assets/win.mp3'),
  new Audio('./assets/win.mp3'),
]
let winIndex = 0;

const bells = [
  new Audio('./assets/bell2.mp3'),
  new Audio('./assets/bell3.mp3'),
  new Audio('./assets/bell4.mp3'),
  new Audio('./assets/bell2.mp3'),
  new Audio('./assets/bell3.mp3'),
  new Audio('./assets/bell4.mp3'),
]
let bellsIndex = 0;

class Puck {
  constructor (name) {
    this.cousin = GetCousin(name);
    this._image = new Image();
    this._image.src = this.cousin.src;
    this._delete = false;
    this.id = this.cousin.name;
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.centerX = this.canvas.width / 2;
    this.centerY = PEG_RADIUS;
    this.velocity_x = 25.0;
    this.velocity_y = 0.0;
    this.hasDropped = false;
  }

  handleInput() { }

  update(elapsedMillis) {
    if (this.hasLanded()) return;
    
    // Update the position
    this.centerX += this.velocity_x * PUCK_TIME_STEP
    this.centerY += this.velocity_y * PUCK_TIME_STEP
    
    if (this.hasDropped) {
      // Update the velocity due to GRAVITY
      this.velocity_y += GRAVITY * PUCK_TIME_STEP
    }
    
    // Check For peg collisions
    for (let i = 0; i < Pegs.length; ++i) {
      const [x, y, radius] = Pegs[i]
      if (this._didCollide(x, y, radius)) {
        Pegs[i][3] = 10;
        this._handleCollision(x, y)
        const random = Math.floor(Math.random() * 3) + 2;
        bells[bellsIndex].play();
        bellsIndex = (bellsIndex + 1) % bells.length;
      }
    }

    // check for wall collisions
    if (this.centerX < PUCK_RADIUS  || this.centerX > boardWidth - PUCK_RADIUS) {
      this.velocity_x *= -1;
    }
  }

  drop () {
    this.hasDropped = true;
  }

  hasLanded () {
    if (!this._hasLanded && this.canvas.height - PUCK_RADIUS <= this.centerY) {
      this._hasLanded = true;
      LandingPad.setWinner(this.centerX);
      openModel(this.cousin.name, lp_winner.name);
      wins[winIndex].play();
      winIndex = (winIndex + 1) % wins.length;
    }
    return this._hasLanded;
  }

  _didCollide(pegX, pegY, pegR) {
    let distance = Math.sqrt(((this.centerX - pegX) * (this.centerX - pegX) + (this.centerY - pegY) * (this.centerY - pegY)))
    return distance < pegR + PUCK_RADIUS;
  }

  _handleCollision(pegX, pegY) {
    // Calculate normal vector at the collision point
    let normalX = this.centerX - pegX;
    let normalY = this.centerY - pegY;
    let magnitude = Math.sqrt(normalX * normalX + normalY * normalY);
    
    // Normalize the normal vector
    normalX /= magnitude;
    normalY /= magnitude;

    // Reflect the velocity vector
    let dotProduct = this.velocity_x * normalX + this.velocity_y * normalY;
    this.velocity_x -= 2 * dotProduct * normalX;
    this.velocity_y -= 2 * dotProduct * normalY;
  }

  render() {
    this.ctx.save();
  
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, PUCK_RADIUS, 0, Math.PI * 2, false);
    this.ctx.clip();

    this.ctx.drawImage(this._image, this.centerX - PUCK_RADIUS, this.centerY - PUCK_RADIUS, PUCK_RADIUS * 2, PUCK_RADIUS * 2);

    this.ctx.restore();
  }

  save() {
    this.cousin.givesTo = lp_winner.name;
    SetLeftColumn();
    SetRightColumn();
    GAME.startWith(lp_winner.name);
    this.delete();
  }

  isFinished() {
    return this._delete;
  }

  delete() {
    this._delete = true;
  }


  restart() {
    this.centerX = this.canvas.width / 2;
    this.centerY = PEG_RADIUS;
    this.velocity_x = 25.0;
    this.velocity_y = 0.0;
    this.hasDropped = false;
    this._hasLanded = false;
  }
}

var PuckFactory = function (name) {
  return new Puck(name);
}