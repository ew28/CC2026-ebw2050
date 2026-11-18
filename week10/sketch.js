let mainCanvas;
let port;
let connectButton;
let sample;
let analyzer;

let images = [];
let imageIndex;
let imageScale = 1.0;
let wiggle = 0;

let bg;
let bgColor;
// let currPitchCol;

let numArduinoVals = 5;
let arduinoVals = [];
let prevVals = [0, 0, 0, 0, 0];
let currLever = -1;
let leverFunctions = [];

let rings = [];
let currRingCol;

let basePitch = 1.0;
let livePitch = 1.0;
let activeLever = -1;

async function setup() {
    mainCanvas = createCanvas(800, 600);
    mainCanvas.elt.style.borderRadius = '14px'
    // mainCanvas.elt.style.position = 'relative';
    // mainCanvas.elt.style.zIndex = '2';

    bgCanvas = createGraphics(windowWidth, windowHeight);
    document.body.appendChild(bgCanvas.elt);

    port = createSerial();

    connectButton = createButton('CONNECT ARDUINO');
    connectButton.position(20, 20);
    connectButton.style('z-index', '10');
    connectButton.style('background-color', '#EEEEEE');
    connectButton.style('color', '#1c1b24');
    connectButton.style('border', '1px solid #383648');
    connectButton.style('padding', '8px 16px');
    connectButton.style('font-family', 'sans-serif');
    // connectButton.style('letter-spacing', '1px');
    connectButton.style('border-radius', '6px');
    connectButton.style('cursor', 'pointer');
    connectButton.mousePressed(connectPort);

    // let usedPorts = usedSerialPorts();
    // if(usedPorts.length > 0) {
    //     port.open(usedPorts[0], 9600);
    // }

    [sample, images] = await Promise.all([
        loadSound('assets/meow.mp3'),
        Promise.all([
            loadImage('assets/cat0.png'),
            loadImage('assets/cat1.png'),
            loadImage('assets/cat2.png'),
            loadImage('assets/cat3.png'),
            loadImage('assets/cat4.png')
        ])
    ]);

    analyzer = new p5.Amplitude();
    if(sample) {
        sample.connect(analyzer);

        sample.onended(() => {
            if(activeLever >= 0 && arduinoVals[activeLever] === 1) {
                sample.rate(basePitch * livePitch);
                sample.play();
            }
        });
    }
    // sample.connect(analyzer);

    bg = color(20, 15, 35);
    bgColor = color(20, 15, 35);
    // currPitchCol = color(255, 99, 71);

    leverFunctions = [
        lever0,
        lever1,
        lever2,
        lever3,
        lever4
    ];
}

function windowResized() {
    if(bgCanvas) {
        bgCanvas.resizeCanvas(windowWidth, windowHeight);
    }
}

function connectPort() {
    userStartAudio();
    
    if(!port.opened()) {
        port.open(9600);
    }
}

