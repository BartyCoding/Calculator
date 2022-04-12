let buttons = document.querySelectorAll(".button")
let operators = document.querySelectorAll(".symbol")
let result = document.querySelector("#result")
let operator = document.querySelector("#operator")
let current = ["", "", ""] //num1, num2, operator
let currentNumber = 0
let previousAnswer = 0

let operatorSymbols = { "+": "&plus;", "-": "&minus;", "*": "&times", "/": "&divide;", "=": "&equals;" }

let reset = () => {
    current = ["", "", ""]
    currentNumber = 0
    operator.textContent = ""
}

let throwError = () => {
    result.textContent = "ERROR"
    reset()
}

let calculateAnswer = () => {
    try {
        let answer = eval(current[0] + current[2] + current[1])
        if (isNaN(answer)) { throw "Not a number" }
        result.textContent = Math.round(answer * 100) / 100
        previousAnswer = answer
        reset()
        operator.innerHTML = operatorSymbols["="]
    } catch (error) {
        throwError()
    }
}

let numberClick = id => {
    if (currentNumber === 0) { operator.innerHTML = "" }
    current[currentNumber] += id
    result.textContent = current[currentNumber]
}

let operatorClick = id => {
    if (id !== "=") {
        if (current[0] !== "" && current[1] !== "") {
            calculateAnswer()
        }
        if (current[0] === "") { current[0] = previousAnswer }
        current[2] = id
        operator.innerHTML = operatorSymbols[current[2]]
        currentNumber = 1
    } else {
        if (current[0] !== "" && current[1] !== "") {
            calculateAnswer()
        }
        else {
            throwError()
        }
    }
}

for (let i = 0; i < buttons.length; i++) {
    let currentButton = buttons[i]
    currentButton.addEventListener("click", () => {
        numberClick(currentButton.id)
    })
}

for (let i = 0; i < operators.length; i++) {
    let currentOperator = operators[i]
    currentOperator.addEventListener("click", () => {
        operatorClick(currentOperator.id)
    })
}

document.addEventListener("keypress", e => {
    if (!isNaN(parseInt(e.key)) || e.key === ".") { numberClick(e.key) }
    else if (operatorSymbols[e.key]) { operatorClick(e.key) }
    else if (e.key === "Enter") { operatorClick("=") }
})