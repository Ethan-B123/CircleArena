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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_js__ = __webpack_require__(2);




const startGame = ({ ctx }) => {
  const p = new __WEBPACK_IMPORTED_MODULE_1__player_js__["a" /* default */];
  if (window.CircleArena !== undefined) {
    clearInterval(window.CircleArena.drawLoop);
  }
  window.CircleArena = {};
  window.CircleArena.drawLoop = setInterval(() => {
    p.update();
    p.render(ctx);
  }, 16);
  window.addEventListener("keydown", p.handleInput("keydown"));
  window.addEventListener("keyup", p.handleInput("keyup"));
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
class CollisionCircle {
  constructor({ position, size, velocity, mass, color }) {
    this.position = position;
    this.size = size;
    this.velocity = velocity;
    this.mass = mass;
    this.color = color;
    this.dampening = 0.9;
  }

  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.velocity.x *= this.dampening;
    this.velocity.y *= this.dampening;
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
      color: "#99e"
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
        console.log(e.key);
      }
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ })
/******/ ]);