class Fragment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.color = color(random(255), 150);
  }

  move() {
    // Mover el fragmento
    this.x += this.speedX;
    this.y += this.speedY;

    // Rebote en los bordes
    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }
  }

  display() {
    // Mostrar el fragmento
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, 10, 10);
  }
}