function draw() {
    // background(currentBG);
    bgColor = lerpColor(bgColor, bg, 0.15);
    background(bgColor);

    // bgCanvas.background(bgColor);

    let level = analyzer.getLevel();

    let livePitch = map(mouseX, 0, width, 0.8, 1.2, true);
    // let vol = map(mouseY, 0, height, 1.0, 0.1, true);
    console.log("playing: ", sample ? sample.isPlaying() : "no sample");

    if(sample && sample.isPlaying()) {
        sample.rate(basePitch * livePitch);

        let vol = map(mouseY, 0, height, 1.0, 0.1, true);
        sample.amp(vol);

        if(frameCount % 10 === 0) {
            rings.push({ r:20, alpha: 255, col: currRingCol });
            // rings.push({ r:50, alpha: 200, col: currRingCol });
        }
    }

    let r = floor(red(bgColor));
    let g = floor(green(bgColor));
    let b = floor(blue(bgColor));
    // document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    let blurRadius1 = map(level, 0, 0.4, 25, 60, true);
    let blurRadius2 = map(level, 0, 0.4, 70, 160, true);
    let gSpread = map(level, 0, 0.4, 15, 50, true);
    // let gAlpha = map(level, 0, 0.4, 0.4, 0.85, true);

    if(mainCanvas && mainCanvas.elt) {
        // mainCanvas.elt.style.boxShadow = `0px 0px ${blurRadius}px ${gSpread}px rgba(${r * 2.5}, ${g * 2.5}, ${b * 2.5}, ${gAlpha})`;
        let glowR = min(255, r * 3.2);
        let glowG = min(255, g * 3.2);
        let glowB = min(255, b * 3.2);

        mainCanvas.elt.style.boxShadow = `
            0px 0px ${blurRadius1}px 10px rgba(${glowR}, ${glowG}, ${glowB}, 0.85),
            0px 0px ${blurRadius2}px ${gSpread}px rgba(${glowR}, ${glowG}, ${glowB}, 0.45)
        `;
    }

    // bgCanvas.background(bgColor);

    if(port.opened()) {
        while(port.available() > 0){
            let rawData = port.readUntil("\n");
            if(!rawData) break;
            let line = rawData.trim();
            if(line.length === 0) continue;
            
            // if(rawData && rawData.trim().length > 0) {
            //     let parsed = rawData.trim().split(',').map(Number);

            let parsed = line.split(',').map(Number);

            if(parsed.length === numArduinoVals && !parsed.some(isNaN)){
                arduinoVals = parsed;
                processArduinoVals(arduinoVals);
            }
        }
    }

    // let level = analyzer.getLevel();

    push();
    translate(width / 2, height /2);
    noFill();

    // bgCanvas.push();
    // bgCanvas.translate(bgCanvas.width / 2, bgCanvas.height / 2);
    // bgCanvas.noFill();

    for(let i = rings.length - 1; i >= 0; i--) {
        let ring = rings[i];

        // ring.r += 4.5 + level * 10;
        ring.r += (3.0 * livePitch) + level * 10;
        ring.alpha -= 2.0;

        // ringColor = color(red(ring.col), green(ring.col), blue(ring.col), ring.alpha);
        let ringR = ring.col ? red(ring.col) : 255;
        let ringG = ring.col ? green(ring.col) : 107;
        let ringB = ring.col ? blue(ring.col) : 107;

        stroke(ringR, ringG, ringB, ring.alpha);
        strokeWeight(map(ring.alpha, 255, 0, 4, 0.5));
        ellipse(0, 0, ring.r, ring.r);

        if(ring.alpha <= 0) {
            rings.splice(i, 1);
        }
    }
    // bgCanvas.pop();
    pop();

    if(images.length > 0 && images[imageIndex]) {
        let current = images[imageIndex];

        let target = 35000;
        let area = current.width * current.height;

        let scale = Math.sqrt(target / area);

        let drawW = current.width * scale;
        let drawH = current.height * scale;

        // let maxBB = 260;
        // let drawW, drawH;

        // if(current.width > current.height) {
        //     drawW = maxBB;
        //     drawH = maxBB * (current.height / current.width);
        // } else {
        //     drawW = maxBB * (current.width / current.height);
        //     drawH = maxBB;
        // }
        imageScale = lerp(imageScale, 1.0, 0.06);
        wiggle = lerp(wiggle, 0, 0.06);

        push();
        translate(width / 2, height / 2)
        rotate(sin(frameCount * 0.25) * wiggle);
        imageMode(CENTER);
        image(current, 0, 0, drawW * imageScale, drawH * imageScale);
        pop();
    }

    fill(160);
    noStroke();
    textSize(13);
    textFont('sans-serif');
    text("Serial Data: " + (arduinoVals.length > 0 ? arduinoVals.join(" | ") : "STANDBY"), 20, height - 25);
}

function processArduinoVals(arduinoVals) {
    for(let i = 0; i < arduinoVals.length; i++) {
        if(prevVals[i] === 0 && arduinoVals[i] === 1) {
            if (leverFunctions[i]) {
                leverFunctions[i]();
            }
            if(prevVals[i] === 1 && arduinoVals[i] === 0){
                stopLever(i);
            }
        }
        prevVals[i] = arduinoVals[i];
    }
}

function triggerLever(index, pitch, bgCol, rCol, w) {
    imageIndex = index;
    basePitch = pitch;
    activeLever = index;
    currRingCol = rCol;

    // let pitchBend = map(mouseX, 0, width, 0.5, 2.0, true);

    if(sample) {
        sample.stop();
        sample.rate(basePitch * livePitch);
        sample.play();
    }

    bg = bgCol;
    // currPitchCol = rCol;
    imageScale = 1.25;
    wiggle = w;

    // rings.push({r: 50, alpha: 255, col: rCol});
    // rings.push({r: 110, alpha: 200, col: rCol});
}

function stopLever(index) {
    if(index === activeLever) {
        activeLever = -1;
        if(sample) {
            sample.stop();
        }
    }
}

function lever0() { triggerLever(0, 0.5, color(38, 12, 55), color(255, 85, 120), 0.1); }

function lever1() { triggerLever(1, 0.75, color(10, 42, 55), color(255, 205, 40), 0.2); }

function lever2() { triggerLever(2, 1.0, color(12, 45, 32), color(50, 240, 200), 0.3); }

function lever3() { triggerLever(3, 1.25, color(50, 16, 60), color(0, 255, 255), 0.4); }

function lever4() { triggerLever(4, 1.5, color(45, 10, 35), color(255, 40, 160), 0.5); }