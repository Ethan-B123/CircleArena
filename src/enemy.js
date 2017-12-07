import CollisionCircle from "./collision_circle";
import Vector from "./vector";

class Enemy extends CollisionCircle {
  constructor({ position, player, die }) {
    super({
      position: position,
      size: 30,
      velocity: {x: 0, y: 0},
      mass: 10,
      color: "#ff4444",
      outerColor: "#FF9292"
    });
    this.seek = {
      x: 0,
      y: 0
    }
    this.die = die;
    this.player = player;
    this.gradientScale = 0;
  }

  hurtByPuck() {
    this.die(this)
  }

  update() {
    const angle =
      Vector.angleBetween(this.position, this.player.position);
    this.seek = Vector.fromAngleSpeed(angle, 0.6);
    this.velocity.x += this.seek.x;
    this.velocity.y += this.seek.y;
    super.update();
  }
}

export default Enemy;
