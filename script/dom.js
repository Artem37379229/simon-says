export class DOM {
  constructor() {
    this.elem = {};

    this.simon = document.createElement("section");
    this.container = document.createElement("div");
    this.content = document.createElement("div");
    this.header = document.createElement("header");
    this.round = document.createElement("span");
    this.title = document.createElement("h1");
    this.repeat = document.createElement("span");
    this.gameControls = document.createElement("div");
    this.newGameBtn = document.createElement("button");
    this.repeatBtn = document.createElement("button");
    this.startBtn = document.createElement("button");
    this.levels = document.createElement("div");
    this.buttonEasy = document.createElement("button");
    this.buttonMedium = document.createElement("button");
    this.buttonHard = document.createElement("button");
    this.startBtn = document.createElement("button");
    this.nextBtn = document.createElement("button");
    this.keyboard = document.createElement("div");
    this.keyboardNum = document.createElement("div");
    this.keyboardLetters = document.createElement("div");
    this.keyboardNumContainer = document.createElement("div");
    this.keyboardLettersContainer = document.createElement("div");
    this.inputContainer = document.createElement("div");
    this.input = document.createElement("input");
    this.keyboardRow = document.createElement("div");
    this.keyboardRow2 = document.createElement("div");
    this.keyboardRow3 = document.createElement("div");

    this.simon.classList.add("simon");
    this.container.classList.add("container");
    this.content.classList.add("simon__content");
    this.header.classList.add("header", "header__content");
    this.round.classList.add("header__round");
    this.title.classList.add("header__title");
    this.repeat.classList.add("header__repeat");
    this.gameControls.classList.add("game-controls", "game-controls__content");
    this.newGameBtn.classList.add(
      "game-controls__button",
      "game-controls--new-game",
      "hidden"
      
    );
    this.nextBtn.classList.add(
      "game-controls__button",
      "game-controls--next",
      "hidden"
    );
    this.repeatBtn.classList.add(
      "game-controls__button",
      "game-controls--repeat",
      "hidden"
    );
    this.startBtn.classList.add(
      "game-controls__button",
      "game-controls--start"
    );
    this.levels.classList.add("level", "level__content");
    this.buttonEasy.classList.add("level__setings", "level--easy");
    this.buttonMedium.classList.add("level__setings", "level--medium");
    this.buttonHard.classList.add("level__setings", "level--hard");
    this.keyboard.classList.add(
      "keyboard",
      "keyboard__content",
      "keyboard_disabled"
    );
    this.inputContainer.classList.add("keyboard__input-container");
    this.input.classList.add("keyboard__input");
    this.keyboardNumContainer.classList.add("keyboard__num", "keyboard__body");
    this.keyboardLettersContainer.classList.add(
      "keyboard__letters",
      "keyboard__body"
    );
    this.keyboardRow.classList.add("keyboard__row");
    this.keyboardRow2.classList.add("keyboard__row");
    this.keyboardRow3.classList.add("keyboard__row");

    this.title.textContent = "Simon says";
    this.round.textContent = "Round: 1";
    this.newGameBtn.textContent = "New game";
    this.repeatBtn.textContent = "Repeat the sequence";
    this.repeat.textContent = `Repeat: 1`;
    this.startBtn.textContent = "Start";
    this.nextBtn.textContent = "Next round";
    this.buttonEasy.textContent = "Easy";
    this.buttonMedium.textContent = "Medium";
    this.buttonHard.textContent = "Hard";

    document.body.append(this.simon);
    this.simon.append(this.container, this.content);
    this.container.append(this.content);
    this.content.append(
      this.header,
      this.gameControls,
      this.levels,
      this.keyboard
    );
    this.header.append(this.round, this.title, this.repeat);
    this.gameControls.append(
      this.newGameBtn,
      this.repeatBtn,
      this.startBtn,
      this.nextBtn
    );
    this.levels.append(this.buttonEasy, this.buttonMedium, this.buttonHard);
    this.keyboard.append(
      this.inputContainer,
      this.keyboardNumContainer,
      this.keyboardLettersContainer
    );
    this.inputContainer.append(this.input);
    this.keyboardLettersContainer.append(
      this.keyboardRow,
      this.keyboardRow2,
      this.keyboardRow3
    );
    this.elem.startBtn = this.startBtn;
    this.elem.gameControls = this.gameControls;
    this.elem.repeatBtn = this.repeatBtn;
    this.elem.newGameBtn = this.newGameBtn;
    this.elem.nextBtn = this.nextBtn;
    this.elem.round = this.round;
    this.elem.repeat = this.repeat;
    this.elem.levels = this.levels;
    this.elem.buttonEasy = this.buttonEasy;
    this.elem.buttonMedium = this.buttonMedium;
    this.elem.buttonHard = this.buttonHard;
    this.elem.keyboard = this.keyboard;
    this.elem.input = this.input;
    this.elem.keyboardNumContainer = this.keyboardNumContainer;
    this.elem.keyboardLettersContainer = this.keyboardLettersContainer;
  }
  buildKeyboard() {
    const arrayNum = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48];
    const arrayLetters = [
      81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75,
      76, 90, 88, 67, 86, 66, 78, 77,
    ];

    this.keyboard.classList.add("keyboard_active");
    this.keyboardNumContainer.innerHTML = "";
    this.keyboardRow.innerHTML = "";
    this.keyboardRow2.innerHTML = "";
    this.keyboardRow3.innerHTML = "";

    for (let i = 0; i < arrayNum.length; i++) {
      const index = arrayNum[i];
      const numEl = document.createElement("button");
      numEl.setAttribute("data-key", index);
      numEl.classList.add("keyboard__elem");
      numEl.textContent = String.fromCharCode(numEl.getAttribute("data-key"));
      numEl.setAttribute("data-name", numEl.textContent);
      this.keyboardNumContainer.append(numEl);
    }
    const buildLetters = (num, num2, tag) => {
      for (let i = num; i < num2; i++) {
        const index = arrayLetters[i];
        const numEl = document.createElement("button");
        numEl.setAttribute("data-key", index);
        numEl.classList.add("keyboard__elem");
        numEl.textContent = String.fromCharCode(numEl.getAttribute("data-key"));
        numEl.setAttribute("data-name", numEl.textContent);
        tag.append(numEl);
      }
    };
    buildLetters(0, 10, this.keyboardRow);
    buildLetters(10, 19, this.keyboardRow2);
    buildLetters(19, 26, this.keyboardRow3);
  }
}
