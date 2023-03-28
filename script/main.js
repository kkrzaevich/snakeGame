class GameField {
    constructor(rows, cols, targetDOMel) {
      this.rows = rows;
      this.cols = cols;
      this.targetDOMel = targetDOMel;
    }
    getRowsAndCols(inputRows, inputCols) {
        this.rows = inputRows;
        this.cols = inputCols;
    }
    setupArray() {
        const fieldArray = [];
        for (let i=0; i<this.rows; i++) {
            const rowArray = [];
            for (let j=0; j<this.cols; j++) {
                rowArray.push(`cell row${i} col${j} white`);
            }
        fieldArray.push(rowArray);
        }
        return fieldArray;
    }
    updateStyles() {
        // Обновить значения переменных CSS!
    }
    buildInDOM(inputRows, inputCols) {
        this.getRowsAndCols(inputRows, inputCols);
        console.log("Building dom, rows are", this.rows, ", cols are ", this.cols);
        document.querySelector("#game-field").innerHTML = '';
        const fieldArray = this.setupArray();
        fieldArray.forEach((row) => {
            row.forEach((cell) => {
                const cellElement = document.createElement("div");
                cellElement.classList = cell;
                this.targetDOMel.appendChild(cellElement);
            })
        })
    }
}

class Setting {
    constructor(number, buttonLess, buttonMore, displayText) {
      this.number = number;
      this.buttonLess = buttonLess;
      this.buttonMore = buttonMore;
      this.displayText = displayText;
    }
    initialize(connectGameFieldToSettings) {
        this.displayText.textContent = this.number;   
        connectGameFieldToSettings();     
    }
    increment() {
        this.number++;
        this.displayText.textContent = this.number;
    }
    decrement() {
        this.number--;
        this.displayText.textContent = this.number;
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

const rowsSetting = new Setting(4, document.querySelector("#rows-decrement"), document.querySelector("#rows-increment"), document.querySelector("#rows-show-num"));
const colsSetting = new Setting(4, document.querySelector("#cols-decrement"), document.querySelector("#cols-increment"), document.querySelector("#cols-show-num"));
const gameField = new GameField(rowsSetting.number, colsSetting.number, document.querySelector("#game-field"));

rowsSetting.makeWork(() => {gameField.buildInDOM(rowsSetting.number, colsSetting.number)});
colsSetting.makeWork(() => {gameField.buildInDOM(rowsSetting.number, colsSetting.number)});
