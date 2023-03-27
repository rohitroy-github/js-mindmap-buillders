let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

// drawARectangle
// ctx.fillStyle = "red";
// ctx.fillRect(100, 100, 100, 100);

// drawAline
// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.lineTo(400, 500);
// ctx.strokeStyle = "blue";
// ctx.stroke();

// drawACircle
// ctx.beginPath();
// ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
// ctx.strokeStyle = "red";
// ctx.stroke();

// multiplyingElements
// for (let i = 0; i < 10; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;

//   ctx.beginPath();
//   ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//   ctx.strokeStyle = "red";
//   ctx.stroke();
// }

// animateVariables
// let x = Math.random() * innerWidth;
// let y = Math.random() * innerHeight;
// let dx = (Math.random() - 0.5) * 10;
// let dy = (Math.random() - 0.5) * 10;
// let radius = 50;

// function animate() {
//   requestAnimationFrame(animate);

//   ctx.clearRect(0, 0, innerWidth, innerHeight);

//   ctx.beginPath();
//   ctx.arc(x, y, radius, 0, Math.PI * 2, false);
//   ctx.strokeStyle = "red";
//   ctx.stroke();

//   if (x + radius > innerWidth || x - radius < 0) {
//     dx = -dx;
//   }

//   if (y + radius > innerHeight || y - radius < 0) {
//     dy = -dy;
//   }

//   x = x + dx;
//   y = y + dy;
// }

// let x = Math.random() * innerWidth;
// let y = Math.random() * innerHeight;
// let dx = (Math.random() - 0.5) * 10;
// let dy = (Math.random() - 0.5) * 10;
// let radius = 50;

let Mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (event) {
  Mouse.x = event.x;
  Mouse.y = event.y;

  // console.log(Mouse);
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.fill();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    // interactivity
    if (
      Mouse.x - this.x < 50 &&
      Mouse.x - this.x > -50 &&
      Mouse.y - this.y < 50 &&
      Mouse.y - this.y > -50
    ) {
      if (this.radius < 250) {
        this.radius += 1;
      }
    } else if (this.radius > 20) {
      this.radius -= 1;
    }

    this.draw();
  };
}

let circleArray = [];

for (let i = 0; i < 500; i++) {
  let x = Math.random() * innerWidth;
  let y = Math.random() * innerHeight;
  let dx = (Math.random() - 0.5) * 10;
  let dy = (Math.random() - 0.5) * 10;
  let radius = 20;

  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
console.log(canvas);
