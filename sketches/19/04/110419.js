(() => {

    const particles = [];
    const noiseScale = 1000000;

    class Particle {

        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.d = 36;
            this.col = 255;

            this.dir = createVector(0, 0);
            this.vel = createVector(0, 0);
            this.pos = createVector(this.x, this.y);
            this.speed = (width > 500) ? 3 : 2;

            this.history = [];
        }

        move() {
            const angle = noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * TWO_PI * noiseScale;
            this.dir.x = cos(angle);
            this.dir.y = sin(angle);
            this.vel = this.dir.copy();
            this.vel.mult(this.speed);
            this.pos.add(this.vel);

            if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
                this.pos.x = random(50, width);
                this.pos.y = random(50, height);
            }

            const v = createVector(this.pos.x, this.pos.y);
            this.history.push(v);

            if (this.history.length > 70) {
                this.history.splice(0, 1);
            }

            for (let i = 0; i < this.history.length; i++) {
                this.history[i].x += random(-2, 2);
                this.history[i].y += random(-2, 2);
            }
        }

        display() {
            noStroke();
            fill(this.col);
            ellipse(this.pos.x, this.pos.y, this.d);

            for (let i = 0; i < this.history.length; i++) {
                const pos = this.history[i];
                const col = map(i, 0, this.history.length, 75, this.col);
                fill(col);
                const d = map(i, 0, this.history.length, 1, this.d * 0.9);
                ellipse(pos.x, pos.y, d, d);
            }
        }

        isHovered() {
            const d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
            return (d - 15 < this.d);
        }

        excite() {
            this.speed = 8;
            this.col = 0;
        }

        deExcite() {
            this.speed = (width > 500) ? 3 : 2;
            this.col = 255;
        }

    }




    setup = () => {
        createCanvas(windowWidth, windowHeight);

        const initialParticleCount = (width > 450) ? 30 : 15;
        for (let i = 0; i < initialParticleCount; i++) {
            particles.push(new Particle(random(width), random(height)));
        }
    };


    draw = () => {
        background(20);

        for (const particle of particles) {
            particle.display();
            particle.move();

            if (particle.isHovered()) {
                particle.excite();
            } else {
                particle.deExcite();
            }
        }
    };

})(); new p5();
