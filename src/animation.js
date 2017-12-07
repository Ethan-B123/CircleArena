class Animation {
  constructor({state, draw, update}) {
    this.state = state;
    this.draw = draw.bind(this);
    this.update = update.bind(this);
  }

  next() {
    if (this.update()) {
      return this;
    } else {
      return false;
    }
  }

  render(ctx) {
    this.draw(ctx);
  }
}

export default Animation
