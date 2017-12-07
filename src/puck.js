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
  constructor({ position, findOpenSpot }) {
    super({
      position: position,
      size: 10,
      velocity: {x: 0, y: 0},
      mass: 2,
      color: "#44ff44"
    });
    this.dampening = 0.99;
    this.controller = this;
    // this.findOpenSpot = findOpenSpot;
    this.safe = true;

    this.controllerSwapped = false;
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
    if (otherCircle instanceof Puck && !this.controllerSwapped) {
      this.swapControllers(otherCircle)
      this.controllerSwapped = true;
      otherCircle.controllerSwapped = true;
    }
  }

  swapControllers(otherCircle) {
    const temp = this.controller;
    this.controller = otherCircle.controller;
    otherCircle.controller = temp;

    const safeTemp = this.safe;
    this.safe = otherCircle.safe;
    otherCircle.safe = safeTemp;
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

  resetPosition() {
    this.position = this.findOpenSpot();
    this.velocity = {x: 0, y: 0};
  }

  update() {
    super.update();
    const speed = new Vector(this.velocity).length();
    if (speed > 2) {
      this.color = this.controller.color;
    } else if (speed > 1 && speed < 2 && !this.safe) {
      this.color = lerpColor("#ffffff", this.controller.color, speed-1);
    } else if (speed <= 1 && speed > 0) {
      this.safe = true;
      this.controller = this;
      this.color = "#44ff44"
      // this.resetPosition();
    }
  }

  render(ctx) {
    this.controllerSwapped = false;
    super.render(ctx);
  }

}

export default Puck;
