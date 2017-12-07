class Animator {
  constructor(animations = []) {
    this.animations = animations
  }

  render(ctx) {
    this.animations = this.animations.map((animation) => {
      return animation.next();
    });
    this.animations =
      this.animations.filter(animation => animation);
    this.animations.forEach(animation => animation.render(ctx));
  }

  add(animation) {
    this.animations.push(animation);
  }
}

export default Animator;
