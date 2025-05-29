import { KeyboardLogic } from "./keyboards.js";

class GameLogic {
  constructor() {
    this.keyboardLogic = new KeyboardLogic();
    this.keyboardLogic.logicKeyboard();
    this.elem = this.keyboardLogic.elem;
    this.options = this.keyboardLogic.options;
    this.arrayNum = this.keyboardLogic.arrayNum;
    this.arrayLetters = this.keyboardLogic.arrayLetters;
    this.arrayNumLetters = this.keyboardLogic.arrayNumLetters
    this.buildButton = this.keyboardLogic.buildButton;
  }

  logic() {
    const {
      keyboard,
      gameControls,
      keyboardNumContainer,
      keyboardLettersContainer,
      startBtn,
      repeatBtn,
      newGameBtn,
      levels,
      round,
      repeat,
      input,
      buttonHard,
      buttonEasy,
      buttonMedium,
      nextBtn,
    } = this.elem;

    let active = null;
    let maxRounds = 5;
    let currentRound = 0;
    let currentSymbol = 0;
    let maxSymbol = 10;
    let arrayElems = [];
    let sortArr2 = [];

    this.removeClass = (elem, tagElem) => {
      elem.classList.add(tagElem);
      setTimeout(() => {
        elem.classList.remove(this.options.tagElem);
      }, 1000);
    };

    this.addClass = (sortArr) => {
      for (let i = 0; i < sortArr.length; i++) {
        const elem = document.querySelector(
          `[data-name="${sortArr[i].toUpperCase()}"]`
        );
        setTimeout(() => {
          this.removeClass(elem, this.options.tagElem);
        }, 1000 * (i + 1));
        setTimeout(() => {
          keyboard.classList.remove("keyboard_disabled");
          gameControls.classList.remove("game-controls_disabled");
        }, 1000 * sortArr.length + 1000);
      }
    };
    this.sortArray = (array) => {
      array = array.sort(() => Math.random() - 0.5);
      currentSymbol += 2;
      const sortArr = array.slice(0, currentSymbol);
      sortArr2 = sortArr;
      currentRound++;
      round.textContent = `Round: ${currentRound}`;
      console.log(sortArr);
      this.addClass(sortArr);


      repeatBtn.addEventListener("click", () => {
        this.addClass.call(this, sortArr2);
        keyboard.classList.add("keyboard_disabled");
        arrayElems = [];
        input.value = "";
      });

      if (currentRound >= maxRounds) {
        currentRound = 0;
        currentSymbol = 0;
        return;
      }
    };

    this.checkInput = (button, array) => {
      const removeWords = ["easy", "hard", "medium"];

      if (keyboardNumContainer.classList.contains("keyboard__num_active")) {
        array = this.arrayLetters;
      } else {
        array = this.arrayNum;
      }

      if (buttonHard.classList.contains("level_active")) {
        array = [];
      }

      if (
        !input.classList.contains("visible") ||
        !startBtn.classList.contains("hidden")
      ) {
        arrayElems = [];
      } else {
        arrayElems.push(button.textContent.toLowerCase());
      }

      arrayElems = arrayElems
        .filter((word) => !removeWords.includes(word))
        .filter((word) => !array.includes(word.toLowerCase()));

      input.value = arrayElems.join("");

      for (let i = 0; i < input.value.length; i++) {
        if (input.value === sortArr2.join("")) {
          nextBtn.classList.remove("hidden");
          repeatBtn.classList.add("hidden");
          keyboard.classList.add("keyboard_disabled");
        }
        if (input.value[i] !== sortArr2[i]) {
          keyboard.classList.add("keyboard_disabled");
        }
      }
    };

    this.checkArray = () => {
      if (buttonEasy.classList.contains("level_active")) {
        this.sortArray(this.arrayNum);
      }
      if (buttonMedium.classList.contains("level_active")) {
        this.sortArray(this.arrayLetters);
      }
      if (buttonHard.classList.contains('level_active')) {
        this.sortArray(this.arrayNumLetters);
      }
    }

    nextBtn.addEventListener("click", () => {
      gameControls.classList.add('game-controls_disabled')
      this.checkArray.call(this)
      nextBtn.classList.add("hidden");
      repeat.textContent = `Repeat: 1`;
      repeatBtn.classList.remove("hidden", "disabled");
      setTimeout(() => {
        repeatBtn.removeAttribute("disabled");
      }, 1000 * sortArr2.length + 1000);
      input.value = "";
      arrayElems = [];
    });

    levels.addEventListener("click", (event) => {
      this.buildButton.call(
        this,
        event.target.closest("button"),
        this.options.tagElem2
      );
    });

    keyboardNumContainer.addEventListener("click", (event) => {
      this.buildButton.call(
        this,
        event.target.closest("button"),
        this.options.tagElem,
        true
      );
      this.checkInput.call(this, event.target.closest("button"));
    });

    keyboardLettersContainer.addEventListener("click", (event) => {
      this.buildButton.call(
        this,
        event.target.closest("button"),
        this.options.tagElem,
        true
      );
      this.checkInput.call(this, event.target.closest("button"));
    });

    document.addEventListener("keyup", (event) => {
      if (
        startBtn.classList.contains("hidden") &&
        !keyboard.classList.contains("keyboard_disabled")
      ) {
        setTimeout(() => {
          this.buildButton.call(
            this,
            document.querySelector(`[data-key="${event.keyCode}"]`),
            this.options.tagElem,
            true
          );
          this.checkInput.call(
            this,
            document.querySelector(`[data-key="${event.keyCode}"]`)
          );
        }, 1000 * sortArr2 + 1000);
      }
    });

    this.showButton = (arg) => {
      if (arg) {
        startBtn.classList.remove("hidden");
        round.classList.remove("visible");
        repeat.classList.remove("visible");
        repeatBtn.classList.add("hidden");
        newGameBtn.classList.add("hidden");
        levels.classList.remove("level__content_disabled");
        input.classList.remove("visible");
        keyboard.classList.add("keyboard_disabled");
        nextBtn.classList.add("hidden");
        repeatBtn.removeAttribute("disabled", true);
        arrayElems = [];
        input.value = "";
        currentRound = 0;
        currentSymbol = 0;
      } else {
        startBtn.classList.add("hidden");
        round.classList.add("visible");
        repeat.classList.add("visible");
        repeatBtn.classList.remove("hidden");
        newGameBtn.classList.remove("hidden");
        levels.classList.add("level__content_disabled");
        repeat.textContent = `Repeat: 1`;
        repeatBtn.classList.remove("disabled");
        input.classList.add("visible");
        gameControls.classList.add("game-controls_disabled");
      }
    };

    startBtn.addEventListener("click", () => {
      this.showButton.call(this);
      this.checkArray.call(this)
    });

    newGameBtn.addEventListener("click", () => {
      this.showButton.call(this, true);
    });

    repeatBtn.addEventListener("click", () => {
      repeat.textContent = `Repeat: 0`;
      repeatBtn.classList.add("disabled");
      repeatBtn.setAttribute("disabled", true);
    });
  }
}
const game = new GameLogic();
game.logic();
