export default class Setting {
    constructor(number, buttonLess, buttonMore, displayText, min, max) {
      this.number = number;
      this.buttonLess = buttonLess;
      this.buttonMore = buttonMore;
      this.displayText = displayText;
      this.min = min;
      this.max = max;
    }
    initialize(connectGameFieldToSettings) {
        this.displayText.textContent = this.number;   
        connectGameFieldToSettings();     
    }
    increment() {
        if (this.number < this.max) {
            this.number++;
            this.displayText.textContent = this.number;
        }
    }
    decrement() {
        if (this.number > this.min) {
            this.number--;
            this.displayText.textContent = this.number;
        }
    }
    listenButtonLess(connectGameFieldToSettings) {
        this.buttonLess.addEventListener("click", () => {
            this.decrement();
            connectGameFieldToSettings();
        })
    }
    listenButtonMore(connectGameFieldToSettings) {
        this.buttonMore.addEventListener("click", () => {
            this.increment();
            connectGameFieldToSettings();
        })
    }
    makeWork(connectGameFieldToSettings) {
        this.initialize(connectGameFieldToSettings);
        this.listenButtonLess(connectGameFieldToSettings);
        this.listenButtonMore(connectGameFieldToSettings);
    }
}