import CollisionCircle from "./collision_circle";
// import Vector from "./vector";

class Puck extends CollisionCircle {
  constructor({ position }) {
    super({
      position: position,
      size: 20,
      velocity: {x: 0, y: 0},
      mass: 2,
      color: "#4f4"
    });
    this.dampening = 0.99;
  }

  

}

export default Puck;
