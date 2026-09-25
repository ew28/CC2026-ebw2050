let numTri = 25;
let numTriTwo = 26;
let numTriVert = 9;
let squareSize = 50;
let squareSizeA = squareSize;
let squareSizeB = squareSize;
let distanceX = 100;
let distanceY = 50;
let angle = 45;
let r;
let g;

let colorFactor = 255 / numTri;
let rand;

let squareWidth = Math.hypot(squareSize, squareSize);

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    rectMode(CENTER);
    angleMode(DEGREES);
}

function draw() {
    // noLoop();
    noFill();
    background(0);
    strokeWeight(1.5);
    r = map(mouseX, 0, width, 0, 100);
    g = map(mouseY, 0, height, 0, 100);
    // background(r, g, r + g);
    for(let i = 0; i < numTriVert; i++){
        distanceY = map(i, 0, numTriVert, 0, height);
        for(let j = 0; j < numTriTwo; j++){
            distanceX = map(j, 0, numTri, 0, width);
            stroke((r * j), (g * i), 255 - (r + g + j));
            for(let k = 0; k < 5; k++){
                if(j % 2 == 0){
                    push();
                    translate(distanceX + (squareWidth / 2), distanceY + (squareWidth / 2));
                    rotate(angle);
                    squareSizeA = squareSize * i / 9;
                    // rect(0, 0, squareSize * i / 25 , squareSize * i / 25);
                    rect(0, 0, squareSizeA / (k + 0.9) , squareSizeA / (k + 0.9));  
                    // rect(0, 0, squareSizeA, squareSizeA);
                    pop();                  
                } else {
                    push();
                    translate(distanceX, distanceY);
                    rotate(angle);
                    squareSizeB = squareSize - (squareSize * i / 8);
                    rect(0, 0, squareSizeB / (k + 0.9) , squareSizeB / (k + 0.9));
                    pop();                    
                }
                // angle += 0.6;
            }
        }
    }
}