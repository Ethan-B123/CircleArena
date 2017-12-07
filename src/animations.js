import Animation from "./animation";

export const test = ({ position }) => {
  return new Animation({
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
