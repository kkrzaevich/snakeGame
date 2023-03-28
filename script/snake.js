const printButt = () => {console.log("butt");}

class Printer {
    constructor(parameter) {
        this.parameter = parameter;
    }
    firstLayer(inputFunc) {
        inputFunc();
    }
}

class Scanner {
    constructor(scanValue) {
        this.scanValue = scanValue;
    }
    changeScanValue() {
        console.log("Changed scan value");
        this.scanValue++;
    }
}

// const firstLayer = (inputFunc) => {inputFunc();}

// const secondLayer = (inputFunc) => {firstLayer(inputFunc())}

const printer = new Printer(1);
const scanner = new Scanner(3);

printer.firstLayer(() => {scanner.changeScanValue()});