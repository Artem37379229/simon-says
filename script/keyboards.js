import { DOM } from "./dom.js";

export class KeyboardLogic {
    constructor() {
      this.htmlConstructor = new DOM();
      this.elem = this.htmlConstructor.elem;
      this.htmlConstructor.buildKeyboard()
      this.options = {
        tagElem: "keyboard__elem_active",
        tagElem2: "level_active",
      };
      this.arrayNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
      this.arrayLetters = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l", "z","x", "c", "v","b","n","m"];
      this.arrayNumLetters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l", "z","x", "c", "v","b","n","m",]
    }
    logicKeyboard() {
      let activeBtn = null;
  
      const {keyboardNumContainer, keyboardLettersContainer, buttonEasy, buttonMedium, buttonHard, newGameBtn} = this.elem;
  
      window.onload = function () {
        buttonEasy.click();
      };
  
      this.buildButton = (elem, tagElem, arg) => {
        const button = elem;
        if (button.classList.contains(tagElem)) return;
  
        if (!button.textContent) return;
        if (!button) return;
        else {
          buttonEasy.classList.remove(tagElem);
          buttonMedium.classList.remove(tagElem);
          buttonHard.classList.remove(tagElem);
        }
        if (activeBtn) {
          activeBtn.classList.remove(tagElem);
        }
        button.classList.add(tagElem);
        activeBtn = button;

        if(arg) {
          setTimeout(() => {
            button.classList.remove(tagElem);
          }, 500);
        }

        newGameBtn.addEventListener("click", () => {
            activeBtn.classList.remove(tagElem)
        })
      };
  
      this.showKeyboard = (showNum, showLetters) => {
        if (showNum) {
          keyboardNumContainer.classList.add("keyboard__num_active");
        } else {
          keyboardNumContainer.classList.remove("keyboard__num_active");
        }
  
        if (showLetters) {
          keyboardLettersContainer.classList.add("keyboard_active");
        } else {
          keyboardLettersContainer.classList.remove("keyboard_active");
        }
      };
  
      buttonEasy.addEventListener("click", () => {
        this.showKeyboard.call(this, true, false);
      });
      buttonMedium.addEventListener("click", () => {
        this.showKeyboard.call(this, false, true);
      });
      buttonHard.addEventListener("click", () => {
        this.showKeyboard.call(this, true, true);
      });
    }
  }