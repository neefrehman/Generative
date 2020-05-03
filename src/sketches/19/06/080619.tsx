import React from "react";
import p5 from "p5/lib/p5.min";

import P5Wrapper from "../../../components/P5Wrapper";

const sketch = (p: p5) => {
    const balls: Ball[] = [];

    class Ball {
        x: number;
        y: number;
        r: number;
        offset: number;
        isHorizontal: boolean;
        vel: number;

        constructor(x: number, y: number, r: number) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.offset = 0;
            this.isHorizontal = Math.random() >= 0.5;
        }

        update() {
            this.offset += 0.01;
            this.vel = p.map(p.noise(this.offset), 0, 1, -18, 18);
            if (this.isHorizontal === true) {
                this.x += this.vel;
            } else {
                this.y += this.vel;
            }

            p.ellipse(this.x, this.y, this.r);
        }
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(20);

        balls[0] = new Ball(p.width / 2, p.height / 2, 36);
    };

    p.draw = () => {
        p.background(20);

        if (p.frameCount % 15 === 0) {
            balls.push(new Ball(p.random(p.width), p.random(p.height), 36));
        }

        for (let i = 0; i < balls.length; i++) {
            balls[i].update();
        }

        if (balls.length > 1000) {
            balls.splice(0, 1);
        }
    };

    p.mousePressed = () => {
        balls.push(new Ball(p.mouseX, p.mouseY, 36));
    };
};

const s050119 = () => <P5Wrapper sketch={sketch} />;

export default s050119;