(() => {
    const blobs = [];
    class Blob {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            const angle = random(0, 2 * PI);
            this.xspeed = random(2, 5) * Math.cos(angle);
            this.yspeed = random(2, 5) * Math.sin(angle);
            this.r = random(120, 300);
        }

        update() {
            this.x += this.xspeed;
            this.y += this.yspeed;
            if (this.x > width || this.x < 0) this.xspeed *= -1;
            if (this.y > height || this.y < 0) this.yspeed *= -1;
        }
    }

    setup = () => {
        const canvasWidth = window.innerWidth > 500 ? 360 : 220;
        const canvasHeight = canvasWidth * (3 / 4);
        const canvas = createCanvas(canvasWidth, canvasHeight);
        canvas.class("p5Canvas not-full-screen");

        const initialBlobCount = window.innerWidth > 500 ? 10 : 7;
        for (let i = 0; i < initialBlobCount; i++) {
            blobs[i] = new Blob(random(0, width), random(0, height));
        }
    };

    draw = () => {
        loadPixels();
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let sum = 0;
                for (let i = 0; i < blobs.length; i++) {
                    const xdif = x - blobs[i].x;
                    const ydif = y - blobs[i].y;
                    const d = sqrt(xdif * xdif + ydif * ydif);
                    sum += (10 * blobs[i].r) / d;
                }
                set(x, y, color(sum));
            }
        }
        updatePixels();

        for (const blob of blobs) blob.update();
    };
})();
