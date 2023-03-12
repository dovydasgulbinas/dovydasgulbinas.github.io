
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

function draw() {

    // clear canvas before drawing
    const main = document.querySelector('#canvas');
    const width = canvas.width; // 500
    const height = canvas.height; // 500
    if (!main.getContext) {
        return;
    }

    // get the context
    let ctx = main.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    let phc_order = document.getElementById("phc-order").value;
    let stroke_color = document.getElementById("stroke-color").value;
    let stroke_width = document.getElementById("stroke-width").value;


    // the width is proportional to the square of the order
    let order_size = width/(Math.pow(2,phc_order) + 1);
    let t = new Turtle(order_size, order_size,0, ctx);
    t.setStroke(stroke_color, stroke_width);

    hilbert(t, order_size, phc_order, 1);
    console.log("Drawing:", phc_order, stroke_color, stroke_width);

};

draw();

document.getElementById("btn-draw").addEventListener("click", draw);
