

// position in center
class DangerBar {
  constructor({ position, size, pathPoints, pathTicks }) {
    this.position = position;
    this.size = size;
    this.pathPoints = pathPoints;
    this.pathTicks = pathTicks;
    this.corners = [
      { x: -size.x/2, y: -size.y/2 },
      { x: size.x/2, y: -size.y/2 },
      { x: size.x/2, y: size.y/2 },
      { x: -size.x/2, y: size.y/2 }
    ]
    this.currentPoint = 0;
    this.currentTicks = 0;
    this.direction = true;
  }

  checkHits(circle) {
    const delta = {
      x: circle.position.x - this.position.x,
      y: circle.position.y - this.position.y
    }
    if (Math.abs(delta.x) < (this.size.x / 2) + circle.size &&
        Math.abs(delta.y) < (this.size.y / 2) + circle.size) {
      circle.onHit(this);
    }
  }

  render(ctx) {
    const cornerPosX = this.position.x - (this.size.x / 2);
    const cornerPosY = this.position.y - (this.size.y / 2);
    ctx.beginPath();
    ctx.rect(cornerPosX, cornerPosY, this.size.x, this.size.y);
    const gradient = ctx.createLinearGradient(
      cornerPosX,
      cornerPosY,
      cornerPosX + this.size.x,
      cornerPosY + this.size.y);
    gradient.addColorStop(0, '#ff4444');
    gradient.addColorStop(1, '#FF9292');
    ctx.fillStyle = gradient;
    ctx.fillRect(cornerPosX, cornerPosY, this.size.x, this.size.y);
    ctx.stroke();
  }

  moveOnPath() {
    const percent = this.currentTicks / this.pathTicks;
    if (percent < 0 || percent > 1) {
      this.direction = !this.direction;
    }

    const difX = this.pathPoints[1].x - this.pathPoints[0].x;
    const difY = this.pathPoints[1].y - this.pathPoints[0].y;
    this.position.x = (difX * percent) + this.pathPoints[0].x;
    this.position.y = (difY * percent) + this.pathPoints[0].y;
    // debugger;

    if (this.direction) {
      this.currentTicks++;
    } else {
      this.currentTicks--;
    }
  }

  update() {
    this.moveOnPath();
  }
}

export default DangerBar;
