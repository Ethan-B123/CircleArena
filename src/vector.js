class Vector {
  constructor({x, y}) {
    this.x = x;
    this.y = y;
  }

  rotate(rad) {
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const newX = Math.round( 10000 *(this.x * cos - this.y * sin))/10000
    this.y = Math.round( 10000 *(this.x * sin + this.y * cos))/10000
    this.x = newX;
    return this;
  }

  length() {
    return (
      Math.sqrt(
        Math.pow(this.x, 2) +
        Math.pow(this.y, 2)
      )
    );
  }

  flipOver(axis) {
    switch (axis) {
      case "y":
      this.x = this.x * -1;
        break;
      case "x":
      this.y = this.y * -1;
        break;
      default:
      console.log("vector flip over given wrong element");
    }
    return this;
  }

  distanceTo(otherVec) {
    return Math.sqrt(
      Math.pow(this.x - otherVec.x, 2) +
      Math.pow(this.y - otherVec.y, 2)
    );
  }

  static fromAngleSpeed(ang, speed) {
    return new Vector({
      x: Math.cos(ang) * speed,
      y: Math.sin(ang) * speed
    });
  }

  static angleBetween(v1, v2) {
    return Math.atan2(v2.y - v1.y, v2.x - v1.x);
  }
}
// window.Vector = Vector;

export default Vector;
