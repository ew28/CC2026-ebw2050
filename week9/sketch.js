let video;
let handPose;
let hands = [];

let smooth = null;
let start = null;
let prevX = null;

let leftThreshold = 15;
let rightThreshold = 15;
let delay = 11;

let swipe = false;

const fingerTips = [
    // 'thumb_tip',
    'index_finger_tip',
    'middle_finger_tip',
    'ring_finger_tip',
    // 'pinky_finger_tip'
];

let prevPixels = [];
let motionThreshold = 1300000;
let shapeSelect = 0;

async function setup() {
    createCanvas(windowWidth, windowHeight);

    drawingContext.willReadFrequently = true;
    pixelDensity(1);

    video = await createCapture(VIDEO, { flipped: true });
    video.size(800, 600);
    video.hide();

    handPose = await ml5.handPose();
    handPose.detectStart(video, gotHands);
}

function averageX(hand) {
    let sum = 0;
    for(let tip of fingerTips) {
        sum += hand[tip].x;
    }
    return sum / fingerTips.length;
}

function draw() {
    background(0);

    video.loadPixels();

    xOff = (width - video.width) / 2;
    yOff = (height - video.height) / 2;

    translate(xOff, yOff);
    image(video, 0, 0);

    prevPixels = Array.from(video.pixels);
    
    let stepSize = 25;
    let padding = 4;
    noStroke();

    if(hands.length > 0) {
        let rawX = averageX(hands[0]);

        if(smooth === null) {
            smooth = rawX
            start = rawX;
            prevX = rawX;
            return;
        }
        smooth = lerp(smooth, rawX, 0.2);
        let xDiff = smooth - start;
        let speed = abs(smooth - prevX);

        
        if(!swipe){
            if(isRight(xDiff)) {
                // background(255, 0, 0);
                shapeSelect++;
                if(shapeSelect > 2){
                    shapeSelect = 0;
                }
                console.log("swipe right delta", xDiff, " select: ", shapeSelect);

                swipe = true;
            } else if(isLeft(xDiff)) {
                // background(0, 0, 255);
                shapeSelect--;
                if(shapeSelect < 0){
                    shapeSelect = 2;
                }
                console.log("swipe left delta", xDiff, " select: ", shapeSelect);
                swipe = true;
            }
        }

        if(speed < delay) {
            start = smooth;
            swipe = false;
        }

        prevX = smooth;

    } else {
        smooth = null;
        start = null;
        prevX = null;
        swipe = false;
    }

    // video.load.pixels();
    
    if(shapeSelect === 0) {
        rectangles(stepSize, padding);
    } else if(shapeSelect === 1) {
        diamonds(stepSize, padding);
    } else if(shapeSelect === 2) {
        hexagons(stepSize, padding);
    }
}

function gotHands(results) {
    hands = results;
}

function isRight(xDiff) {
    return xDiff < -rightThreshold;
}

function isLeft(xDiff) {
    return xDiff > leftThreshold;
}

function rectangles(stepSize, padding) {
    let size = stepSize - padding;

    // video.loadPixels();

    for(let y = 0; y < video.height; y += stepSize){
        for(let x = 0; x < video.width; x += stepSize){
            let i = (y * video.width + x) * 4;
            fill(video.pixels[i], video.pixels[i + 1], video.pixels[i + 2]);
            rect(
                x + padding / 2, y + padding / 2,
                size, size
            );           
        }
    }
}

function diamonds(stepSize, padding) {
    let vertSpace = stepSize * 0.5;
    let diaRad = (stepSize / 2) - (padding / 2);

    let numRows = ceil(video.height / vertSpace) + 2;
    let numCols = ceil(video.width / stepSize) + 2;

    for(let row = -1; row < numRows; row++) {
        let cy = row * vertSpace + vertSpace / 2;
        let xOff = (Math.abs(row) % 2 === 1) ? stepSize / 2 : 0;

        for(let col = -1; col < numCols; col++) {
            let cx = col * stepSize + stepSize / 2 + xOff;

            if(cx >= -stepSize / 2 &&
                cx <= video.width + stepSize / 2 &&
                cy >= -vertSpace &&
                cy <= video.height + vertSpace) {
                    let sampleX = constrain(floor(cx), 0, video.width - 1);
                    let sampleY = constrain(floor(cy), 0, video.height - 1);
                    let sampleIndex = (sampleY * video.width + sampleX) * 4;

                    fill(video.pixels[sampleIndex], video.pixels[sampleIndex + 1], video.pixels[sampleIndex + 2]);
                    quad(
                        cx, cy - diaRad,
                        cx + diaRad, cy,
                        cx, cy + diaRad,
                        cx - diaRad, cy
                    );
            }
        }
    }
}

function hexagons(stepSize, padding) {
    let hexRad = stepSize / 2;
    let horizSpace = hexRad * 3;
    let vertSpace = hexRad * (Math.sqrt(3) / 2);
    let hexRad2 = hexRad - (padding / 2);

    let numRows = ceil(video.height / vertSpace) + 2;
    let numCols = ceil(video.width / horizSpace) + 2;

    for(let row = -1; row < numRows; row++){
        let cy = row * vertSpace;
        let xOff = (Math.abs(row) % 2 === 1) ? 1.5 * hexRad : 0;

        for(let col = -1; col < numCols; col++){
            let cx = col * horizSpace + xOff;

            if(cx >= -hexRad &&
                cx <= video.width + hexRad &&
                cy >= -hexRad &&
                cy <= video.height + hexRad
            ){
                let sampleX = constrain(floor(cx), 0, video.width - 1);
                let sampleY = constrain(floor(cy), 0, video.height - 1);
                let sampleIndex = (sampleY * video.width + sampleX) * 4;

                fill(video.pixels[sampleIndex], video.pixels[sampleIndex + 1], video.pixels[sampleIndex + 2]);
                drawHexagons(cx, cy, hexRad2);
            }
        }
    }     
}

function drawHexagons(x, y, r) {
    beginShape();
    for(let i = 0; i < TWO_PI; i += TWO_PI / 6) {
        let vx = x + Math.cos(i) * r;
        let vy = y + Math.sin(i) * r;
        vertex(vx, vy);
    }
    endShape(CLOSE);
}

