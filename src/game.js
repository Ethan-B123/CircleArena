import CheckBounce from "./check_bounce.js";
import Enemy from "./enemy";
import Puck from "./puck";
import Player from "./player";
import Vector from "./vector";
import findOpenSpot from "./openSpots"

class Game {
  constructor({ ctx, scoresDom, menuModalDom }) {
    this.ctx = ctx;
    this.scoresDom = scoresDom;
    this.menuModalDom = menuModalDom;
    this.score = 0;
    this.enemies = [];
    this.pucks = [];
    this.player;
    this.drawLoop;
  }

  startGame() {
    this.destroyObjects();
    this.endGame();
    this.score = 0;
    const puckPositions = [
      {x: 100, y: 300},
      {x: 400, y: 100},
      {x: 700, y: 300},
      {x: 400, y: 500}
    ];
    this.createPlayer();
    this.createEnemy();
    this.createPucks(puckPositions);
    this.drawLoop = setInterval(() => {
      this.ctx.clearRect(0, 0, 800, 600);
      this.update();
      this.render(this.ctx);
    }, 16);
    this.closeModal();
  }

  endGame() {
    if (this.drawLoop) {
      this.render();
      clearInterval(this.drawLoop);
      this.drawLoop = undefined;
      this.openModal();
    }
  }

  destroyObjects() {
    this.pucks = [];
    this.enemies = [];
  }

  closeModal() {
    this.menuModalDom.classList.add("clear");
    setTimeout(() => {
      this.menuModalDom.classList.add("hidden");
    }, 200)
  }

  openModal() {
    this.menuModalDom.classList.remove("hidden");
    setTimeout(() => {
      this.menuModalDom.classList.remove("clear");
    }, 300)
  }

  createPlayer() {
    if (this.player) {
      window.removeEventListener("keydown", this.player.handleKeydown);
      window.removeEventListener("keyup", this.player.handleKeyup);
    }
    this.player = new Player({
      die: this.endGame.bind(this)
    });
    window.addEventListener("keydown", this.player.handleKeydown);
    window.addEventListener("keyup", this.player.handleKeyup);
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
    this.addScore();
  }

  addScore() {
    this.score += 1;
    this.scoresDom.innerText = this.score;
    Array.from(this.scoresDom).forEach((score) =>
      score.innerText = this.score
    );
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
    const player = this.player;
    const enemies = this.enemies;
    const pucks = this.pucks;
    puckPositions.forEach(
      (position) => this.pucks.push(new Puck({
        position,
        // findOpenSpot: findOpenSpot({ player, enemies, pucks })
      }))
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

  render() {
    const ctx = this.ctx;
    const allCircles = this.enemies.concat(
      this.pucks.concat([this.player])
    );
    allCircles.forEach((circle) => circle.render(ctx));
  }

}

export default Game;
