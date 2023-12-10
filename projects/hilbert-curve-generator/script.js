class Turtle {
  constructor(x0, y0, a0, ctx) {
    this.x = x0;
    this.y = y0;
    this.angle = a0;
    this.ctx = ctx;
    this.setStroke("red", 1);
  }

  setStroke(color, line_width){
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = line_width;
  }

  // rotate orientation delta degrees counterclockwise
  turnLeft(delta) {
      this.angle += delta;
  }

  // rotate orientation delta degrees clockwise
  turnRight(delta){
      this.angle -= delta;
  }

  // move forward the given amount, with the pen down
  goForward(step){
      let oldx = this.x;
      let oldy = this.y;
      this.x += step * Math.cos(this.angle * Math.PI / 180);
      this.y += step * Math.sin(this.angle * Math.PI / 180);

      // draw a red line
      this.ctx.beginPath();
      this.ctx.moveTo(oldx, oldy);
      this.ctx.lineTo(this.x, this.y);
      this.ctx.stroke();
  }
}


function hilbert(turtle, size, order, parity){
  if (order == 0) {
      return	
  }

  // rotate and draw first subcurve with opposite parity to big curve
  turtle.turnLeft(parity * 90);
  hilbert(turtle, size, order - 1, -parity)

  //interface to and draw second subcurve with same parity as big curve
  turtle.goForward(size);
  turtle.turnRight(parity * 90);
  hilbert(turtle, size, order - 1, parity);

  // third subcurve
  turtle.goForward(size);
  hilbert(turtle, size, order - 1, parity);

  // fourth subcurve
  turtle.turnRight(parity * 90);
  turtle.goForward(size);
  hilbert(turtle, size, order - 1, -parity);
  // a final turn is needed to make the turtle
  // end up facing outward from the large square
  turtle.turnLeft(parity * 90);
}


const template = document.createElement('template');
template.innerHTML = `
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  align-content: stretch;
  width: 512px;
  margin-bottom: 8px;
}

.item {
  flex: 0 0 auto;
  margin-right: 8px;
  height: 32px;
  max-width: 80px;
}
input, button {
  width: 64px;
  text-align: center;
}
</style>

<div>

<div class="container">

  <label class="item" for="phc-order">Order</label>
  <input class="item" type="number" id="phc-order" name="phc-order" min="1" max="10" value="5" placeholder="order(n)">

  <label class="item" for="stroke-width">Stroke</label>
  <input class="item" type="number" id="stroke-width" name="stroke-width" min="1" max="10" placeholder="1px" value="1">

  <label class="item" for="canvas-width">Size</label>
  <input class="item" type="number" id="canvas-width" name="canvas-width" min="128" max="2048" placeholder="500px" value="500">

  <input class="item" type="color" id="stroke-color" name="stroke-color" value="#ff0000">

  <button class="item" id="btn-draw">Draw</button>
  </div>
  <canvas  id="canvas">The browser doesn't support the canvas element</canvas>
</div>
`

class HilberCurve extends HTMLElement {
  constructor(){
      super();
      this.root = this.initRoot(true);
      this.initSelectors(this.root);
  }

  initRoot(asShadow){
      if (asShadow == true){
          this.attachShadow({mode: 'open'});
          this.shadowRoot.appendChild(template.content.cloneNode(true));
          this.shadowRoot
          return this.shadowRoot
      }
      // FIXME: add generation for non shadow roots somehow
  }

  initSelectors(root){
      this.canvasSelector = root.querySelector('#canvas');
      this.PhcOrderSelector = root.getElementById('phc-order');
      this.StrokeColorSelector = root.getElementById('stroke-color');
      this.StrokeWidthSelector = root.getElementById('stroke-width');
      this.canvasWidthSelector = root.getElementById('canvas-width');
      this.drawButtonSelector = root.getElementById('btn-draw');
  }

  connectedCallback(){
      // create callbacks for toggle-info button
      // call draw on the first time to show curves
      this.draw();
      this.drawButtonSelector.addEventListener('click', () => this.draw());
  }

  disconnectedCallback(){
      // removes a callback call if component is removed
      this.drawButtonSelector.removeEventListener();
  }

  // Write Business Login Below

  getCanvasWidth(){
      return Number(this.canvasWidthSelector.value) || Number(this.getAttribute(width));
  }

  draw(){
      console.log("Call: draw()");
      let canvasWidth = this.getCanvasWidth();

      this.canvasSelector.width = canvasWidth;
      this.canvasSelector.height = canvasWidth;

      let ctx = this.canvasSelector.getContext('2d');
      ctx.clearRect(0, 0, canvasWidth, canvasWidth);

      let phc_order = this.PhcOrderSelector.value;
      let stroke_color = this.StrokeColorSelector.value;
      let stroke_width = this.StrokeWidthSelector.value;

      // the width is proportional to the square of the order
      let order_size = canvasWidth/(Math.pow(2,phc_order) + 1);
      let t = new Turtle(order_size, order_size,0, ctx);
      t.setStroke(stroke_color, stroke_width);

      hilbert(t, order_size, phc_order, 1);
      console.log("Drawing:", phc_order, stroke_color, stroke_width);
  }


}

window.customElements.define('hilbert-curve', HilberCurve);