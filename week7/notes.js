let pMapper;
let myQuad;
let ballx;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pMapper = createProjectionMapper(this); // creates mapper
    leftQuad = pMapper.createQuadMap(400, 400); // creates one quad surface
    rightQuad = pMapper.createQuadMap(400, 400);
    ballx = myQuad.width / 2;
    /* positioning items in sketch:
        use target quad */

    polyMap = pMapper.createPolyMap(5);
    tripMap = pMapper.createTriMap(300, 300);
    quadMap = pMapper.createQuadMap(400, 400);
    
}

function draw() {
    background(220);
    leftQuad.displaySketch(dots); //pass name of drawing function into displaySketch()
    rightQuad.displaySketch(stripes);
}

function dots(mySketch){
    mySketch.background("aliceblue");
    mySketch.noStroke();
    mySketch.fill(180, 10, 220, 40);
    for(let i = 0; i < 400; i += 40){

    }
}

function stripes(yourSketch){

}

function myDrawing(mySketch){ // everything within function needs prefix of "mySketch."
    mySketch.background("orange");
    mySketch.stroke(0);
    mySketch. strokeWeight(4);
    mySketch.line(0, 0, 400, 400);

}

function keyPressed(){
    if(key === "c"){
        pMapper.toggleCalibration();
    }
    if(key === "s"){
        pMapper.save("map.json");
    }
    if(key === "l"){
        pMapper.load();
    }
}

