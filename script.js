// dom variables
// calculator class
class Calculator {
  constructor(previousOperationTxt,currentOperationTxt){
    this.previousOperationTxt = previousOperationTxt;
    this.currentOperationTxt = currentOperationTxt;
    this.clearDisplay();
  }
  deleteItem(){
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
  }
  getDisplayNumber(number){
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if(isNaN(integerDigits)){
      integerDisplay = '';
    }else{
      integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits:0});
    }
    if(decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`
    }else{
      return integerDisplay
    }
    // const floatNumber = parseFloat(number);
    // if(isNaN(floatNumber)) return '';
    // return floatNumber.toLocaleString('en');
  }
  updateDisplay(){
    this.currentOperationTxt.innerText = this.getDisplayNumber(this.currentOperand);
    if(this.operation !== null){
      this.previousOperationTxt.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      console.log(this.previousOperand);
    }else{
      this.previousOperationTxt.innerText ='';
    }
    
  }
  clearDisplay(){
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = '';
  }
  compute(){
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(current) || isNaN(prev))return
    switch(this.operation){
      case '+':
        computation = prev + current;
      break;
      case '÷':
        computation = prev / current;
      break;
      case '-':
        computation = prev - current;
      break;
      case '*':
        computation = prev * current;
      break;
      default:
        return;      
    }
    this.currentOperand = computation;
    this.operation = '';
    this.previousOperand ='';
  }
  appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.'))return
    // this.currentOperand += number.toString();
    this.currentOperand = this.currentOperand.toString() +  number.toString();
    
    // this.currentOperand += this.currentOperand;
  }
  chooseOperation(operation){
    if(this.currentOperand === '')return
    if(this.previousOperand !== ''){
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }
}

const previousOperationTxt = document.querySelector('[data-previous-operand]');
const currentOperationTxt = document.querySelector('[data-current-operand]');
const digitBtns = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const allClearBtn = document.querySelector('[data-allClear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');
// console.log(equalsBtn)
const calculator = new Calculator(previousOperationTxt,currentOperationTxt);
digitBtns.forEach(button =>{
  button.addEventListener('click',()=>{
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationBtn.forEach(button =>{
  button.addEventListener('click',()=>{
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener('click',button =>{
  calculator.compute();
  calculator.updateDisplay();
});

allClearBtn.addEventListener('click',button =>{
  calculator.clearDisplay()
  calculator.updateDisplay();
});
deleteBtn.addEventListener('click',button =>{
  calculator.deleteItem();
  calculator.updateDisplay();
});








