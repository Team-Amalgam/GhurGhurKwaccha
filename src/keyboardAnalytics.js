class KeyboardAnalytics {
  constructor() {
    this.reset();
    this.speedComments = {
      0: "You are a Snail",
      1: "You are a Tortoise",
      2: "You are a Hare",
      3: "You are a Cheetah",
    };
    this.accuracyComments = {
      0: [
        "You have very less accuracy, Try Harder!!!",
        "Try More for better Accuracy!",
      ],
      1: ["You can still get better", "Type more to improve your accuracy"],
      2: [
        "I see much improvement in your accuracy",
        "You have fine improvement in your accuracy",
      ],
      3: ["Extraordinary Typing!!!", "Bravo!!!!!"],
    };
  }
  calculate() {
    this.keyStrokeCount = this.typedKeys.length;
    var correctlyTypedString = this.correctlyTypedWords.join(" ");
    var timeDifference = millis() - this.startTime;
    var totalCharacters = correctlyTypedString.length;
    this.accuracy = (totalCharacters / this.keyStrokeCount) * 100;
    this.rawWPM = (this.keyStrokeCount * 12 * 1000) / timeDifference;
    this.correctedWPM = (totalCharacters * 12 * 1000) / timeDifference;
    this.speedComment =
      this.speedComments[Math.min(int(this.correctedWPM / 25), 3)];
    this.accuracyComment =
      this.accuracyComments[int(this.accuracy / 25)][int(Math.random() * 2)];
  }
  displayAnalytics(xPos,yPos) //xPos,yPos->top left
   {
    fill(6, 26, 64, 200);
    rect(xPos, yPos - windowHeight / 23, windowWidth / 2, windowHeight / 5 , 20);
    fill(255);
    text("Game Over !! Please restart the game", xPos, yPos - windowHeight/11);
    text(
      `Accuracy = ${this.accuracy.toPrecision(3)}% (${this.accuracyComment})`,
      xPos,
      yPos - windowHeight / 20
    );
    text(
      `Raw speed = ${this.rawWPM.toPrecision(4)} wpm`,
      xPos,
      yPos - 7
    );
    text(
      `Corrected speed = ${this.correctedWPM.toPrecision(4)}wpm (${
        this.speedComment
      }) `,
      xPos,
      yPos + 15
    );
  
  }
  reset() {
    this.keyStrokeCount = 0;
    this.startTime = null;
    this.correctlyTypedWords = [];
    this.accuracy = 0;
    this.rawWPM = 0;
    this.correctedWPM = 0;
    this.typedKeys = "";
  }
  setCorrectlyTypedWords(word) {
    this.correctlyTypedWords.push(word);
  }
  setTypedKey(key) {
    this.typedKeys += key;
  }
  setStartTime() {
    this.startTime = millis();
  }
}
