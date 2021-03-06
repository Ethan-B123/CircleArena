/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Vector);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);


class CollisionCircle {
  constructor({ position, size, velocity,
    mass, color, outerColor, gradientScale }) {
    this.position = position;
    this.size = size;
    this.velocity = velocity;
    this.mass = mass;
    this.color = color;
    this.dampening = 0.9;
    this.outerColor = outerColor || "#fff";
    this.gradientScale = gradientScale || 0.5;
  }

  onHit(otherCircle) {
    // console.log(otherCircle);
    // debugger;
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.checkOutOfBounds();
    this.velocity.x *= this.dampening;
    this.velocity.y *= this.dampening;
  }

  checkOutOfBounds() {
    if (this.position.x - this.size < 0) {
      this.position.x = this.size + 0.5;
      this.velocity = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](this.velocity).flipOver("y")
    }
    if (this.position.x + this.size > 800) {
      this.position.x = 800 - (this.size + 0.5);
      this.velocity = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](this.velocity).flipOver("y")
    }
    if (this.position.y - this.size < 0) {
      this.position.y = this.size + 0.5;
      this.velocity = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](this.velocity).flipOver("x")
    }
    if (this.position.y + this.size > 600) {
      this.position.y = 600 - (this.size + 0.5);
      this.velocity = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](this.velocity).flipOver("x")
    }
  }

  render(ctx) {
    const pos = this.position;
    const size = this.size;
    const prevFillStyle = ctx.fillStyle;

    const gradient =
      ctx.createRadialGradient(pos.x, pos.y, this.size * this.gradientScale, pos.x, pos.y, size);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, this.outerColor);

    ctx.fillStyle = gradient;
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
    ctx.fill();
    // ctx.strokeStyle = "#555"
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = prevFillStyle;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (CollisionCircle);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collision_circle__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector__ = __webpack_require__(0);



class Enemy extends __WEBPACK_IMPORTED_MODULE_0__collision_circle__["a" /* default */] {
  constructor({ position, player, speed, die }) {
    super({
      position: position,
      size: 35,
      velocity: {x: 0, y: 0},
      mass: 10,
      color: "#ff4444",
      outerColor: "#FF9292"
    });
    this.seek = {
      x: 0,
      y: 0
    }
    this.speed = speed
    this.die = die;
    this.player = player;
    this.gradientScale = 0;
  }

  hurtByPuck() {
    this.die(this)
  }

  update() {
    const angle =
      __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* default */].angleBetween(this.position, this.player.position);
    this.seek = __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* default */].fromAngleSpeed(angle, this.speed);
    this.velocity.x += this.seek.x;
    this.velocity.y += this.seek.y;
    super.update();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Enemy);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collision_circle_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemy__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__danger_bar__ = __webpack_require__(4);




