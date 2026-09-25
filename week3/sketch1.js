// let numTri = 24;
// let numTriVert = 14
// let squareSize = 50;
// let distanceX = 50;
// let distanceY = 100;

let numTri = 25;
let numTriTwo = 26;
let numTriVert = 18;
let squareSize = 50;
let squareSizeA = squareSize;
let squareSizeB = squareSize;
let distanceX = 50;
let distanceY = 100;
let angle = 45;

let colorFactor = 255 / numTri;
let rand;

let squareWidth = Math.hypot(squareSize, squareSize);

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    // strokeWeight(0.5);
    // degreeMode = DEGREES;
    rectMode(CENTER);
    angleMode(DEGREES);
    // push();
    // translate(0, 0);
    // rotate(PI / 4);
    // rect(squareWidth, squareWidth, squareSize, squareSize);
    // pop();
}

function draw() {
    noLoop();
    // for (let i = 0; i < numTriTwo; i++) {
    //     distanceX = map(i, 0, numTri, 0, width);
    //     for(let j = 0; j < numTriVert; j++) {
    //         distanceY = map(j, 0, numTriVert, 0, height);
    //         fill(colorFactor * i, colorFactor * j, 255 - (colorFactor * i));
    //         for (let k = 0; k < 4; k++) {
    //             if(j % 2 === 0) {
    //                 push();
    //                 translate(distanceX + (squareWidth / 2), distanceY + (squareWidth / 2));
    //                 rotate(PI / 4);
    //                 rect(0, 0, squareSize / (k + 1), squareSize / (k + 1));
    //                 pop();
    //             } else {
    //                 push();
    //                 translate(distanceX, distanceY);
    //                 rotate(PI / 4);
    //                 rect(0, 0, squareSize / (k + 1), squareSize / (k + 1));
    //                 pop();
    //             }
    //         }
    //     }
    // }
    for (let i = 0; i < numTriTwo; i++) {
        distanceX = map(i, 0, numTri, 0, width);
        for(let j = 0; j < numTriVert; j++) {
            distanceY = map(j, 0, numTriVert, 0, height);
            // fill(colorFactor * i, colorFactor * j, 255 - (colorFactor * i));
            for(let k = 0; k < 5; k++){
                strokeWeight(2);
                stroke(colorFactor * i, colorFactor * j, 255 - colorFactor * i);
                noFill();
                if(j % 2 === 0) {
                    push();
                    translate(distanceX + (squareWidth / 2), distanceY + (squareWidth / 2));
                    rotate(angle);
                    squareSizeA = squareSize * i / 24
                    // rect(0, 0, squareSize * i / 25 , squareSize * i / 25);
                    rect(0, 0, squareSizeA / (k + 0.9) , squareSizeA / (k + 0.9));
                    pop();
                } else {
                    push();
                    translate(distanceX, distanceY);
                    rotate(angle);
                    squareSizeB = squareSize - (squareSize * i / 25);
                    // rect(0, 0, squareSize - (squareSize * i / 25), squareSize - (squareSize * i / 25));
                    // strokeWeight(0.3)
                    // stroke(255);
                    rect(0, 0, squareSizeB / (k + 0.9) , squareSizeB / (k + 0.9));
                    pop();
                }
                angle += 0.1;
            }
        }
    }
// }

    // for (let i = 0; i < numTriTwo; i++) {
    //     distanceX = map(i, 0, numTri, 0, width);
    //     for(let j = 0; j < numTriVert; j++) {
    //         distanceY = map(j, 0, numTriVert, 0, height);
    //         fill(colorFactor * i, colorFactor * j, 255 - (colorFactor * i));
    //         for(let k = 0; k < 3; k++){
    //             if(j % 2 === 0) {
    //                 push();
    //                 translate(distanceX + (squareWidth / 2), distanceY + (squareWidth / 2));
    //                 rotate(angle);
    //                 rect(0, 0, squareSize * i / 25 , squareSize * i / 25);
    //                 pop();
    //             } else {
    //                 push();
    //                 translate(distanceX, distanceY);
    //                 rotate(angle);
    //                 rect(0, 0, squareSize - (squareSize * i / 25), squareSize - (squareSize * i / 25));
    //                 pop();
    //             }
    //             angle += 0.5;
    //         }
    //     }
    // }
}

    
//     for (let i = 0; i < numTriTwo; i++) {
//         distanceX = map(i, 0, numTri, 0, width);
//         for(let j = 0; j < numTriVert; j++) {
//             distanceY = map(j, 0, numTriVert, 0, height);
//             push();
//             translate(distanceX, distanceY + 5);
//             rotate(PI / 4);
//             rect(squareWidth, squareWidth, squareSize, squareSize);
//             pop();
//         }
//     }
// }
