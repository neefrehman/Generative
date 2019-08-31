(() => {
    setup = () => {
        createCanvas(windowWidth, windowHeight, WEBGL);
        colorMode(HSB);
    };

    draw = () => {
        background(0);
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.01);

        var dirY = (mouseY / height - 0.5) * 2;
        var dirX = (mouseX / width - 0.5) * 2;
        directionalLight(255, 0, 255, -dirX, -dirY, 0.5);
        ambientMaterial(255, 0, 255);

        torus(100, 25, 48, 32);
        sphere(25, 48);
    };
})();
