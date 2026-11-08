let capture; 
let prevPixels = []; 
let motionThreshold = 1300000; 
let shapeSelect = 0;

    // let stepSize = 20; // size of "pixels" to draw

async function setup() {
    createCanvas(windowWidth, windowHeight);
    drawingContext.willReadFrequently = true; // optimize for pixel manipulation
    pixelDensity(1);

    // start video grabber
    capture = await createCapture(VIDEO, { flipped: true });
    capture.size(640, 480);
    capture.hide(); // hide HTML video
}

function draw() {
    background(20);
    capture.loadPixels();

    let offsetX = (width - capture.width) / 2;
    let offsetY = (height - capture.height) / 2;
    translate(offsetX, offsetY);    
    let totalMotion = 0;

    if(capture.pixels.length > 0) {
        if(prevPixels.length === capture.pixels.length) {
            for(let i = 0; i < capture.pixels.length; i += 4) {
                let diffR = abs(capture.pixels[i] - prevPixels[i]);
                let diffG = abs(capture.pixels[i + 1] - prevPixels[i + 1]);
                let diffB = abs(capture.pixels[i + 2] - prevPixels[i + 2]);
                totalMotion += diffR + diffG + diffB;
            }
        }

        prevPixels = Array.from(capture.pixels);

        if(totalMotion > motionThreshold) {
            image(capture, 0, 0);
            // let stepSize = floor(map(mouseX, 0, width, 15, 50, true));
            let stepSize = floor(map(mouseX, 0, width, 15, 50, true));
            // let padding = 2;
            let padding = map(mouseY, 0, height, 1, 8, true);
            noStroke();

            if(shapeSelect === 0) {
                let size = stepSize - padding;
                // noStroke();

                for(let y = 0; y < capture.height; y += stepSize) {
                    for(let x = 0; x < capture.width; x += stepSize) {
                        let i = (y * capture.width + x) * 4;
                        fill(capture.pixels[i], capture.pixels[i + 1], capture.pixels[i + 2]);
                        rect(
                            x + padding / 2, y + padding / 2, 
                            size, size
                        );
                    }
                }
             } else if(shapeSelect === 1) {
                let vertSpace = stepSize * 0.5;
                let diaRad = (stepSize / 2) - (padding / 2);

                let numRows = ceil(capture.height / vertSpace) + 2;
                let numCols = ceil(capture.width / stepSize) + 2;

                for(let row = -1; row < numRows; row++) {
                    let cy = row * vertSpace + vertSpace / 2;
                    let xOff = (Math.abs(row) % 2 === 1) ? stepSize / 2 : 0;

                    for(let col = -1; col < numCols; col++) {
                        let cx = col * stepSize + stepSize / 2 + xOff;

                        if(cx >= -stepSize / 2 && 
                            cx <= capture.width + stepSize / 2 && 
                            cy >= -vertSpace && 
                            cy <= capture.height + vertSpace) {
                                let sampleX = constrain(floor(cx), 0, capture.width - 1);
                                let sampleY = constrain(floor(cy), 0, capture.height - 1);
                                let sampleIndex = (sampleY * capture.width + sampleX) * 4;

                                fill(capture.pixels[sampleIndex], capture.pixels[sampleIndex + 1], capture.pixels[sampleIndex + 2]);
                                quad(
                                    cx, cy - diaRad,
                                    cx + diaRad, cy,
                                    cx, cy + diaRad,
                                    cx - diaRad, cy
                                );
                         }
                    }
                }
            } else if(shapeSelect === 2) {
                let hexRad = stepSize / 2;
                let horizSpace = hexRad * 3;
                let vertSpace = hexRad * (Math.sqrt(3) / 2);
                let hexRad2 = hexRad - (padding / 2);
                
                let numRows = ceil(capture.height / vertSpace) + 2;
                let numCols = ceil(capture.width / horizSpace) + 2;
                // let row = 0;

                for(let row = -1; row < numRows; row++) {
                    let cy = row * vertSpace;
                    let xOff = (Math.abs(row) % 2 === 1) ? 1.5 * hexRad : 0;

                    for(let col = -1; col < numCols; col++) {
                        let cx = col * horizSpace + xOff;
                        
                        if(cx >= -hexRad &&
                            cx <= capture.width + hexRad &&
                            cy >= -hexRad &&
                            cy <= capture.height + hexRad
                        ){
                            let sampleX = constrain(floor(cx), 0, capture.width - 1);
                            let sampleY = constrain(floor(cy), 0, capture.height - 1);
                            let hexIndex = (sampleY * capture.width + sampleX) * 4;

                            fill(capture.pixels[hexIndex], capture.pixels[hexIndex + 1], capture.pixels[hexIndex + 2]);
                            drawHexagon(cx, cy, hexRad2);
                        }
                    }
                } 
            } else {
                image(capture, 0, 0);
            }
        }
    }
}

function drawHexagon(x, y, r) {
    beginShape();
    for(let i = 0; i < TWO_PI; i += TWO_PI / 6) {
            let vx = x + Math.cos(i) * r;
            let vy = y + Math.sin(i) * r;
            vertex(vx, vy);
    }
    endShape(CLOSE);
}

// red`ra`w when viewport is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// fullscreen
function keyPressed() {
  switch (key) {
    case "f":
      let fs = fullscreen();
      // if we are currently in fs, go back
      // if not, go big
      fullscreen(!fs);
      break;
  }

  if(key === "1") {
    shapeSelect = 0;
  } else if(key === "2") {
    shapeSelect = 1;
  } else if(key === "3") {
    shapeSelect = 2;
  }
}