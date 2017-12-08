import Vector

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
    debugger;
    if (delta.x < (this.size.x / 2) + circle.size) {
      circle.onHit(this);
    } else if (delta.y < (this.size.y / 2) + circle.size) {
      circle.onHit(this);
    }
  }

  render(ctx) {
    const cornerPosX = this.position.x - (this.size.x / 2);
    const cornerPosY = this.position.y - (this.size.y / 2);
    ctx.rect(cornerPosX, cornerPosY, this.size.x, this.size.y);
    ctx.fill();
    ctx.stroke;
  }

  findNextPos() {
  }

  update() {
    const currentPoint = this.currentPoint;
    const currentTicks = this.currentTicks;
    const direction = this.direction;
    const delta = {
      x: circle.position.x - this.position.x,
      y: circle.position.y - this.position.y
    }
  }
}

export default DangerBar;
