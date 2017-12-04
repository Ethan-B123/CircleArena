import Vector from "./vector";

const applyBounce = (circleA, circleB) => {
  const distance = Math.sqrt(
    Math.pow(circleA.position.x - circleB.position.x, 2) +
    Math.pow(circleA.position.y - circleB.position.y, 2)
  );
  if (distance < circleA.size + circleB.size) {
    const angleRadians = Vector.angleBetween(circleA, circleB)
      // Math.atan2(circleB.position.y - circleA.position.y,
      // circleB.position.x - circleA.position.x);

    const oldCircleA = cloneCircle(circleA);
    const oldCircleB = cloneCircle(circleB);

    const newAVelocity = new Vector({
      x: getNewVelocity(circleA, oldCircleB, "x"),
      y: getNewVelocity(circleA, oldCircleB, "y")
    })

    const newBVelocity = new Vector({
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
  const bounce = 0.5;
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

export default (circleArr) => {
  for (let i = 0; i < circleArr.length; i++) {
    for (let j = i + 1; j < circleArr.length; j++) {
      applyBounce(circleArr[i], circleArr[j]);
    }
  }
}
