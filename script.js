class Calculator {
    constructor(preOperandText, curOperandText){
        this.preOperandText = preOperandText
        this.curOperandText = curOperandText
        this.clear()
    }

clear() {
 this.curOperand = ''
 this.preOperand = ''
 this.operation = undefined
}

delete() {
    this.curOperand = this.curOperand.toString().slice(0, -1)
}

appendNumber(number) {
    if( number === '.' && this.curOperand.includes('.')) return
    this.curOperand = this.curOperand.toString() + number.toString()
}

chooseOperation(operation) {
if ( this.curOperand === '') return
if ( this.preOperand !== '') {
    this.compute()
}
this.operation = operation
this.preOperand = this.curOperand
this.curOperand = ''
}

compute(){
let computation
const prev = parseFloat(this.preOperand)
const current = parseFloat(this.curOperand)
if(isNaN(prev) || isNaN(current)) return
switch(this.operation){
    case '+':
        computation = prev + current
        break
    case '-':
        computation = prev - current
        break
    case '*':
        computation = prev * current
        break
    case '/':
        computation = prev / current
        break
    default:
        return
}
this.curOperand = computation
this.operation = undefined
this.preOperand = ''
}


updateDisplay() {
 this.curOperandText.innerText = this.curOperand
 if(this.operation != null){
    this.preOperandText.innerText = 
    `${this.preOperand} ${this.operation}`
 }else {
    this.preOperandText.innerText = ''
 }

}
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalbutton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const preOperandText = document.querySelector('[data-pre-operand]')
const curOperandText = document.querySelector('[data-cur-operand]')

const calculator = new Calculator(preOperandText ,curOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalbutton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})