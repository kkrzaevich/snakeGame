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
class Snake {
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
    gameOver() {

    }
    move(maxEl, nextCell) {
        let nextCellContent = this.snakeArray[nextCell.rows][nextCell.cols]
        if (nextCellContent === -1) { // если ничего нет по ходу движения
            this.snakeArray[nextCell.rows][nextCell.cols] = maxEl.value + 1;
            this.deleteCells(); 
        } else if (nextCellContent === -1000) { // если по ходу движения еда
            this.snakeArray[nextCell.rows][nextCell.cols] = maxEl.value + 1;
            this.generateFoodCell();
        } else if (nextCellContent >= 0) { // если по ходу движения змея
            this.gameOver();
        } 
        this.drawSnake();
    }
}

class Controls {
    constructor(key) {
        this.key = key;
    }
    getKey(snake) {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                if (snake.direction !== "left") {
                    this.key = "right";
                    snake.direction = this.key;
                }
            } else if (event.key === "ArrowLeft") {
                if (snake.direction !== "right") {
                    this.key = "left";
                    snake.direction = this.key;
                }
            } else if (event.key === "ArrowUp") {
                if (snake.direction !== "bottom") {
                    this.key = "top";
                    snake.direction = this.key;
                }
            } else if (event.key === "ArrowDown") {
                if (snake.direction !== "top") {
                    this.key = "bottom";
                    snake.direction = this.key;
                }
            }
        });
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


function gameLoop(snake) {
    snake.move(snake.getMaxElement(), snake.getNextCell());
}

function startGame(rowsSetting, colsSetting, speedSetting, gameField, controls, snake) {
    let gameSpeed = 200;
    rowsSetting.makeWork(() => {gameField.buildInDOM(rowsSetting.number, colsSetting.number)});
    colsSetting.makeWork(() => {gameField.buildInDOM(rowsSetting.number, colsSetting.number)});
    speedSetting.makeWork(() => {gameSpeed = 10000/speedSetting.number});
    snake.setBaseArray(gameField.setupArray());
    snake.setInitialSnakeNumbers();
    snake.generateFoodCell();
    snake.drawSnake(gameField.targetDOMel);
    controls.getKey(snake);
    setInterval(() => {gameLoop(snake)}, gameSpeed);
}

const rowsSetting = new Setting(10, document.querySelector("#rows-decrement"), document.querySelector("#rows-increment"), document.querySelector("#rows-show-num"));
const colsSetting = new Setting(10, document.querySelector("#cols-decrement"), document.querySelector("#cols-increment"), document.querySelector("#cols-show-num"));
const speedSetting = new Setting(50, document.querySelector("#speed-decrement"), document.querySelector("#speed-increment"), document.querySelector("#speed-show-num"));
const gameField = new GameField(rowsSetting.number, colsSetting.number, document.querySelector("#game-field"));
const controls = new Controls("right");
const snake = new Snake([], controls.key);

startGame(rowsSetting, colsSetting, speedSetting, gameField, controls, snake);

// отмасштабировать для разного количества ячеек
// добавить gameOver
// добавить интерфейс