import React from "react";
import p5 from "p5";

import P5Wrapper from "../../../components/renderers/P5Wrapper";

const sketch = (p: p5) => {
    let cols: number;
    let rows: number;
    const scale = 20;

    const terrain = [];

    let flying = 0;
    const noisiness = 0.2;

    let camXOff = 0;

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        p.background(20);
        p.frameRate(24);
        p.stroke(255);
        p.strokeWeight(0.5);
        p.noFill();

        cols = p.windowWidth / scale;
        rows = p.windowWidth / scale;
    };

    p.draw = () => {
        flying -= noisiness;
        let yOff = 0;
        for (let x = 0; x < rows; x++) {
            terrain[x] = [];
            let xOff = flying;
            for (let y = 0; y < cols; y++) {
                terrain[x][y] = p.map(p.noise(xOff, yOff), 0, 1, -100, 100);
                xOff += noisiness;
            }
            yOff += noisiness;
        }

        p.background(20);

        p.rotateX(p.PI / 3 + camXOff);
        p.translate(-p.width / 2, -p.height / 2);

        for (let x = 0; x < rows - 1; x++) {
            p.beginShape(p.TRIANGLE_STRIP);
            for (let y = 0; y < cols; y++) {
                p.vertex(x * scale, y * scale, terrain[x][y]);
            }
            p.endShape();
        }
    };

    p.mouseMoved = () => {
        camXOff = p.map(p.mouseY, 0, p.height, -1, 1);
    };
};

const S181019 = () => <P5Wrapper sketch={sketch} />;

export default S181019;
