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
        const root = document.querySelector(':root');
        root.style.setProperty('--rows-num', this.rows);
        root.style.setProperty('--cols-num', this.cols);
    }
    buildInDOM(inputRows, inputCols) {
        // getting array
        this.getRowsAndCols(inputRows, inputCols);
        console.log("Building dom, rows are", this.rows, ", cols are ", this.cols);
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
                console.log(rowElement);
                rowElement.appendChild(cellElement);
            })
        })
        this.updateStyles();
    }
}

class Snake {
    constructor(snakeArray, vector) {
        this.snakeArray = this.snakeArray;
        this.vector = this.vector;
    }
    setBaseArray(inputArray) {
        let newArray = inputArray.map((row) => {return row.map((col) => {return undefined})});
        this.snakeArray = [...newArray];
    }
    setInitialSnakeNumbers() {
        const startingRow = Math.floor(this.snakeArray.length/2) -1;
        const startingColumn = Math.floor(this.snakeArray[0].length/2) - 1;
        this.snakeArray[startingRow][startingColumn] = 0;
    }
    drawSnake() {
        
    }
    changeVector() {

    }
    eatFood() {

    }
    move() {

    }
    hitBoundary() {

    }
    hitItself() {

    }
    
    // ! Нет, вектор для всех ячеек не нужен, он нужен только для передней ячейки, остальные просто удаляются по номеру. Вектор - свойство всей змеи.

    // Хочу сделать, чтобы класс Змея использовал внутри точки, которые хранили номер, а также вектор движения. А они тоже отдельный класс.
    // Вектор движения можно менять клавиатурой
    // После кажого такта движения: создаем новую точку в направлении вектора головного элемента, номер этого элемента на один больше.
    // Потом сразу же уменьшаем все номера на 1. Удаляем максимальный или минимальный (тот, который будет отвечать за хвост).
    // Если по ходу действия встретили еду, удаляем ее (делаем паузу). При этом в следующем такте движения элемент хвоста мы удалять не будем.
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

function initializeEverything(gameField, snake, rows, cols) {
  // Функция, которая объединяет всё и вставляется в makeWork вместо build in DOM
}

const rowsSetting = new Setting(4, document.querySelector("#rows-decrement"), document.querySelector("#rows-increment"), document.querySelector("#rows-show-num"));
const colsSetting = new Setting(4, document.querySelector("#cols-decrement"), document.querySelector("#cols-increment"), document.querySelector("#cols-show-num"));
const gameField = new GameField(rowsSetting.number, colsSetting.number, document.querySelector("#game-field"));
const snake = new Snake([], 'right');

rowsSetting.makeWork(() => {gameField.buildInDOM(rowsSetting.number, colsSetting.number)});
colsSetting.makeWork(() => {gameField.buildInDOM(rowsSetting.number, colsSetting.number)});
snake.setBaseArray(gameField.setupArray());
snake.setInitialSnakeNumbers();

