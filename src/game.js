import CheckBounce from "./check_bounce.js";

class Game {
  constructor({ ctx, player, enemies }) {
    this.ctx = ctx;
    this.player = player;
    this.enemies = enemies;
  }

  update() {
    const allCircles = this.enemies.concat([this.player]);
    allCircles.forEach((circle) => circle.update());
    CheckBounce(allCircles);
  }

  render(ctx) {
    const allCircles = this.enemies.concat([this.player]);
    allCircles.forEach((circle) => circle.render(ctx));
  }

}

export default Game;
