class CollisionCircle {
  constructor({ position, size, velocity, mass, color }) {
    this.position = position;
    this.size = size;
    this.velocity = velocity;
    this.mass = mass;
    this.color = color;
    this.dampening = 0.9;
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x *= this.dampening;
    this.velocity.y *= this.dampening;
  }

  render(ctx) {
    const pos = this.position;
    const size = this.size;
    const prevFillStyle = ctx.fillStyle;
    ctx.fillStyle = this.color;
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = prevFillStyle;
  }
}

export default CollisionCircle;
