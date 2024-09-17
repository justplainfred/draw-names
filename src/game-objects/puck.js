const GRAVITY = 9.81;
const PUCK_TIME_STEP = 0.07;
const PUCK_RADIUS = 20;

class Puck {
  constructor (imgSrc, id, centerX, centerY) {
    this._image = new Image();
    this._image.src = imgSrc;
    this.id = id;
    this.centerX = centerX;
    this.centerY = centerY;
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.velocity_x = 0.0;
    this.velocity_y = 0.0;
    this.collisions = [];
  }

  handleInput() { }

  update(elapsedMillis) {
    if (elapsedMillis > 1000000) return;
    if (this._hasLanded()) return;
    this.collisions = [];

    // Update the position
    this.centerX += this.velocity_x * PUCK_TIME_STEP
    this.centerY += this.velocity_y * PUCK_TIME_STEP

    // Update the velocity due to GRAVITY
    this.velocity_y += GRAVITY * PUCK_TIME_STEP
    
    for (const [x, y, radius] of Pegs) {
      if (this._checkCollision(x, y, radius)) {
        this._handleCollision(x, y)
      }
    }
    
    if (this.centerX < PUCK_RADIUS  || this.centerX > boardWidth - PUCK_RADIUS) {
      this.velocity_x *= -1;
    }
  }

  _hasLanded () {
    return this.canvas.height - PUCK_RADIUS <= this.centerY 
  }

  _checkCollision(pegX, pegY, pegR) {
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
    
    this._drawPegs();
  }

  _drawPegs() {
    for (const [x, y, radius] of Pegs) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.stroke();
    }
  }

  isFinished() {

  }
}

var PuckFactory = function (imgSrc, id, centerX, centerY) {
  return new Puck(imgSrc, id, centerX, centerY);
}