// change the quotes in this array. Be mindful of the quotation marks!
// this is the only part of the file you need to edit!

const quotes = [
  { text: "'the practice of making art with code.'", source: "Andrew Bryant" }, // https://www.artsyshark.com/2021/05/26/what-is-creative-coding/
  { text: "\n'a process, based on exploration, iteration, reflection and discovery,\nwhere code is used as the primary medium to create a wide range of media artifacts.'", source: "Tim" }, // https://trcc.timrodenbroeker.de/faq/what-is-creative-coding/
  { text: "\n'[coding that] doesn't follow pre-defined specifications to solve problems for a user,\nbut rather aims at expressing ideas and concepts.'", source: "Raphaël de Courville" }, // https://hackmd.io/@creativecodeberlin/ryljdLxy_
  { text: "\n'rather than a one-sided audience viewing a result,\nit can draw the audience in to interact with.'", source: "Amber" }, // https://medium.com/@agc410/intro-to-creative-coding-56aa7658fd23
  { text: "simply the art of creating visualizations or expression.'", source: "Donovan Alexander" }, // https://interestingengineering.com/culture/everything-you-need-to-know-about-the-artistic-world-of-creative-coding
  { text: "\n'an exciting blend of art and technology where you use programming\nto create stunning visuals, animations, sounds, and interactive experiences.'", source: "Cam Velasco" }, // https://floowitalent.com/tips/what-is-creative-coding
  { text: "\n'the practice of using computer programming\nas a medium for artistic and personal expression.'", source: "Laura Valtere" }, // https://diatomenterprises.com/blog/what-is-creative-coding/
  { text: "'a practice where programming is used as a tool for art or design'", source: "Jack B. Du" } // https://digitalfutures.international/creative-coding/
];
// no need to edit anything below this line! 
// if you have made an error, you can check your history to see what might have gone wrong

// a variable that holds the current quote
let current = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Seed with millis() so each page load gives a different quote.
  randomSeed(millis());
  textSize(32);
  fill(247, 249, 250);
  // calls the function to pick a quote
  pickQuote();
}

function pickQuote() {
  // take a random number and use that to identify what quote to use
  current = quotes[floor(random(quotes.length))];
}

function draw() {
  background(18, 35, 59); // set the background color
  drawQuote();  // draw the quote on screen
}

function drawQuote() {   // draw text
  textAlign(CENTER, CENTER);
  text("Creative Coding is...", width / 2, height / 2 - 48);
  textStyle(ITALIC);
  text(current.text, width/2, height/2)
  //text("'" + current.text + "'", width / 2, height / 2);
  textStyle(BOLD);
  textAlign(RIGHT, CENTER);
  text("- " + current.source, width - 100, height - 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newQuote() {
  pickQuote();
  redraw();
}

function mousePressed() {
  newQuote();
}
