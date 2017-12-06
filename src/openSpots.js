import Vector from "./vector"

const startingPositions = [
  {x: 100, y: 300},
  {x: 400, y: 100},
  {x: 700, y: 300},
  {x: 400, y: 500}
];

const puckRadius = 20;

const findPosition = ({ player, enemies, pucks }) => () => {
  let openSpots = startingPositions.filter((pos) => enemies.every(enemy => (
    new Vector(enemy.position).distanceTo(pos) > puckRadius + enemy.size
  )));
  openSpots = openSpots.filter((pos) => pucks.every(puck => (
    new Vector(puck.position).distanceTo(pos) > puckRadius + puck.size
  )));
  openSpots = openSpots.filter((pos) =>
    new Vector(player.position).distanceTo(pos) > puckRadius + player.size
  );
  if (openSpots.length > 0) {
    return openSpots[0];
  }
  return {x: 300, y: 400};
}

export default findPosition;
