import CollisionCircle from "./collision_circle.js";
import Enemy from "./enemy";
import DangerBar from "./danger_bar";

class Player extends CollisionCircle {
  constructor({ die }) {
    super({
      position: { x:400, y:300 },
      size: 20,
      velocity: { x:0, y:0 },
      mass: 10,
      color: "#9999ee",
      outerColor: "#C3C3F9"
    });
    this.input = {
      up: false,
      left: false,
      down: false,
      right: false,
      brake: false
    }
    this.die = die;
    this.handleKeydown = this.handleInput("keydown");
    this.handleKeyup = this.handleInput("keyup");
    this.gradientScale = 0;
  }

  update() {
    this.moveFromInput();
    super.update();
  }

  hurtByPuck() {
    this.die();
  }

  onHit(otherCircle) {
    if (otherCircle instanceof Enemy) {
      this.die();
    }
    if (otherCircle instanceof DangerBar) {
      this.die();
    }
  }

  moveFromInput() {
    if (this.input.up) {
      // this.velocity.y = -8;
      this.velocity.y -= 1.4;
    }
    if (this.input.left) {
      // this.velocity.x = -8;
      this.velocity.x -= 1.4;
    }
    if (this.input.down) {
      // this.velocity.y = 8;
      this.velocity.y += 1.4;
    }
    if (this.input.right) {
      // this.velocity.x = 8;
      this.velocity.x += 1.4;
    }
    if (! (
      this.input.up ||
      this.input.left ||
      this.input.down ||
      this.input.right
    )) {
      this.velocity.x *= 0.7;
      // this.velocity.y = 0;
      this.velocity.y *= 0.7;
      // this.velocity.x = 0;
    }
    // if (this.input.brake) {
    //   this.velocity.x *= 0.7;
    //   this.velocity.y *= 0.7;
    // }
  }

  handleInput(keyDirection) {
    let newVal;
    if (keyDirection === "keydown") {
      newVal = true;
    } else if (keyDirection === "keyup") {
      newVal = false;
    }
    return (e) => {
      switch (e.key) {
        case "ArrowUp":
        this.input.up = newVal;
        break;
        case "ArrowLeft":
        this.input.left = newVal;
        break;
        case "ArrowDown":
        this.input.down = newVal;
        break;
        case "ArrowRight":
        this.input.right = newVal;
        break;
        case " ":
        this.input.brake = newVal;
        break;
        case "Enter":

        break;
        case "Escape":

        break;
        default:
        // console.log(e.key);
      }
    };
  }
}

export default Player;
