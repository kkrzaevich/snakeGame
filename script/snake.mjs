export default class Snake {
    constructor(snakeArray, direction) {
        this.snakeArray = snakeArray;
        this.direction = direction;
    }
    setBaseArray(inputArray) {
        const newArray = inputArray.map((row) => {return row.map((col) => {return -1})});
        this.snakeArray = [...newArray];
    }
    setInitialSnakeNumbers() {
        const startingRow = Math.floor(this.snakeArray.length/2) -1;
        const startingColumn = Math.floor(this.snakeArray[0].length/2) - 1;
        this.snakeArray[startingRow][startingColumn] = 0;
    }
    drawSnake() {
        this.snakeArray.forEach((row, index1) => row.forEach((item, index2) => {
            if (item>=0) {document.querySelector(`.row${index1}-col${index2}`).classList = `cell row${index1}-col${index2} green`
        } else if (item===-1) {document.querySelector(`.row${index1}-col${index2}`).classList = `cell row${index1}-col${index2} white`
        } else if (item===-1000) {document.querySelector(`.row${index1}-col${index2}`).classList = `cell row${index1}-col${index2} red`}
        }
        ))
    }
    generateFoodCell() {
        const emptyCells = [];
        this.snakeArray.forEach((row, i) => {
            row.forEach((col, j) => {
                if (col === -1) {
                    emptyCells.push({rows: i, cols: j})
                }
            })
        })
        const foodCellIndex = Math.floor(Math.random()*emptyCells.length);
        const foodCell = emptyCells[foodCellIndex];
        this.snakeArray[foodCell.rows][foodCell.cols] = -1000;
    }
    getMaxElement() {
        let maxEl = {value: -1, indexRows: undefined, indexCols: undefined}
        this.snakeArray.forEach(
            (row, index) => {
                let localMax = Math.max(...row);
                if (localMax > maxEl.value) {
                    maxEl.value = localMax;
                    maxEl.indexRows = index;
                    maxEl.indexCols = row.indexOf(localMax);
                }
            }
        )
        return maxEl;
    }
    getNextCell() {
        let maxEl = this.getMaxElement();
        let nextCell = {};
        if (this.direction === "right") {
            if (maxEl.indexCols >= this.snakeArray[0].length - 1) {
                nextCell = {rows: maxEl.indexRows, cols: 0}
            } else {
                nextCell = {rows: maxEl.indexRows, cols: maxEl.indexCols + 1}
            }
        } else if (this.direction === "left") {
            if (maxEl.indexCols <= 0) {
                nextCell = {rows: maxEl.indexRows, cols: this.snakeArray[0].length - 1}
            } else {
                nextCell = {rows: maxEl.indexRows, cols: maxEl.indexCols - 1}
            }            
        } else if (this.direction === "top") {
            if (maxEl.indexRows <= 0) {
                nextCell = {rows: this.snakeArray.length - 1, cols: maxEl.indexCols}
            } else {
                nextCell = {rows: maxEl.indexRows-1, cols: maxEl.indexCols}
            }              
        } else if (this.direction === "bottom") {
            if (maxEl.indexRows >= this.snakeArray.length - 1) {
                nextCell = {rows: 0, cols: maxEl.indexCols}
            } else {
                nextCell = {rows: maxEl.indexRows+1, cols: maxEl.indexCols}
            }                          
        }
        return nextCell;
    }
    deleteCells() {
        // снижаем номера в ячейках на 1
        this.snakeArray = [...this.snakeArray.map((row) => (row.map((col) => {return (col>-1) ? col - 1 : col})))];
    }
    callGameOver(gameOverCallback) {
        gameOverCallback();
    }
    move(maxEl, nextCell, gameOverCallback) {
        let nextCellContent = this.snakeArray[nextCell.rows][nextCell.cols]
        if (nextCellContent === -1) { // если ничего нет по ходу движения
            this.snakeArray[nextCell.rows][nextCell.cols] = maxEl.value + 1;
            this.deleteCells(); 
        } else if (nextCellContent === -1000) { // если по ходу движения еда
            this.snakeArray[nextCell.rows][nextCell.cols] = maxEl.value + 1;
            this.generateFoodCell();
        } else if (nextCellContent >= 0) { // если по ходу движения змея
            this.callGameOver(gameOverCallback);
        } 
        this.drawSnake();
    }
}