
import CollisionCircle from "./collision_circle.js"
import Enemy from "./enemy.js"
import Player from "./player.js"
import Puck from "./puck.js"

import Game from "./game.js"

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
  const player = new Player();

  let enemies = enemyPositions.map( //TODO remove let
    (position) => new Enemy({ position, player })
  );
  const pucks = puckPositions.map(
    (position) => new Puck({ position })
  );
  enemies = enemies.concat(pucks); //TODO remove let from enemies
  const game = new Game({ ctx, player, enemies });
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
