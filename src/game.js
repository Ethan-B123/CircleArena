import CheckBounce from "./check_bounce.js";
import Enemy from "./enemy";
import Puck from "./puck";
import Player from "./player";
import Vector from "./vector";
import findOpenSpot from "./openSpots";
import Animator from "./animator";
import DangerBar from "./danger_bar";
import { explosion, test } from "./animations";

class Game {
  constructor({ ctx, scoresDom, menuModalDom }) {
    this.ctx = ctx;
    this.scoresDom = scoresDom;
    this.menuModalDom = menuModalDom;
    this.score = 0;
    this.dangerBars = [];
    this.enemies = [];
    this.pucks = [];
    this.player;
    this.drawLoop;
    this.animator = new Animator();
  }

  startGame() {
    this.score = -1;
    this.addScore();
    this.destroyObjects();
    if (this.drawLoop) {
      clearInterval(this.drawLoop);
    }
    this.score = 0;
    const puckPositions = [
      {x: 100, y: 300},
      {x: 50, y: 300},

      {x: 400, y: 100},
      // {x: 400, y: 50},

      {x: 700, y: 300},
      {x: 750, y: 300},

      {x: 400, y: 500},
      // {x: 400, y: 550}
    ];
    this.createPlayer();
    this.createEnemy();
    this.createPucks(puckPositions);
    // this.createBars();
    this.drawLoop = setInterval(() => {
      this.ctx.clearRect(0, 0, 800, 600);
      this.update();
      this.render(this.ctx);
    }, 16);
    // this.animator.add(explosion({position: {x: 100, y: 300}}))
    this.closeModal();
  }

  createBars() {
    this.dangerBars = [];
    const positions = [
      {x: 400, y: 50},
      {x: 400, y: 550}
    ]
    const size = { x: 30, y: 30 };

    this.dangerBars.push(
      new DangerBar({
        position: { x: 400, y: 100 },
        size: { x: 30, y: 30 },
        pathPoints: [
          {x: 200, y: 100},
          {x: 600, y: 100}
        ], pathTicks: 120 })
    );
    this.dangerBars.push(
      new DangerBar({
        position: { x: 400, y: 500 },
        size: { x: 30, y: 30 },
        pathPoints: [
          {x: 600, y: 500},
          {x: 200, y: 500}
        ], pathTicks: 120 })
    );
    this.dangerBars.push(
      new DangerBar({
        position: { x: 200, y: 500 },
        size: { x: 30, y: 30 },
        pathPoints: [
          {x: 200, y: 500},
          {x: 200, y: 100}
        ], pathTicks: 120 })
    );
    this.dangerBars.push(
      new DangerBar({
        position: { x: 600, y: 100 },
        size: { x: 30, y: 30 },
        pathPoints: [
          {x: 600, y: 100},
          {x: 600, y: 500}
        ], pathTicks: 120 })
    );

  }

  endGame() {
    if (this.drawLoop) {
      clearInterval(this.drawLoop);
      this.drawLoop = setInterval(() => {
        this.ctx.clearRect(0, 0, 800, 600);
        this.gameOverRender(this.ctx);
      }, 16);
      this.animator.add(explosion({
        position: {
          x: this.player.position.x,
          y: this.player.position.y
        }
      }));
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
      document.getElementById('new-game-btn').focus();
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
    const dyingEnemy = enemies[idx];
    if (idx > -1) {
      enemies.splice(idx, 1)
    } else {
      debugger;
    }
    this.animator.add(explosion({
      position: {
        x: dyingEnemy.position.x,
        y: dyingEnemy.position.y
      }
    }))
    if (this.enemies.length === 0) {
      setTimeout(() => {
        this.createEnemy();
      }, 1500);
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
    const speed = 0.3 + 0.05 * this.score;
    this.enemies.push(new Enemy({
      position: furthestPosition,
      speed,
      player,
      die: this.killEnemy.bind(this)
    }));
    //
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
    this.dangerBars.forEach((bar) => bar.update());
    allCircles.forEach((circle) => circle.update());
    allCircles.forEach((circle) => {
      this.dangerBars.forEach((bar) => bar.checkHits(circle));
    });
    CheckBounce(allCircles);
  }

  render() {
    const ctx = this.ctx;
    const allCircles = this.enemies.concat(
      this.pucks.concat([this.player])
    );
    this.dangerBars.forEach((bar) => bar.render(ctx));
    allCircles.forEach((circle) => circle.render(ctx));
    this.animator.render(this.ctx);
  }

  gameOverRender() {
    const ctx = this.ctx;
    const allCircles = this.enemies.concat(this.pucks);
    this.dangerBars.forEach((bar) => bar.render(ctx));
    allCircles.forEach((circle) => circle.render(ctx));
    this.animator.render(this.ctx);
  }

}

export default Game;
