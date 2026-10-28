let pMapper;
let starQuad;
let sunsetQuad; 
let blueQuad; 

let numStar = 100;
let min = 1;
let max = 5;
let star = [];

let shootingStar = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    size: 0,
    active: false
};
let trail = [];

let quadWidth = 1500;
let blueQuadHeight = 200;

let setQuadHeight = 400;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pMapper = createProjectionMapper(this);

    starQuad = pMapper.createQuadMap(quadWidth, setQuadHeight);

    sunsetQuad = pMapper.createQuadMap(quadWidth, setQuadHeight);

    blueQuad = pMapper.createQuadMap(quadWidth, blueQuadHeight);


    for (i = 0; i < numStar; i++){
        star.push({
            x: random(0, starQuad.width), y: random(0, starQuad.height),
            size: random(min, max), growth: random(-0.5, 0.5)
        });
    }
}

function draw() {
    background(0);

    let angle = (millis() * 0.00008) % TWO_PI;

    let centerX = quadWidth * 0.5;
    let centerY = 500;
    let radiusX = 650;
    let radiusY = 380;

    let globalSunX = centerX - cos(angle) * radiusX;
    let globalSunY = centerY - sin(angle) * radiusY;

    starQuad.displaySketch((starSketch) => starDrawing(starSketch, globalSunX, globalSunY));

    blueQuad.displaySketch((blueSketch) => blueSkyDrawing(blueSketch, globalSunX, globalSunY));

    sunsetQuad.displaySketch((sunsetSketch) => sunsetDrawing(sunsetSketch, globalSunX, globalSunY));
}

function starDrawing(starSketch, sunX, sunY) {
    starSketch.background(10, 15, 35);

    let topBlue = starSketch.color(5, 10, 35);
    let bottomBlue = starSketch.color(25, 50, 110);

    for (let y = 0; y < starSketch.height; y++){
        let norm = y / starSketch.height;
        let col = starSketch.lerpColor(topBlue, bottomBlue, norm);

        starSketch.stroke(col);
        starSketch.line(0, y, starSketch.width, y);
    }

    starSketch.noStroke();
    
    for(s of star){
        starSketch.fill(255);
        starSketch.ellipse(s.x, s.y, s.size, s.size);
        s.size += s.growth;
        if(s.size >= max || s.size <= min){
            s.growth *= -1;
        }
    }

    if(sunY >= -35 && sunY <= setQuadHeight + 35){
        let localY = sunY;
        drawMoon(starSketch, sunX, localY, 65);
    }

    if(!shootingStar.active && random(1) < 0.015){
        shootingStar.x = random(0, starQuad.width * 0.6);
        shootingStar.y = random(0, starQuad.height * 0.3);
        shootingStar.vx = random(20, 25);
        shootingStar.vy = random(10, 15);
        shootingStar.size = random(0.5, 3);
        shootingStar.active = true;
    }

    if(shootingStar.active){
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;

        starSketch.stroke(255, 255, 255, 220);
        starSketch.strokeWeight(shootingStar.size);
        starSketch.line(shootingStar.x, shootingStar.y, shootingStar.x - shootingStar.vx * 2.5, shootingStar.y - shootingStar.vy * 2.5);

        for(let i = 0; i < 3; i++){
            trail.push({
                xPos: shootingStar.x, yPos: shootingStar.y,
                vx: random(-3, 0), vy: random(-2, 2),
                alpha: 255
            });
        }

        if(shootingStar.x > starQuad.width || shootingStar.y > starQuad.height){
            shootingStar.active = false;
        }
    }

    for(let i = trail.length - 1; i >= 0; i--){
        let t = trail[i];

        t.xPos += t.vx;
        t.yPos += t.vy;
        t.alpha -= 10;

        starSketch.stroke(255, 255, 255, t.alpha);
        starSketch.strokeWeight(3);
        starSketch.point(t.xPos, t.yPos);

        if(t.alpha <= 0){
            trail.splice(i, 1);
        }
    }
}