class Player extends __WEBPACK_IMPORTED_MODULE_0__collision_circle_js__["a" /* default */] {
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
    if (otherCircle instanceof __WEBPACK_IMPORTED_MODULE_1__enemy__["a" /* default */]) {
      this.die();
    }
    if (otherCircle instanceof __WEBPACK_IMPORTED_MODULE_2__danger_bar__["a" /* default */]) {
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

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


// position in center
class DangerBar {
  constructor({ position, size, pathPoints, pathTicks }) {
    this.position = position;
    this.size = size;
    this.pathPoints = pathPoints;
    this.pathTicks = pathTicks;
    this.corners = [
      { x: -size.x/2, y: -size.y/2 },
      { x: size.x/2, y: -size.y/2 },
      { x: size.x/2, y: size.y/2 },
      { x: -size.x/2, y: size.y/2 }
    ]
    this.currentPoint = 0;
    this.currentTicks = 0;
    this.direction = true;
  }

  checkHits(circle) {
    const delta = {
      x: circle.position.x - this.position.x,
      y: circle.position.y - this.position.y
    }
    if (Math.abs(delta.x) < (this.size.x / 2) + circle.size &&
        Math.abs(delta.y) < (this.size.y / 2) + circle.size) {
      circle.onHit(this);
    }
  }

  render(ctx) {
    const cornerPosX = this.position.x - (this.size.x / 2);
    const cornerPosY = this.position.y - (this.size.y / 2);
    ctx.beginPath();
    ctx.rect(cornerPosX, cornerPosY, this.size.x, this.size.y);
    const gradient = ctx.createLinearGradient(
      cornerPosX,
      cornerPosY,
      cornerPosX + this.size.x,
      cornerPosY + this.size.y);
    gradient.addColorStop(0, '#ff4444');
    gradient.addColorStop(1, '#FF9292');
    ctx.fillStyle = gradient;
    ctx.fillRect(cornerPosX, cornerPosY, this.size.x, this.size.y);
    ctx.stroke();
  }

  moveOnPath() {
    const percent = this.currentTicks / this.pathTicks;
    if (percent < 0 || percent > 1) {
      this.direction = !this.direction;
    }

    const difX = this.pathPoints[1].x - this.pathPoints[0].x;
    const difY = this.pathPoints[1].y - this.pathPoints[0].y;
    this.position.x = (difX * percent) + this.pathPoints[0].x;
    this.position.y = (difY * percent) + this.pathPoints[0].y;
    // debugger;

    if (this.direction) {
      this.currentTicks++;
    } else {
      this.currentTicks--;
    }
  }

  update() {
    this.moveOnPath();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DangerBar);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collision_circle__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enemy__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vector__ = __webpack_require__(0);





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

class Puck extends __WEBPACK_IMPORTED_MODULE_0__collision_circle__["a" /* default */] {
  constructor({ position, findOpenSpot }) {
    super({
      position: position,
      size: 15,
      velocity: {x: 0, y: 0},
      mass: 2,
      color: "#44ff44"
    });
    this.dampening = 0.99;
    this.controller = this;
    // this.findOpenSpot = findOpenSpot;
    this.safe = true;
    this.gradientScale = 0;
    this.controllerSwapped = false;
  }

  onHit(otherCircle) {
    if (!this.safe && this.iWillHurt(otherCircle)) {
      otherCircle.hurtByPuck();
      return;
    }
    if (otherCircle instanceof __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */] || otherCircle instanceof __WEBPACK_IMPORTED_MODULE_2__enemy__["a" /* default */]) {
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
    if (this.controller instanceof __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */] &&
      otherCircle instanceof __WEBPACK_IMPORTED_MODULE_2__enemy__["a" /* default */]) {
      return true;
    }

    if (this.controller instanceof __WEBPACK_IMPORTED_MODULE_2__enemy__["a" /* default */] &&
      otherCircle instanceof __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */]) {
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
    const speed = new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* default */](this.velocity).length();
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

/* harmony default export */ __webpack_exports__["a"] = (Puck);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collision_circle_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemy_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__puck_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game_js__ = __webpack_require__(7);








// const puckPositions = [
//   {x: 100, y: 100},
//   {x: 700, y: 100},
//   {x: 100, y: 500}
//   // {x: 700, y: 500}
// ]

const startGame = ({ ctx }) => {
  const scoresDom = document.getElementsByClassName('score');
  const newGameBtnsDom = document.getElementsByClassName('new-game-btn');
  const menuModalDom = document.getElementById('menu-modal');
  const game = new __WEBPACK_IMPORTED_MODULE_4__game_js__["a" /* default */]({ ctx, scoresDom, menuModalDom });
  window.menuModalDom = menuModalDom;
  Array.from(newGameBtnsDom).forEach((btn) =>
    btn.addEventListener("click", game.startGame.bind(game))
  );
  game.startGame();
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  startGame({ ctx });
});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__check_bounce_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemy__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__puck__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__player__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__openSpots__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__animator__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__danger_bar__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__animations__ = __webpack_require__(11);










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
    this.animator = new __WEBPACK_IMPORTED_MODULE_6__animator__["a" /* default */]();
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
      new __WEBPACK_IMPORTED_MODULE_7__danger_bar__["a" /* default */]({
        position: { x: 400, y: 100 },
        size: { x: 30, y: 30 },
        pathPoints: [
          {x: 200, y: 100},
          {x: 600, y: 100}
        ], pathTicks: 120 })
    );
    this.dangerBars.push(
      new __WEBPACK_IMPORTED_MODULE_7__danger_bar__["a" /* default */]({
        position: { x: 400, y: 500 },
        size: { x: 30, y: 30 },
        pathPoints: [
          {x: 600, y: 500},
          {x: 200, y: 500}
        ], pathTicks: 120 })
    );
    this.dangerBars.push(
      new __WEBPACK_IMPORTED_MODULE_7__danger_bar__["a" /* default */]({
        position: { x: 200, y: 500 },
        size: { x: 30, y: 30 },
        pathPoints: [
          {x: 200, y: 500},
          {x: 200, y: 100}
        ], pathTicks: 120 })
    );
    this.dangerBars.push(
      new __WEBPACK_IMPORTED_MODULE_7__danger_bar__["a" /* default */]({
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
      this.animator.add(Object(__WEBPACK_IMPORTED_MODULE_8__animations__["a" /* explosion */])({
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
    this.player = new __WEBPACK_IMPORTED_MODULE_3__player__["a" /* default */]({
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
    this.animator.add(Object(__WEBPACK_IMPORTED_MODULE_8__animations__["a" /* explosion */])({
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
      new __WEBPACK_IMPORTED_MODULE_4__vector__["a" /* default */]({x: 100, y: 100}),
      new __WEBPACK_IMPORTED_MODULE_4__vector__["a" /* default */]({x: 700, y: 100}),
      new __WEBPACK_IMPORTED_MODULE_4__vector__["a" /* default */]({x: 100, y: 500}),
      new __WEBPACK_IMPORTED_MODULE_4__vector__["a" /* default */]({x: 700, y: 500})
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
    this.enemies.push(new __WEBPACK_IMPORTED_MODULE_1__enemy__["a" /* default */]({
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
      (position) => this.pucks.push(new __WEBPACK_IMPORTED_MODULE_2__puck__["a" /* default */]({
        position,
        // findOpenSpot: findOpenSpot({ player, enemies, pucks })
      }))
    );
  }

  createEnemies(enemyPositions) {
    enemyPositions.forEach(
      (position) => this.enemies.push(new __WEBPACK_IMPORTED_MODULE_1__enemy__["a" /* default */](
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
    Object(__WEBPACK_IMPORTED_MODULE_0__check_bounce_js__["a" /* default */])(allCircles);
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);


const applyBounce = (circleA, circleB) => {
  const distance = Math.sqrt(
    Math.pow(circleA.position.x - circleB.position.x, 2) +
    Math.pow(circleA.position.y - circleB.position.y, 2)
  );
  if (distance < circleA.size + circleB.size) {
    const angleRadians = __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */].angleBetween(circleA, circleB)

    const oldCircleA = cloneCircle(circleA);
    const oldCircleB = cloneCircle(circleB);

    const newAVelocity = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */]({
      x: getNewVelocity(circleA, oldCircleB, "x"),
      y: getNewVelocity(circleA, oldCircleB, "y")
    })

    const newBVelocity = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */]({
      x: getNewVelocity(circleB, oldCircleA, "x"),
      y: getNewVelocity(circleB, oldCircleA, "y")
    })

    circleA.velocity = newAVelocity;
    circleB.velocity = newBVelocity;

    // circleB.velocity.x = getNewVelocity(circleB, oldCircleA, "x");
    // circleB.velocity.y = getNewVelocity(circleB, oldCircleA, "y");
    pushOutOfOverlap(circleA, circleB);

    circleA.onHit(circleB);
    circleB.onHit(circleA);
  }
}

const cloneCircle = (circle) => ({
    velocity: {
      x: circle.velocity.x,
      y: circle.velocity.y
    },
    mass: circle.mass
});

const getNewVelocity = (changerC, otherC, dir) => {
  return (
    (
      changerC.velocity[dir] * (changerC.mass - otherC.mass) +
      (2 * otherC.mass * otherC.velocity[dir])
    ) /
    (changerC.mass + otherC.mass)
  );
}

const moveOneTick = (circle) => {
  circle.position.x += circle.velocity.x;
  circle.position.y += circle.velocity.y;
}

const pushOutOfOverlap = (circleA, circleB) => {
  const bounce = 1;
  const angleRadians =
    Math.atan2(circleB.position.y - circleA.position.y,
    circleB.position.x - circleA.position.x);
  const push = {
    x: Math.cos(angleRadians) * bounce,
    y: Math.sin(angleRadians) * bounce
  }
  circleA.velocity.x += -push.x;
  circleA.velocity.y += -push.y;
  circleB.velocity.x += push.x;
  circleB.velocity.y += push.y;
}

/* harmony default export */ __webpack_exports__["a"] = ((circleArr) => {
  for (let i = 0; i < circleArr.length; i++) {
    for (let j = i + 1; j < circleArr.length; j++) {
      applyBounce(circleArr[i], circleArr[j]);
    }
  }
});


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);


const startingPositions = [
  {x: 100, y: 300},
  {x: 400, y: 100},
  {x: 700, y: 300},
  {x: 400, y: 500}
];

const puckRadius = 20;

const findPosition = ({ player, enemies, pucks }) => () => {
  let openSpots = startingPositions.filter((pos) => enemies.every(enemy => (
    new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](enemy.position).distanceTo(pos) > puckRadius + enemy.size
  )));
  openSpots = openSpots.filter((pos) => pucks.every(puck => (
    new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](puck.position).distanceTo(pos) > puckRadius + puck.size
  )));
  openSpots = openSpots.filter((pos) =>
    new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](player.position).distanceTo(pos) > puckRadius + player.size
  );
  if (openSpots.length > 0) {
    return openSpots[0];
  }
  return {x: 300, y: 400};
}

/* unused harmony default export */ var _unused_webpack_default_export = (findPosition);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Animator {
  constructor(animations = []) {
    this.animations = animations
  }

  render(ctx) {
    this.animations = this.animations.map((animation) => {
      return animation.next();
    });
    this.animations =
      this.animations.filter(animation => animation);
    this.animations.forEach(animation => animation.render(ctx));
  }

  add(animation) {
    this.animations.push(animation);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Animator);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animation__ = __webpack_require__(12);


const explosionSheet = new Image()
explosionSheet.src = "http://hasgraphics.com/wp-content/uploads/2010/08/spritesheet1.png";
const smokeSheet = new Image()
smokeSheet.src = "http://gushh.net/blog/wp-content/uploads/2011/06/smoke_1_40_128_corrected.png";



const explosion = ({ position }) => (
  new __WEBPACK_IMPORTED_MODULE_0__animation__["a" /* default */]({
    state: {
      counter: 0
    },
    update: function() {
      this.state.counter ++;
      if (this.state.counter >= 81) {
        return false;
      } else {
        return true;
      }
    },
    draw: function(ctx) {
      const counter = this.state.counter;
      const srcX = counter % 9;
      const srcY = Math.floor(counter / 9);
      // debugger
      ctx.drawImage(explosionSheet, srcX*100, srcY*100, 100, 100,
      position.x - 50, position.y - 50, 100, 100);
    }
  })
)
/* harmony export (immutable) */ __webpack_exports__["a"] = explosion;

const smoke = ({ position }) => (
  new __WEBPACK_IMPORTED_MODULE_0__animation__["a" /* default */]({
    state: {
      counter: 0
    },
    update: function() {
      this.state.counter ++;
      if (this.state.counter >= 64) {
        return false;
      } else {
        return true;
      }
    },
    draw: function(ctx) {
      const counter = this.state.counter;
      const srcX = counter % 8;
      const srcY = Math.floor(counter / 8);
      // debugger
      ctx.drawImage(smokeSheet, srcX*128, srcY*128, 128, 128,
      position.x - 64, position.y - 64, 128, 128);
    }
  })
)
/* unused harmony export smoke */


// img	Source image object	Sprite sheet
// sx	Source x	Frame index times frame width
// sy	Source y	0
// sw	Source width	Frame width
// sh	Source height	Frame height
// dx	Destination x	0
// dy	Destination y	0
// dw	Destination width	Frame width
// dh	Destination height	Frame height

const test = ({ position }) => {
  return new __WEBPACK_IMPORTED_MODULE_0__animation__["a" /* default */]({
    state: {
      counter: 20
    },
    update: function() {
      this.state.counter--;
      if (this.state.counter <= 0) {
        return false;
      } else {
        return true;
      }
    },
    draw: function(ctx) {
      ctx.beginPath()
      ctx.arc(position.x, position.y, 10, 0, Math.PI * 2);
      ctx.stroke();
    }
  })
}
/* unused harmony export test */



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Animation {
  constructor({state, draw, update}) {
    this.state = state;
    this.draw = draw.bind(this);
    this.update = update.bind(this);
  }

  next() {
    if (this.update()) {
      return this;
    } else {
      return false;
    }
  }

  render(ctx) {
    this.draw(ctx);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Animation);


/***/ })
/******/ ]);