export default class Controls {
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
    getKeyMobile(snake, button) {
        button.addEventListener("click", () => {
            if (button.id.includes("right")) {
                if (snake.direction !== "left") {
                    this.key = "right";
                    snake.direction = this.key;
                }
            } else if (button.id.includes("left")) {
                if (snake.direction !== "right") {
                    this.key = "left";
                    snake.direction = this.key;
                }
            } else if (button.id.includes("up")) {
                if (snake.direction !== "bottom") {
                    this.key = "top";
                    snake.direction = this.key;
                }
            } else if (button.id.includes("down")) {
                if (snake.direction !== "top") {
                    this.key = "bottom";
                    snake.direction = this.key;
                }
            }
        });
    }
}