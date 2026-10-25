
let nightTop, nightBottom;
let dayTop, dayBottom;

// let  bottom = 380;
// let bottom = bottom - 25;

let bottom;
// let bottom;

let prevMin = -1;
let ants = [];

let prevSec = -1;
let raindrops = [];
let ripples = [];

let flows = [];
let petals = [];

let numPetals = 6;
// let petalSize = 60;
// let origX;
// let origY;
// let fell;

function setup() {
    createCanvas(800, 400);

    nightTop = color(10, 15, 45);
    nightBottom = color(45, 30, 70);

    dayTop = color(70, 140, 240);
    dayBottom = color(200, 255, 255);

    bottom = height - 80;
    // bottom = bottom;

    flower(150, 80);
    flower(300, 150);
    flower(450, 65);
    flower(600, 200);
    // noLoop();
}

function draw() {
    sky();
    ground();

    for(let f of flows){
        stem(f);
    }

    updatePet();

    for(let p of petals){
        makePet(p);
    }

    for(let f of flows){
        pistil(f);
    }

    createRain();
    rainfall();
    createRip();

    createAnts();
    moveAnts();
    // spawnAnt();

    // x = width / 2;
    // y = height / 2;
    // flower(x, y, numPetals, petalSize);
}

function sky(){
    // background(0, 0, 50);
    // let time = hour() + minute() / 60;
    // let day = 1 - abs(t - 12) / 12;
    // want to use lerp to draw horizontal sky gradient
    let h = hour();
    let dayFraction = map(h, 0, 23, 0, 1);
    
    let currentTop = lerpColor(nightTop, dayTop, dayFraction);
    let currentBottom = lerpColor(nightBottom, dayBottom, dayFraction);

    for(let y = 0; y < height; y++){
        let amt = map(y, 0, height, 0, 1);
        let c = lerpColor(currentTop, currentBottom, amt);
        stroke(c);
        line(0, y, width, y);   
    }
}

function createRain(){
    let currentSec = millis();
    if(currentSec != prevSec){
        raindrops.push({
            xPos: random(width), yPos: 0,
            speed: random(4, 7),
            size: random(10, 22), weight: random(2, 4),
            endFall: random(bottom + 20, height - 10)
        });
        prevSec = currentSec;
    }
}

function rainfall(){
    stroke(200, 255, 255);
    for(let i = raindrops.length - 1; i >= 0; i--){
        let r = raindrops[i];
        r.yPos += r.speed;

        if(r.yPos + r.size >= r.endFall){
            ripples.push({
                xPos: r.xPos, yPos: r.endFall,
                size: 2, alpha: 255
            });
            raindrops.splice(i, 1);
            continue;
        }

        strokeWeight(r.weight);
        // strokeWeight(6);
        line(r.xPos, r.yPos, r.xPos, r.yPos + r.size);
    }
}

function createRip(){
    noFill();
    strokeWeight(2);
    for(let i = ripples.length - 1; i >= 0; i--){
        let rip = ripples[i];
        rip.size += 1.5;
        rip.alpha -= 5;

        if(rip.alpha <= 0){
            ripples.splice(i, 1);
            continue;
        }

        stroke(200, 255, 255, rip.alpha);
        ellipse(rip.xPos, rip.yPos, rip.size, rip.size * 0.3);
    }
}

// function createAnts(){
//     let currentMin = minute();
//     if(currentMin != prevMin){
//         let antGroup = floor(currentMin / 5);
//         let noGroup = currentMin % 5;

//         for(let i = 0; i < antGroup; i++){
//             ants.push({
//                 xPos: random(-300, -60), yPos: random(bottom + 25, height - 12),
//                 speed: random(0.4, 0.8), step: random(TWO_PI),
//                 holder: true
//             });
//         }

//         for(let i = 0; i < noGroup; i++){
//             ants.push({
//                 xPos: random(-300, 0), yPos: random(bottom + 25, height - 12),
//                 speed: random(0.5, 1.5), step: random(TWO_PI),
//                 holder: false
//             });
//         }
//         prevMin = currentMin;
//     }
// }

function createAnts(){
    let currentMin = minute();
    if(currentMin != prevMin){
        for(let i = 0; i < currentMin; i++){
            ants.push({
                xPos: -random(0, 300), yPos: random(bottom + 25, height - 12),
                speed: random(0.5, 1.5), step: random(TWO_PI)
            })
        }
        prevMin = currentMin;
    }
}

