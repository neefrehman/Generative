var slices = [];
var Slice = class Slice {

  constructor(x, y, r) {
    this.x = x || random(width);
    this.y = y || height;
    this.r = r || 30;
    this.speed = (height > 450) ? 5 : 3;
    this.growth = (height > 450) ? 6 : 3;
  }

  move() {
    this.y = this.y - random(this.speed);
    this.r = this.r + random(-this.growth, this.growth);
  }

  show() {
    stroke(255);
    strokeWeight(1);
    fill(20);
    ellipse(this.x, this.y, this.r * 2);
  }

  hovered() {
    const d = dist(this.x, this.y, mouseX, mouseY);
    return (d - 15 < this.r);
  }

  excited() {
    this.speed = this.speed * 1.5;
    this.growth = this.growth * 1.5;
  }

  normal() {
    this.speed = (height > 450) ? 5 : 3;
    this.growth = (height > 450) ? 4 : 2;
  }

};

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(20);
  frameRate(10);

  const initialSliceCount = Math.floor(width / 30);
  for (var i = 0; i < initialSliceCount; i++) {
    slices[i] = new Slice();
  }

}

function draw() {

  for (const slice of slices) {

    slice.move();
    slice.show();

    if (slice.hovered()) {
      slice.excited();
    } else {
      slice.normal();
    }

    if (slice.y < -slice.r) {
      slice.y = height + slice.r;
    }

  }

  if (slices.length > 100) {
    slices.splice(0, 1);
  }

}

function mousePressed() {
  const slice = new Slice(mouseX, mouseY);
  slices.push(slice);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(20);
}

new p5();
