let keyPressCount = {};
let totalKeyCount = 0;
let index = 0;
let messageToType = "";
let words = [];
let wordObjectArray = [];
let wordObjectBuffer = {};
let string = "";
let score = 0;
let startTime=0
let rawKeyPressCount=0
let accuracy, rawWpm, correctedWpm
let test=true;

function reset() {
  index = Math.trunc(Math.random() * quotes.length);
 // messageToType = quotes[index];
  messageToType="Hello po;'rr [-=]";
  console.log(`${index} / ${quotes.length} ${messageToType.length}`);
  string = "";
  score = 0;
  words = messageToType.split(" ").filter((word) => word != "");
  wordObjectArray = words.map((word, i) => ({
    id: i + 1,
    title: word,
    xPosition: 100 + (i % 5) * 100,
    yPosition: 100 + Math.trunc(i / 5) * 50,
    isSelected: false,
  }));
  totalKeyCount=0;
  //Keyboard.glow(document.getElementById(wordObjectArray[0].title[0].toLowerCase()));
  Keyboard.glow(wordObjectArray[0].title[0]);
}

function setup() {
  Keyboard.init();
  createCanvas(windowWidth, windowHeight);
  reset();
  button = createButton("Restart!");
  button.position(500, 10);
  button.mousePressed(reset);

  noStroke();
  background(230);
  rectWidth = width / 4;
}

function draw() {
  clear();
  wordObjectArray.map((word) => {
    const { id, title, xPosition, yPosition, isSelected } = word;
    stroke(127, 63, 120);
    fill(color(isSelected ? "orange" : "yellow"));
    rect(xPosition - 10, yPosition - 17, 90, 30, 50, 50);
    fill(color("black"));
    noStroke();
    text(word.title, word.xPosition, word.yPosition);
  });
  text(" Start Typing ", 40, 430);
  stroke(127, 63, 120);
  noFill();
  rect(40, 450, 120, 30.5, 50);
  fill(color("black"));
  noStroke();
  text(messageToType, 100, 50);
  textFont("Georgia");
  text(string, 50, 470);
  text(`Words typed = ${score}`, 250, 20);
  if (wordObjectArray.length === 0) {
    text("Game Over !! Please restart the game", 250, 250);
    text(`Accuracy = ${accuracy.toPrecision(3)} %`, 250, 275);
    text(`Raw speed = ${rawWpm.toPrecision(4)} wpm`, 250, 300);
    text(`Corrected speed = ${correctedWpm.toPrecision(4)} wpm`, 250, 325);
  }
}

function keyPressed() {
  key = String(key);
  if (wordObjectArray.length === 0) {
    return;
  }
  keyPressAnalytics(key);

  if (key == "Backspace" && string!=='') {
    keyPressCount[string[string.length - 1]] -= 1;
    string = string.slice(0, -1);
  } else if (key == " ") {
    if (string === wordObjectBuffer.title) {
      score += 1;
      string = "";
      wordObjectArray = wordObjectArray.filter(
        (word) => word.id != wordObjectBuffer.id
      );
      wordObjectBuffer = wordObjectArray[0];
      Keyboard.glow(wordObjectBuffer.title[0]);
      if (wordObjectArray.length === 0) {
        rawKeyPressCount -= 1;
        // To account for the last space pressed
        // game over
        console.log("game End");
        let timeTaken = millis() - startTime;
        accuracy = (messageToType.length / rawKeyPressCount) * 100;
        rawWpm = (rawKeyPressCount * 12 * 1000) / timeTaken;
        correctedWpm = (messageToType.length * 12 * 1000) / timeTaken;
        console.log(`${messageToType.length} | ${rawKeyPressCount}`);
      }
    }
  } else {
    if (key.length === 1) {
      string += key;
    }
  }
  if (string.length > 0) {
    matchingWord = wordObjectArray.find((word) =>
      word.title.startsWith(string)
    );
    if (matchingWord) {
      if (matchingWord.id !== wordObjectBuffer.id) {
        wordObjectBuffer.isSelected = false;
        wordObjectBuffer = matchingWord;
        wordObjectBuffer.isSelected = true;
      }
    }
  }
  if(wordObjectBuffer.id)
  {
    // const str= wordObjectBuffer.title;
    // const length=string.length;
    //   Keyboard.dim(key);
    //   Keyboard.glow(str[length]||" ");
    Keyboard.glow_dim(wordObjectBuffer.title,string,key);
  }

}



function keyPressAnalytics(key){
  
  if(key.length === 1){
    
    if(words.length === wordObjectArray.length && string === ''){
      console.log('start', millis())
      startTime=millis()
      rawKeyPressCount=0
    }
    rawKeyPressCount+=1
  if (keyPressCount[key]) {
        keyPressCount[key] += 1;
      } else {
        keyPressCount[key] = 1;
      }
  }
  console.log(rawKeyPressCount, messageToType.length)
  
}


