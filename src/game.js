import CheckBounce from "./check_bounce.js";
import Enemy from "./enemy";
import Puck from "./puck";

class Game {
  constructor({ ctx, player }) {
    this.ctx = ctx;
    this.player = player;
    this.enemies = [];
    this.pucks = [];
  }

  killEnemy(enemy) {
    const enemies = this.enemies;
    const idx = enemies.findIndex((checkEnemy) => (
      enemy === checkEnemy
    ));
    if (idx > -1) {
      enemies.splice(idx, 1)
    } else {
      debugger;
    }
  }

  createPucks(puckPositions) {
    puckPositions.forEach(
      (position) => this.pucks.push(new Puck({ position }))
    );
  }

  createEnemies(enemyPositions) {
    enemyPositions.forEach(
      (position) => this.enemies.push(new Enemy(
        { position, player: this.player, die: this.killEnemy.bind(this) }
      ))
    );
  }

  update() {
    const allCircles = this.enemies.concat(
      this.pucks.concat([this.player])
    );
    // debugger;
    allCircles.forEach((circle) => circle.update());
    CheckBounce(allCircles);
  }

  render(ctx) {
    const allCircles = this.enemies.concat(
      this.pucks.concat([this.player])
    );
    allCircles.forEach((circle) => circle.render(ctx));
  }

}

export default Game;
