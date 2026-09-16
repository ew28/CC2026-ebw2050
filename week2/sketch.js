let cenW;
let cenH;

// variables for starry
let starList = [];
let starX = [];
let starY = [];
let starSize = [];
let numStars = 1000;
let horizon;
let stumpW = 40;
let triX;
let triXTwo;
let maxStar = 5;
let minStar = 1;
let starGrowth = [];
let rotDeg = 0;

// variables for sunny
let windSpeed = 3;
let cloudOneX = 0;
let cloudTwoX = 0;
let cloudThreeX = 0;
let cloudFourX = 0;
let cloudFiveX = 0;
let cloudSixX = 0;
let cloudSevenX = 0;
let cloudEightX = 0;
let cloudNineX = 0;

// variables for bubbles
let numBubbles = 20
let bubbleSize = [numBubbles]
let bubbleX = [numBubbles];
let bubbleY = [numBubbles];
let bubbleColor = [numBubbles];
let xSpeed = [numBubbles];
let ySpeed = [numBubbles];

// variables for rain drops
let numDrops = 100;
let dropX = [numDrops];
let dropY = [numDrops];
let dropSize = [numDrops];
let dropColor = [numDrops];
let dropXSpeed = [numDrops];
let dropYSpeed = [numDrops];

// variables for bounce
let size = 100;
let boxX = size / 2;
let boxY;
let movXRate = 7;
let movYRate = 7;

let choose;
//let selectList = [0, 1, 2, 3, 4, 5];

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

    background(18, 35, 59);
    cenW = windowWidth / 2;
    cenH = windowHeight / 2;

    // initializing stars
    for (i = 0; i < numStars; i++){
        starX[i] = random(0, windowWidth);
        starY[i] = random(0, windowHeight);
        starSize[i] = random(minStar, maxStar);
        starGrowth[i] = random(-0.5, 0.5);
    }

    //initializing bubbles
    for (i = 0; i < numBubbles; i++){
        bubbleX[i] = random(0, windowWidth);
        bubbleY[i] = random(0, windowHeight);
        bubbleSize[i] = random(50, 150);
        bubbleColor[i] = color(random(255), random(255), random(255), random(25, 200));

        xSpeed[i] = random(-5, 5);
        ySpeed[i] = random(-5, 5);
    }

    //initializing rain drops
    for (i = 0; i < numDrops; i++){
        dropX[i] = random(0, windowWidth);
        dropY[i] = random(0, windowHeight);
        dropSize[i] = random(20, 100);
        dropColor[i] = color(0, 0, random(255), random(50, 200));
        dropXSpeed[i] = random(1, 5);
        dropYSpeed[i] = random(1, 5);
    }

    //initializing bounce
    boxY = windowHeight - (size / 2);
}

function draw() {
    // for (i = 0; i < 20; i++){
    //     fill(random(0, 255), random(0, 255), random(0, 255), random(50, 200));
    //     circle(random(windowWidth, 0), random(0, windowHeight), random(50, 100));
    // }
    if (choose === 0){
        starrySky();
    }
    else if (choose === 1){
        sunRise();
    }
    else if (choose === 2){
        bubbles();
    }
    else if (choose === 3){
        rainDrops();
    }
    else if (choose === 4){
        bounce();
    }
}

function mousePressed() {
    choose = int(random(0, 5));
    console.log('choose');
}

