import Animation from "./animation";

const explosionSheet = new Image()
explosionSheet.src = "http://hasgraphics.com/wp-content/uploads/2010/08/spritesheet1.png";
const smokeSheet = new Image()
smokeSheet.src = "http://gushh.net/blog/wp-content/uploads/2011/06/smoke_1_40_128_corrected.png";



export const explosion = ({ position }) => (
  new Animation({
    state: {
      counter: 0
    },
    update: function() {
      this.state.counter ++;
      if (this.state.counter >= 81) {
        return false;
      } else {
        return true;
      }
    },
    draw: function(ctx) {
      const counter = this.state.counter;
      const srcX = counter % 9;
      const srcY = Math.floor(counter / 9);
      // debugger
      ctx.drawImage(explosionSheet, srcX*100, srcY*100, 100, 100,
      position.x - 50, position.y - 50, 100, 100);
    }
  })
)
export const smoke = ({ position }) => (
  new Animation({
    state: {
      counter: 0
    },
    update: function() {
      this.state.counter ++;
      if (this.state.counter >= 64) {
        return false;
      } else {
        return true;
      }
    },
    draw: function(ctx) {
      const counter = this.state.counter;
      const srcX = counter % 8;
      const srcY = Math.floor(counter / 8);
      // debugger
      ctx.drawImage(smokeSheet, srcX*128, srcY*128, 128, 128,
      position.x - 64, position.y - 64, 128, 128);
    }
  })
)

// img	Source image object	Sprite sheet
// sx	Source x	Frame index times frame width
// sy	Source y	0
// sw	Source width	Frame width
// sh	Source height	Frame height
// dx	Destination x	0
// dy	Destination y	0
// dw	Destination width	Frame width
// dh	Destination height	Frame height

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
