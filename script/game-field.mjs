export default class GameField {
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
                rowArray.push(`cell row${i}-col${j} white`);
            }
        fieldArray.push(rowArray);
        }
        return fieldArray;
    }
    updateStyles() {
        const root = document.querySelector(':root');
        root.style.setProperty('--rows-num', this.rows);
        root.style.setProperty('--cols-num', this.cols);
    }
    buildInDOM(inputRows, inputCols) {
        // getting array
        this.getRowsAndCols(inputRows, inputCols);
        document.querySelector("#game-field").innerHTML = '';
        const fieldArray = this.setupArray();
        // building in DOM
        fieldArray.forEach((row, index) => {
            // building rows
            const rowElement = document.createElement("div");
            rowElement.classList = `game-field-row ${index}`;
            this.targetDOMel.appendChild(rowElement);
            row.forEach((cell) => {
                // building cols
                const cellElement = document.createElement("div");
                cellElement.classList = cell;
                rowElement.appendChild(cellElement);
            })
        })
        this.updateStyles();
    }
}