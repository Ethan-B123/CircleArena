import Vector from "./vector";

class CollisionCircle {
  constructor({ position, size, velocity, mass, color }) {
    this.position = position;
    this.size = size;
    this.velocity = velocity;
    this.mass = mass;
    this.color = color;
    this.outerColor = "#fff";
    this.dampening = 0.9;
  }

  onHit(otherCircle) {
    // console.log(otherCircle);
    // debugger;
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.checkOutOfBounds();
    this.velocity.x *= this.dampening;
    this.velocity.y *= this.dampening;
  }

  checkOutOfBounds() {
    if (this.position.x - this.size < 0) {
      this.position.x = this.size + 0.5;
      this.velocity = new Vector(this.velocity).flipOver("y")
    }
    if (this.position.x + this.size > 800) {
      this.position.x = 800 - (this.size + 0.5);
      this.velocity = new Vector(this.velocity).flipOver("y")
    }
    if (this.position.y - this.size < 0) {
      this.position.y = this.size + 0.5;
      this.velocity = new Vector(this.velocity).flipOver("x")
    }
    if (this.position.y + this.size > 600) {
      this.position.y = 600 - (this.size + 0.5);
      this.velocity = new Vector(this.velocity).flipOver("x")
    }
  }

  render(ctx) {
    const pos = this.position;
    const size = this.size;
    const prevFillStyle = ctx.fillStyle;

    const gradient =
      ctx.createRadialGradient(pos.x, pos.y, this.size * 0.5, pos.x, pos.y, size);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, this.outerColor);

    ctx.fillStyle = gradient;
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
    ctx.fill();
    // ctx.strokeStyle = "#555"
    ctx.stroke();
    ctx.fillStyle = prevFillStyle;
  }
}

export default CollisionCircle;
