import GameField from "./game-field.mjs";
import Snake from "./snake.mjs";
import Controls from "./controls.mjs";
import Setting from "./settings.mjs";

// UI declarations
const animationSpeed = 300;
document.querySelector(':root').style.setProperty('--timeout', `${animationSpeed/1000}s`);
const startGameButton = document.querySelector("#start-game");
const settingsButton = document.querySelector("#settings-button");
const gameViewport = document.querySelector("#game-viewport");
const mainMenu = document.querySelector("#main-menu");
const settingsMenu = document.querySelector("#settings");
const showSettingsElement = document.querySelector("#show-size-speed");
const showScoreElement = document.querySelector("#show-score");
const pauseButton = document.querySelector('#pause-button');
const mainMenuButton = document.querySelector('#main-menu-button');
const gameFieldAux = document.querySelector('#game-field-aux')
const mobileButtons = document.querySelector('#mobile-buttons');
const mobileButtonRight = document.querySelector('#button-right');
const mobileButtonLeft = document.querySelector('#button-left');
const mobileButtonDown = document.querySelector('#button-down');
const mobileButtonUp = document.querySelector('#button-up');
const contolsDescription = document.querySelector('#controls-description');
const overlayText = document.querySelector(".overlay-text");
const gameOverScreen = document.querySelector("#game-over");
const gameOverScore = document.querySelector("#game-over-score");
const gameOverRestart = document.querySelector("#game-over-restart");
const gameOverMainMenu = document.querySelector("#game-over-main-menu");

function gameLoop(snake) {
    snake.move(snake.getMaxElement(), snake.getNextCell(), gameOver);
}

function startSettings(rowsSetting, colsSetting, speedSetting, gameField) {
    let gameSpeed = 200;
    rowsSetting.makeWork(() => {gameField.buildInDOM(rowsSetting.number, colsSetting.number)});
    colsSetting.makeWork(() => {gameField.buildInDOM(rowsSetting.number, colsSetting.number)});
    speedSetting.makeWork(() => {gameSpeed = 2000/speedSetting.number});
}

function showScore(scoreElement, snake) {
    const currentScore = snake.getMaxElement().value;
    scoreElement.innerText = `score is ${currentScore}.`
}

function showSettings(showSettingsElement, rows, cols, gameSpeed) {
    showSettingsElement.innerText = `game-field size is ${rows}x${cols}, speed is ${gameSpeed}.`
}

function startGame(rowsSetting, colsSetting, speedSetting, gameField, controls, snake) {
    let gameSpeed = 200;
    rowsSetting.makeWork(() => {gameField.buildInDOM(rowsSetting.number, colsSetting.number)});
    colsSetting.makeWork(() => {gameField.buildInDOM(rowsSetting.number, colsSetting.number)});
    speedSetting.makeWork(() => {gameSpeed = 2000/speedSetting.number});
    showSettings(showSettingsElement, rowsSetting.number, colsSetting.number, speedSetting.number);
    snake.setBaseArray(gameField.setupArray());
    snake.setInitialSnakeNumbers();
    snake.generateFoodCell();
    snake.drawSnake(gameField.targetDOMel);
    controls.getKey(snake);
    unpause(snake, gameSpeed);
}

const isMobile = (screen.width < 500) ? true : false;
const maxRows = (isMobile) ? 10 : 15;
const maxCols = (isMobile) ? 10 : 15;
const rowsSetting = new Setting(10, document.querySelector("#rows-decrement"), document.querySelector("#rows-increment"), document.querySelector("#rows-show-num"), 3, maxRows);
const colsSetting = new Setting(10, document.querySelector("#cols-decrement"), document.querySelector("#cols-increment"), document.querySelector("#cols-show-num"), 3, maxCols);
const speedSetting = new Setting(10, document.querySelector("#speed-decrement"), document.querySelector("#speed-increment"), document.querySelector("#speed-show-num"), 1, 50);
const gameField = new GameField(rowsSetting.number, colsSetting.number, document.querySelector("#game-field"));
const controls = new Controls("right");
const snake = new Snake([], controls.key);
if (isMobile) {
    mobileButtons.style.setProperty("display", "grid");
    controls.getKeyMobile(snake, mobileButtonRight);
    controls.getKeyMobile(snake, mobileButtonLeft);
    controls.getKeyMobile(snake, mobileButtonUp);
    controls.getKeyMobile(snake, mobileButtonDown);
    contolsDescription.innerText = "use arrow buttons below to control the snake."
}

