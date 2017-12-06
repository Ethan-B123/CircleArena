
import CollisionCircle from "./collision_circle.js"
import Enemy from "./enemy.js"
import Player from "./player.js"
import Puck from "./puck.js"

import Game from "./game.js"

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
  const game = new Game({ ctx, scoresDom, menuModalDom });
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
