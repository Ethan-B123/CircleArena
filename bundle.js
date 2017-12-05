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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collision_circle_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemy_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__puck_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game_js__ = __webpack_require__(3);








const enemyPositions = [
  // {x: 100, y: 100},
  // {x: 700, y: 100},
  // {x: 100, y: 500},
  {x: 700, y: 500}
];

const puckPositions = [
  {x: 100, y: 100},
  {x: 700, y: 100},
  {x: 100, y: 500}
  // {x: 700, y: 500}
]

const startGame = ({ ctx }) => {
  const player = new __WEBPACK_IMPORTED_MODULE_2__player_js__["a" /* default */]();

  let enemies = enemyPositions.map( //TODO remove let
    (position) => new __WEBPACK_IMPORTED_MODULE_1__enemy_js__["a" /* default */]({ position, player })
  );
  const pucks = puckPositions.map(
    (position) => new __WEBPACK_IMPORTED_MODULE_3__puck_js__["a" /* default */]({ position })
  );
  enemies = enemies.concat(pucks); //TODO remove let from enemies
  const game = new __WEBPACK_IMPORTED_MODULE_4__game_js__["a" /* default */]({ ctx, player, enemies });
  if (window.CircleArena !== undefined) {
    clearInterval(window.CircleArena.drawLoop);
  }
  window.CircleArena = {};
  window.CircleArena.drawLoop = setInterval(() => {
    ctx.clearRect(0, 0, 800, 600);
    game.update();
    game.render(ctx);
  }, 16);
  window.addEventListener("keydown", player.handleInput("keydown"));
  window.addEventListener("keyup", player.handleInput("keyup"));
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  startGame({ ctx });
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(5);


class CollisionCircle {
  constructor({ position, size, velocity, mass, color }) {
    this.position = position;
    this.size = size;
    this.velocity = velocity;
    this.mass = mass;
    this.color = color;
    this.dampening = 0.9;
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
    ctx.fillStyle = this.color;
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = prevFillStyle;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (CollisionCircle);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collision_circle_js__ = __webpack_require__(1);


class Player extends __WEBPACK_IMPORTED_MODULE_0__collision_circle_js__["a" /* default */] {
  constructor() {
    super({
      position: { x:400, y:300 },
      size: 30,
      velocity: { x:0, y:0 },
      mass: 10,
      color: "#9999ee"
    });
    this.input = {
      up: false,
      left: false,
      down: false,
      right: false,
      brake: false
    }
  }

  update() {
    this.moveFromInput();
    super.update();
  }

  moveFromInput() {
    if (this.input.up) {
      this.velocity.y -= 0.9;
    }
    if (this.input.left) {
      this.velocity.x -= 0.9;
    }
    if (this.input.down) {
      this.velocity.y += 0.9;
    }
    if (this.input.right) {
      this.velocity.x += 0.9;
    }
    if (this.input.brake) {
      this.velocity.x *= 0.7;
      this.velocity.y *= 0.7;
    }
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__check_bounce_js__ = __webpack_require__(4);


class Game {
  constructor({ ctx, player, enemies }) {
    this.ctx = ctx;
    this.player = player;
    this.enemies = enemies;
  }

  update() {
    const allCircles = this.enemies.concat([this.player]);
    allCircles.forEach((circle) => circle.update());
    Object(__WEBPACK_IMPORTED_MODULE_0__check_bounce_js__["a" /* default */])(allCircles);
  }

  render(ctx) {
    const allCircles = this.enemies.concat([this.player]);
    allCircles.forEach((circle) => circle.render(ctx));
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(5);


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

    circleA.velocity.x = newAVelocity.x;
    circleA.velocity.y = newAVelocity.y;
    circleB.velocity.x = newBVelocity.x;
    circleB.velocity.y = newBVelocity.y;

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
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collision_circle__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector__ = __webpack_require__(5);



class Enemy extends __WEBPACK_IMPORTED_MODULE_0__collision_circle__["a" /* default */] {
  constructor({ position, player }) {
    super({
      position: position,
      size: 30,
      velocity: {x: 0, y: 0},
      mass: 10,
      color: "#ff4444"
    });
    this.seek = {
      x: 0,
      y: 0
    }
    this.player = player;
  }

  update() {
    const angle =
      __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* default */].angleBetween(this.position, this.player.position);
    this.seek = __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* default */].fromAngleSpeed(angle, 0.5);
    this.velocity.x += this.seek.x;
    this.velocity.y += this.seek.y;
    super.update();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Enemy);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collision_circle__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enemy__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vector__ = __webpack_require__(5);





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
    if (otherCircle instanceof __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */] || otherCircle instanceof __WEBPACK_IMPORTED_MODULE_2__enemy__["a" /* default */]) {
      this.controller = otherCircle;
      this.color = otherCircle.color;
      this.safe = false;
    }
  }

  update() {
    super.update();
    const speed = new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* default */](this.velocity).length();
    if (speed > 1 && speed < 2 && !this.safe) {
      this.color = lerpColor("#ffffff", this.controller.color, speed-1);
    } else if (speed <= 1) {
      this.safe = true;
      this.controller = this;
      this.color = "#44ff44"
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Puck);


/***/ })
/******/ ]);