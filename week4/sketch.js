let midH;
let midW;

let numHex = 10;
let numHexVert = 8;

let angle;
let xPos;
let yPos;
let radius = 28.8;
let r2 = radius;

let seed = 3733;
// let seed = 7718;

let doExport = false;

function setup() { 
    createCanvas(576, 400);
    midH = height / 2;
    midW = width / 2;
    xPos = radius;
    yPos = radius;

    // seed = 6564;
    // seed = 3733
    // seed = 7718;
    // seed = 6452;
    // seed = floor(random(8000));
    noiseSeed(seed);
}

function keyPressed(){
    if(key == "s"){
        // background(0);
        doExport = true;
    }
}

function hexagon(x, y, r){
    // strokeWeight(2);
    angle = TWO_PI / 6 / 2;
    beginShape();
    for(let j = 0; j < 6; j++){
        push();
        // vertex(x + (r + noise(j * 0.2)) * Math.cos(angle), y + (r + noise(j * 0.2)) * Math.sin(angle));
        vertex(x + r * Math.cos(angle), y + r * Math.sin(angle));
        angle += TWO_PI / 6;
        pop();
    }
    endShape(CLOSE);
}

function buildGrid(x, y, r){
    strokeWeight(2);
    for(let i = 0; i < numHex; i++){
        // r2 = r;
        x = map(i, 0, numHex, r, width);
        // r2 = r;
        for(let j = 0; j < numHexVert; j++){
            y = map(j, 0, numHexVert, r, height);
            r2 *= 0.5 + noise(i * 1000);
            if(j % 2 === 0){
                // hexagon(x + r, y, r * noise(j * 0.2));
                hexagon(x + r2, y, r2);
            } else {
            // hexagon(x, y, r * noise(j * 0.2));
            hexagon(x, y, r2);
            } 
        }
        // r2 *= noise(i * 0.2);
        r2 = r;
    }
}

function draw() {
    if(doExport){
        beginRecordSvg("myPlot.svg");
    }

    noFill();
    buildGrid(xPos, yPos, radius);
    // noLoop();

    if(doExport){
        endRecordSvg();
        doExport = false;
    }
}
