import CheckBounce from "./check_bounce.js";
import Enemy from "./enemy";
import Puck from "./puck";
import Vector from "./vector";

class Game {
  constructor({ ctx, player, scoreDom }) {
    this.ctx = ctx;
    this.player = player;
    this.scoreDom = scoreDom;
    this.score = 0;
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
    if (this.enemies.length === 0) {
      this.createEnemy();
    }
    this.score += 1;
    this.scoreDom.innerText = this.score;
  }

  createEnemy() {
    const possiblePositions = [
      new Vector({x: 100, y: 100}),
      new Vector({x: 700, y: 100}),
      new Vector({x: 100, y: 500}),
      new Vector({x: 700, y: 500})
    ]
    let furthestPosition;
    const player = this.player;
    possiblePositions.forEach((possiblePosition) => {
      if (furthestPosition === undefined) {
        furthestPosition = possiblePosition
        return;
      }
      if (possiblePosition.distanceTo(player.position) >
        furthestPosition.distanceTo(player.position) ) {
        furthestPosition = possiblePosition;
      }
    });
    this.enemies.push(new Enemy({
      position: furthestPosition,
      player,
      die: this.killEnemy.bind(this)
    }));
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