// function moveAnts(){
//     for(let i = ants.length - 1; i >= 0; i--){
//         ants[i].xPos += ants[i].speed;
//         ants[i].step += 0.2;

//         if(ants[i].xPos > width + 60){
//             ants.splice(i, 1);
//         }
//     }
// }

function moveAnts(){
    for(let i = ants.length - 1; i >= 0; i--){
        let a = ants[i];
        a.xPos += a.speed;
        a.step += a.speed * 0.6;

        if(a.xPos > width + 20){
            ants.splice(i, 1);
        } else{
            spawnAnt(a);
        }
    }
}

// function spawnAnt(a){
//     for(let a of ants){
//         push();
//         translate(a.xPos, a.yPos);

//         if(a.holder){
//             holderGroup(a.step);
//         } else{
//             singleAnt(a.step);
//         }
//         pop();
//     }
// }

function spawnAnt(a){
    push();
    translate(a.xPos, a.yPos);

    stroke(30, 20, 15);
    strokeWeight(1.5);
    for(let i = 0; i < 3; i++){
        let legX = (i - 1) * 5;
        let wiggle = sin(a.step + i * 8) * 3;
        line(legX, 0, legX + wiggle, 6);
        line(legX, 0, legX - wiggle, -6);
    }

    noStroke();
    fill(40, 25, 20);
    ellipse(-7, 0, 9, 6) //abdomen
    ellipse(0, 0, 6, 5); //thorax
    ellipse(6, 0, 5, 5); //head
    pop();
}

function holderGroup(step){
    for(let i = 0; i < 5; i++){
        push();
        translate((i - 2) * 12, 0);
        singleAnt(step + i);
        pop();
    }
}

function singleAnt(step){
    stroke(30, 20, 15);
    strokeWeight(1.5);
    for(let i = 0; i < 3; i++){
        let legX = (i - 1) * 5;
        let wiggle = sin(step + i * 8) * 3;
        line(legX, 0, legX + wiggle, 6);
        line(legX, 0, legX - wiggle, -6);
    }

    noStroke();
    fill(40, 25, 20);
    ellipse(-7, 0, 9, 6); //abdomen
    ellipse(0, 0, 6, 5); //thorax
    ellipse(6, 0, 5, 5);
}

function ground(){
    noStroke();
    fill(110, 80, 50);
    rect(0, bottom, width, height - bottom);
    fill(70, 150, 70);
    rect(0, bottom, width, 14);
}

function flower(xPos, yPos){
    flows.push({ flowX: xPos, flowY: yPos, leafPos: random(100) });

    for(let i = 0; i < numPetals; i++){
        let angle = (TWO_PI / 6) * i;
        let petX = xPos + cos(angle) * 40;
        let petY = yPos + sin(angle) * 40;
        petals.push({
            origX: petX, origY: petY,
            petX: petX, petY: petY,
            angle: angle,
            swooshWidth: 25, swooshSpeed: 0.03,
            offset: cos(petX),
            fell: false
        });
    }
}

function stem(f){
    stroke(50, 130, 50);
    strokeWeight(6);
    line(f.flowX, f.flowY, f.flowX, bottom);
    // rect(100, 100, 100);

    noStroke();
    fill(60, 150, 60);
    push();
    translate(f.flowX + 18,  bottom - f.leafPos);
    rotate(-0.5);
    ellipse(0, 0, 36, 14);
    pop();
}

function pistil(f){
    noStroke();
    fill(250, 210, 60);
    ellipse(f.flowX, f.flowY, 26, 26);
}

function updatePet(){
    let hPass = hour();
    for(let i = 0; i < petals.length; i++){
        let p = petals[i];
        p.fell = i < hPass;

        if(p.fell && p.petY < bottom){
            p.petY += 1.5;
            p.petX = p.origX + sin(p.petY * p.swooshSpeed + p.offset) * p.swooshWidth;
        } else if(!p.fell){
            p.petX = p.origX;
            p.petY = p.origY;
        }
    }
}

function makePet(p){
    push();
    translate(p.petX, p.petY);
    rotate(p.angle);
    noStroke();
    // fill(255, 105, 180);
    // fill(p.fell ? colorFactor(200, 105, 200) : colorFactor(255, 150, 200));
    if(p.petY >= bottom - 10){
        fill(120, 100, 130, 180);
    } else{
        fill(255, 150, 200);
    }
    ellipse(0, 0, 50, 20);
    pop();
}