function starrySky(){
    background(18, 35, 59);
    rectMode(CORNER);

    noStroke();
    fill(255);

    horizon = windowHeight * 3/5;
    triX = (200 + stumpW / 2);
    triXTwo = triX + 120;

    // for (i = 0; i < 100; i++){
    //     starList[i] = circle(random(0, windowWidth), random(0, windowHeight), random(minStar, maxStar));
    // }

    for (i = 0; i < numStars; i++){
        // fill(255);
        circle(starX[i], starY[i], starSize[i]);
        
        starSize[i] += starGrowth[i];
        
        if (starSize[i] > maxStar || starSize[i] < minStar){
            starGrowth[i] = -starGrowth[i];
        }
    }
    // console.log(starList);
    // noStroke();
    // rect(cenW, 0, cenW, windowHeight);
    // rect(0, cenH, windowWidth, cenH);

    push();
    translate(cenW, cenH);
    rotate(rotDeg);
    rotDeg -= 0.5;
    
    arc(windowWidth/5, cenH, 120, 120, 90, 270);
    // arc(x, y, w, h, start, stop, mode)
    pop();

    // push();
    // translate(200, 200);
    fill(20, 3, 0);
    rect(200, horizon - 20, stumpW, 20); // stump one
    rect(320, horizon - 20, stumpW, 40); // stump two
   
    fill(0, 10, 1);
    triangle(triX, horizon - 150, triX - 150, horizon - 20, triX + 150, horizon - 20); // bottom
    triangle(triX, horizon - 220, triX - 120, horizon - 110, triX + 120, horizon - 110); // middle
    triangle(triX, horizon - 270, triX - 80, horizon - 190, triX + 80, horizon - 190); // top

    triangle(triXTwo, horizon - 130, triXTwo - 100, horizon - 20, triXTwo + 100, horizon - 20);
    triangle(triXTwo, horizon - 170, triXTwo - 75, horizon - 80, triXTwo + 75, horizon - 80);
    triangle(triXTwo, horizon - 200, triXTwo - 50, horizon - 140, triXTwo + 50, horizon - 140);
    // pop();

    fill(5);
    rect(0, horizon, windowWidth, horizon);
}

function sunRise(){
    background(113, 167, 243);

    //cloudOneX = 

    noStroke();
    fill(255);

    push();
    translate(cloudOneX, 0);
    if(cloudOneX > (windowWidth - (cenW - 130))){
        cloudOneX = -(cenW + 130);
    }
    cloudOneX += windSpeed;
    // middle cloud
    ellipse(cenW, cenH, 100); // middle 
    ellipse(cenW - 35, cenH + 10, 140, 80); // left 
    ellipse(cenW + 35, cenH + 10, 110, 60); // right 
    ellipse(cenW - 20, cenH - 20, 90); // top left 
    ellipse(cenW + 20, cenH - 15, 65); // top right
    pop();
    // ellipse(x, y, w, h)

    push();
    translate(cloudTwoX, 0);
    if(cloudTwoX > (windowWidth - 100)){
        cloudTwoX = -300;
    }
    // top left cloud
    cloudTwoX += windSpeed;
    ellipse(200, 200, 100); // middle 
    ellipse(200 - 35, 200 + 10, 120, 90); // left 
    ellipse(200 + 35, 200 + 10, 140, 80); // right 
    ellipse(200 - 20, 200 - 20, 90); // top left 
    ellipse(200 + 20, 200 - 15, 65); // top right
    pop();

    push();
    translate(cloudThreeX, 0);
    if(cloudThreeX > windowWidth - 1500){
        cloudThreeX = -windowWidth
    }
    cloudThreeX += windSpeed; 
    // top right cloud
    ellipse(windowWidth - 200, 100, 100); // middle 
    ellipse(windowWidth - 250, 100 + 10, 120, 90); // left 
    ellipse(windowWidth - 150, 100 + 10, 140, 80); // right 
    ellipse(windowWidth - 240, 100 - 20, 90); // top left 
    // ellipse(windowWidth - 150, 100 - 15, 65); // top right
    pop();

    push();
    translate(cloudFourX, 0);
    if(cloudFourX > (windowWidth - 1280)){
        cloudFourX = -(windowWidth - 300);
    }
    cloudFourX += windSpeed;
    // bottom right cloud
    ellipse(windowWidth - 400, windowHeight - 200, 120); // middle 
    ellipse(windowWidth - 450, (windowHeight - 200) + 15, 150, 90); // left 
    ellipse(windowWidth - 350, (windowHeight - 200) + 15, 120, 80); // right 
    // ellipse(windowWidth - 320, (windowHeight - 200) - 20, 90); // top left 
    ellipse(windowWidth - 350, (windowHeight - 200) - 15, 80); // top right
    pop();

    push();
    translate(cloudFiveX, 0);
    if(cloudFiveX > (windowWidth - 300)){
        cloudFiveX = -600;
    }
    cloudFiveX += windSpeed;

    // bottom left cloud
    ellipse(400, windowHeight - 200, 120); // middle 
    ellipse(350, (windowHeight - 200) + 15, 150, 90); // left 
    ellipse(450, (windowHeight - 200) + 15, 120, 80); // right 
    // ellipse(windowWidth - 320, (windowHeight - 200) - 20, 90); // top left 
    ellipse(350, (windowHeight - 200) - 15, 80); // top right
    pop();

    push();
    translate(cloudSixX, 0);
    if(cloudSixX > (windowWidth - 190)){
        cloudSixX = -550;
    }
    cloudSixX += windSpeed;

    // middle right cloud
    ellipse(440, cenH - 70, 100); // middle
    ellipse(360, cenH - 55, 150, 80); // left
    ellipse(480, cenH - 55, 100, 50); // right
    ellipse(390, cenH - 95, 100); // top left
    pop();

    push();
    translate(cloudSevenX, 0);
    if(cloudSevenX > (windowWidth - 1200)){
        cloudSevenX = -(windowWidth - 150);
    }
    cloudSevenX += windSpeed;

    //middle left cloud
    ellipse(windowWidth - 500, 300, 100); // middle
    ellipse(windowWidth - 550, 300 + 10, 110, 80); // left
    ellipse(windowWidth - 440, 300 + 10, 140, 90); //right
    ellipse(windowWidth - 540, 300 - 20, 60, 40); // top left
    ellipse(windowWidth - 460, 300 - 15, 90); // top right
    pop();

    push();
    translate(cloudEightX, 0);
    if(cloudEightX > cenW + 120){
        cloudEightX = -(cenW + 120);
    }
    cloudEightX += windSpeed;

    // top middle cloud
    ellipse(cenW, 90, 100); // middle
    ellipse(cenW - 65, 110, 90, 70); // left
    ellipse(cenW + 40, 110, 100, 60); // right
    ellipse(cenW - 20, 80, 120, 90); // top left
    ellipse(cenW + 20, 70, 100); // top right
    pop();

    push();
    translate(cloudNineX, 0);
    if(cloudNineX > windowWidth){
        cloudNineX = -windowWidth;
    }
    cloudNineX += windSpeed;

    // far right cloud
    ellipse(windowWidth - 150, cenH + 45, 100, 110); // middle
    ellipse(windowWidth - 200, cenH + 65, 110, 70) // left
    ellipse(windowWidth - 100, cenH + 65, 110, 70); // right
    ellipse(windowWidth - 180, cenH + 45, 90); // top left
    ellipse(windowWidth - 120, cenH + 45, 90); // top right
}

