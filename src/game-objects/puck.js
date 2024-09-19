const GRAVITY = 9.81;
const PUCK_TIME_STEP = 0.05;
const PUCK_RADIUS = 20;

class Puck {
  constructor (imgSrc, id, centerX, centerY) {
    this._image = new Image();
    this._image.src = imgSrc;
    this._delete = false;
    this.id = id;
    this.centerX = centerX;
    this.centerY = centerY;
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.velocity_x = 25.0;
    this.velocity_y = 0.0;
    this.hasDropped = false;
  }

  handleInput() { }

  update(elapsedMillis) {
    if (this._hasLanded()) return;
    
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
        document.getElementById(`ow${Math.floor(Math.random() * 6) + 1}`).play();
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

  _hasLanded () {
    return this.canvas.height - PUCK_RADIUS <= this.centerY 
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

  isFinished() {
    return this._delete;
  }

  delete() {
    this._delete = true;
  }
}

var PuckFactory = function (imgSrc, id, centerX, centerY) {
  return new Puck(imgSrc, id, centerX, centerY);
}