startSettings(rowsSetting, colsSetting, speedSetting, gameField);

// UI buttons functionality
let gameLoopInterval;
let isPaused;

function unpause(snake, gameSpeed) {
    gameLoopInterval = setInterval(() => {gameLoop(snake); showScore(showScoreElement, snake)}, gameSpeed);
    isPaused = false;
    overlayText.style.setProperty("opacity", "0")
    setTimeout(() => {overlayText.style.setProperty("display", "none");}, animationSpeed/2);
}

function pause() {
    clearInterval(gameLoopInterval);
    isPaused = true;
    overlayText.style.setProperty("display", "flex");
    overlayText.style.setProperty("opacity", "1");
}

function gameOver() {
    const root = document.querySelector(':root');
    root.style.setProperty('--blur-color', "var(--red)");
    root.style.setProperty('--blur-radius', "3px");
    clearInterval(gameLoopInterval);
    isPaused = true;
    gameOverScore.innerText = `your score was ${snake.getMaxElement().value}.`
    mobileButtons.style.setProperty("opacity", "0");
    gameFieldAux.style.setProperty("opacity", "0");
    setTimeout(() => {
        gameViewport.style.setProperty("opacity", "0");
        setTimeout(() => {
            gameViewport.style.setProperty("display", "none");
            gameOverScreen.style.setProperty("display", "flex");
            setTimeout(() => {gameOverScreen.style.setProperty("opacity", "1");}, 1)
        }, animationSpeed)
    }, 1000)
    setTimeout(() => {
        mobileButtons.style.setProperty("opacity", "1");
        gameFieldAux.style.setProperty("opacity", "1");
        root.style.setProperty('--blur-color', "var(--green)");
    root.style.setProperty('--blur-radius', "20px");
    }, 2000)
}

function goToMainMenu() {
    clearInterval(gameLoopInterval);
    isPaused = true;
    gameViewport.style.opacity='0';
    setTimeout(() => {
        gameViewport.style.setProperty("display", "none");
        mainMenu.style.setProperty("display", "flex");
        setTimeout(() => {mainMenu.style.opacity='1';}, 1)
    }, animationSpeed)
}
function gameOverToMainMenu() {
    gameOverScreen.style.opacity='0';
    setTimeout(() => {
        gameOverScreen.style.setProperty("display", "none");
        mainMenu.style.setProperty("display", "flex");
        setTimeout(() => {mainMenu.style.opacity='1';}, 1)
    }, animationSpeed)
}
function gameOverToRestart() {
    gameOverScreen.style.opacity='0';
    isPaused = false;
    startGame(rowsSetting, colsSetting, speedSetting, gameField, controls, snake);
    setTimeout(() => {
        gameOverScreen.style.setProperty("display", "none");
        gameViewport.style.setProperty("display", "flex");
        setTimeout(() => {gameViewport.style.opacity='1';}, 1)
    }, animationSpeed)
}
settingsButton.addEventListener("click", () => {
    let settingsMenuVisibility = settingsMenu.style.visibility;
    if (settingsMenuVisibility === "hidden") {settingsMenu.style.visibility = "visible"; settingsMenu.style.opacity = "1";}
    else {setTimeout(() => {settingsMenu.style.visibility = "hidden";}, animationSpeed);  settingsMenu.style.opacity = "0";};
})
startGameButton.addEventListener("click", () => {
    mainMenu.style.opacity='0';
    isPaused = false;
    startGame(rowsSetting, colsSetting, speedSetting, gameField, controls, snake);
    setTimeout(() => {
        mainMenu.style.setProperty("display", "none");
        gameViewport.style.setProperty("display", "flex");
        setTimeout(() => {gameViewport.style.opacity='1';}, 1)
    }, animationSpeed)
})
mainMenuButton.addEventListener("click", () => {goToMainMenu()});
pauseButton.addEventListener("click", () => {
    if (isPaused) {unpause(snake,2000/speedSetting.number)}
    else {pause()}
})

gameOverMainMenu.addEventListener("click", () => {
    gameOverToMainMenu();
})

gameOverRestart.addEventListener("click", () => {
    gameOverToRestart();
})