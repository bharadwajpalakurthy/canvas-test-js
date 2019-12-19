var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");
var mouse = {
  x: undefined,
  y: undefined
};

var range = 40;

document.addEventListener("mousemove", event => {
  mouse.x = event.x;
  mouse.y = event.y;
});

function Circle(x, y, radius, velx, vely, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = velx;
  this.dy = vely;
  this.color = color;

  this.draw = function() {
    ctx.beginPath();

    // create circle
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.animScale =  function(maxSize) {
    this.radius = lerp(this.radius,maxSize,0.1)
  }


  function lerp (start, end, amt){
    return (1-amt)*start+amt*end
  }
  
  this.update = function() {
    // move horizontally
    if (this.x + radius > window.innerWidth || this.x - radius < 0) {
      this.dx = -this.dx;
    }

    // move vertically
    if (this.y + radius > window.innerHeight || this.y - radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if ((this.x < mouse.x + range && this.x > mouse.x - range) && (this.y < mouse.y + range && this.y > mouse.y - range)){
      this.animScale(radius *5);
    } else this.animScale(radius)

    this.draw();
  };
}




var size = 1000;

var circles = [size];

var colors = ["#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb", "#1dd1a1"];

for (var i = 0; i < size; i++) {
  var radius = Math.random() * 10 + 5;
  var px = Math.random() * (window.innerWidth - radius * 2) + radius;
  var py = Math.random() * (window.innerHeight - radius * 2) + radius;
  var dx = Math.random() * 2 + -0.9;
  var dy = Math.random() * 2 + -0.9;
  var colorID = Math.ceil(Math.random() * 4);

  circles[i] = new Circle(px, py, radius, dx, dy, colors[colorID]);
}

function animate() {
  // Clear screen
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circles.forEach(e => {
    e.update();
  });

  requestAnimationFrame(animate);
}

animate();