function bubbles(){
    background(113, 167, 243);
    noStroke();
    for(i = 0; i < numBubbles; i++){
        bubbleX[i] += xSpeed[i];
        bubbleY[i] += ySpeed[i];
        fill(bubbleColor[i]);
        circle(bubbleX[i], bubbleY[i], bubbleSize[i]);

        if(bubbleX[i] > windowWidth || bubbleX[i] < 0){
            xSpeed[i] = -xSpeed[i];
        }
        else if(bubbleY[i] > windowHeight || bubbleY[i] < 0){
            ySpeed[i] = -ySpeed[i];
        }
        else if(dist(mouseX, mouseY, bubbleX[i], bubbleY[i]) < bubbleSize[i] / 4){
            bubbleColor[i] = color(255, 255, 255, 0);
        }
        else if(key == ' '){
            bubbleColor[i] = color(random(255), random(255), random(255), random(25, 200));
        }
    }
}

function rainDrops(){
    background(104);
    noStroke();
    for(i = 0; i < numDrops; i++){
        fill(dropColor[i]);
        circle(dropX[i], dropY[i], dropSize[i], dropSize[i]);

        dropY[i] = dropY[i] + dropYSpeed[i];

        if(dropY[i] > windowHeight + dropSize[i]){
            dropY[i] = 0;
        }
        else if(dropY[i] < 0 - dropSize[i]){
            dropY[i] = windowHeight;
        }
        else if(dist(mouseX, mouseY, dropX[i], dropY[i]) < dropSize[i] / 4){
            dropColor[i] = color(random(255), random(255), random(255), random(255));
        }
    }
}

function bounce(){
    background(0);
    rectMode(CENTER)
    rect(boxX, boxY, size);
    boxX += movXRate;
    boxY += movYRate;

    if(boxX + (size / 2) > windowWidth || boxX - (size / 2) < 0){
        movXRate = -movXRate;
        fill(color(random(255), random(255), random(255)));
    }
    else if(boxY + (size / 2) > windowHeight || boxY - (size / 2) < 0){
        movYRate = -movYRate;
        fill(color(random(255), random(255), random(255)));
    }
    else if (key == ' '){
        boxX = mouseX;
        boxY = mouseY;
    }
}