function blueSkyDrawing(blueSketch, sunX, sunY) {

    let nightBlueTop = blueSketch.color(10, 15, 35);
    let noonBlueTop = blueSketch.color(25, 50, 110);

    let goldenBot = blueSketch.color(255, 140, 70);
    let noonBlueBot = blueSketch.color(255, 255, 255);

    let sunProgress = constrain(1 - sunY / blueQuadHeight, 0, 1);

    let topBlue = blueSketch.lerpColor(nightBlueTop, noonBlueTop, sunProgress);
    let bottomBlue = blueSketch.lerpColor(goldenBot, noonBlueBot, sunProgress);

    for (let y = 0; y < blueQuadHeight; y++){
        let norm = y / blueQuadHeight;
        let col = blueSketch.lerpColor(topBlue, bottomBlue, norm);

        blueSketch.stroke(col);
        blueSketch.line(0, y, blueSketch.width, y);
    }

    let beat = sin(millis() * 0.002) * 2;
    let sunSize = 65 + beat;

    if(sunY >= setQuadHeight - 35 && sunY < (setQuadHeight + blueQuadHeight) + 35){
        let localY = sunY - setQuadHeight;
        drawSun(blueSketch, sunX, localY, sunSize);
    }

    let noiseScale = 0.015;
    let speed = millis() * 0.0002;
    blueSketch.noStroke();

    let sunsetCloud = blueSketch.color(255, 200, 170);
    let cloudColor = blueSketch.color(255, 255, 255);
    let currentCloud = blueSketch.lerpColor(sunsetCloud, cloudColor, sunProgress);

    for(let x = 0; x < blueSketch.width; x += 4){
        for(let y = 0; y < blueSketch.height; y += 4){
            let n = noise(x * noiseScale - speed, y * noiseScale);

            if (n > 0.45){
                let cloudAlpha = map(n, 0.42, 0.75, 0, 210);

                blueSketch.fill(40, 90, 160, cloudAlpha * 0.35);
                blueSketch.rect(x + 3, y + 5, 4, 4);

                blueSketch.fill(red(currentCloud), green(currentCloud), blue(currentCloud), cloudAlpha);
                blueSketch.rect(x, y, 4, 4);
            }
        }
    }
}

function sunsetDrawing(sunsetSketch, sunX, sunY) {
    let sunsetFactor = constrain(1 - sunY / sunsetSketch.height, 0, 1);

    let skyBlue = sunsetSketch.color(35, 45, 95);
    let purple = sunsetSketch.color(110, 45, 105);
    let pink = sunsetSketch.color(235, 80, 100);
    let gold = sunsetSketch.color(255, 140, 40);

    for (let y = 0; y < setQuadHeight; y++){
        let pct = 1 - (y / setQuadHeight);
        let col;

    if(pct < 0.10){
        let norm = map(pct, 0, 0.10, 0, 1);
        col = sunsetSketch.lerpColor(skyBlue, purple, norm);
    } else if(pct < 0.30){
        let norm = map(pct, 0.10, 0.30, 0, 1);
        col = sunsetSketch.lerpColor(purple, pink, norm);
    } else {
        let norm = map(pct, 0.30, 1, 0, 1);
        col = sunsetSketch.lerpColor(pink, gold, norm);
    }

    sunsetSketch.stroke(col);
    sunsetSketch.line(0, y, sunsetSketch.width, y);
    }

    let beat = sin(millis() * 0.002) * 2;
    let sunSize = 65 + beat;

    let localSunY = sunY - (setQuadHeight + blueQuadHeight);

    if(sunY >= (setQuadHeight + blueQuadHeight) - 35 && sunY < (setQuadHeight * 2 + blueQuadHeight) + 35){
        let localY = sunY - (setQuadHeight + blueQuadHeight);
        drawSun(sunsetSketch, sunX, localSunY, sunSize);
    }

    let noiseScale = 0.015;
    let speed = millis() * 0.0002;
    sunsetSketch.noStroke();

    let goldCloud = sunsetSketch.color(255, 215, 180);
    let darkCloud = sunsetSketch.color(45, 35, 65);
    let currentCloud = sunsetSketch.lerpColor(darkCloud, goldCloud, sunsetFactor);

    for(let x = 0; x < sunsetSketch.width; x += 3){
        for(let y = 0; y < sunsetSketch.height * 0.65; y += 3){
            let n = sunsetSketch.noise(x * noiseScale - speed, y * noiseScale);

            if (n > 0.45){
                let cloudAlpha = map(n, 0.42, 0.75, 0, 140);
                sunsetSketch.fill(red(currentCloud), green(currentCloud), blue(currentCloud), cloudAlpha);
                sunsetSketch.rect(x, y, 3, 3);
            }
        }
    }
}

function drawMoon(blueSketch, x, y, size){
    blueSketch.push();
    blueSketch.noStroke();

    for(let i = size * 2.2; i > size; i -= 6){
        let alpha = map(i, size, size * 2.2, 90, 0);
        blueSketch.fill(200, 255, 255, alpha);
        blueSketch.circle(x, y, i);
    }

    blueSketch.fill(235, 242, 255);
    blueSketch.circle(x, y, size);

    blueSketch.pop();
}

function drawSun(blueSketch, x, y, size){
    blueSketch.push();
    blueSketch.noStroke();

    for(let i = size * 2.5; i > size; i -= 8){
        let alphaVal = map(i, size, size * 2.5, 150, 0);
        blueSketch.fill(255, 235, 150, alphaVal);
        blueSketch.circle(x, y, i);
    }

    blueSketch.fill(255, 245, 180, 210);
    blueSketch.circle(x, y, size * 1.3);

    blueSketch.fill(255, 255, 255);
    blueSketch.circle(x, y, size * 0.7);

    blueSketch.pop();
}

function keyPressed() {
    switch (key) {
        case "c":
            pMapper.toggleCalibration();
            break;
        case "f":
            let fs = fullscreen();
            fullscreen(!fs);
            break;
        case "l":
            pMapper.load("maps/map.json");
            break;
        case "s":
            pMapper.save("map.json");
            break;
    }
}