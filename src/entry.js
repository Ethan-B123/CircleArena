
import CollisionCircle from "./collision_circle.js"
import Player from "./player.js"
import Game from "./game.js"

const enemyPositions = [
  {x: 100, y: 100},
  {x: 700, y: 100},
  {x: 100, y: 500},
  {x: 700, y: 500}
];

const startGame = ({ ctx }) => {
  const enemies = enemyPositions.map(
    (pos) => new CollisionCircle({
      position: pos,
      size: 30,
      velocity: {x: 0, y: 0},
      mass: 10,
      color: "#f44"
    })
  );
  const player = new Player();
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
