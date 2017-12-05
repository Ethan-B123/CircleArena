import CollisionCircle from "./collision_circle";
import Player from "./player";
import Enemy from "./enemy";
import Vector from "./vector";

/**
 * code from https://gist.github.com/rosszurowski/67f04465c424a9bc0dae
 *
 * A linear interpolator for hexadecimal colors
 * @param {String} a
 * @param {String} b
 * @param {Number} amount
 * @example
 * // returns #7F7F7F
 * lerpColor('#000000', '#ffffff', 0.5)
 * @returns {String}
 */
function lerpColor(a, b, amount) {

    var ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

class Puck extends CollisionCircle {
  constructor({ position }) {
    super({
      position: position,
      size: 20,
      velocity: {x: 0, y: 0},
      mass: 2,
      color: "#44ff44"
    });
    this.dampening = 0.99;
    this.controller = this;
    this.safe = true;
  }

  onHit(otherCircle) {
    if (!this.safe && this.iWillHurt(otherCircle)) {
      otherCircle.hurtByPuck();
      return;
    }
    if (otherCircle instanceof Player || otherCircle instanceof Enemy) {
      this.controller = otherCircle;
      this.color = otherCircle.color;
      this.safe = false;
    }
  }

  iWillHurt(otherCircle) {
    if (this.controller instanceof Player &&
      otherCircle instanceof Enemy) {
      return true;
    }

    if (this.controller instanceof Enemy &&
      otherCircle instanceof Player) {
      return true;
    }

    return false;
  }

  update() {
    super.update();
    const speed = new Vector(this.velocity).length();
    if (speed > 1 && speed < 2 && !this.safe) {
      this.color = lerpColor("#ffffff", this.controller.color, speed-1);
    } else if (speed <= 1) {
      this.safe = true;
      this.controller = this;
      this.color = "#44ff44"
    }
  }

}

export default Puck;