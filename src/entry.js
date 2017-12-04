
import CollisionCircle from "./collision_circle.js"
import Player from "./player.js"

const startGame = ({ ctx }) => {
  const p = new Player;
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
