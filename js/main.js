const displayTop = document.getElementById("display-top");
const displayBottom = document.getElementById("display-bottom");
const operandButtons = document.querySelectorAll("[data-operand]");
const numberButtons = document.querySelectorAll("[data-number]");
const clearButton = document.getElementById("clear-btn");
const deleteButton = document.getElementById("delete-btn");
const equalsButton = document.getElementById("equals-btn");

let numberA = "";
let numberB = "";
let savedOperator = "";
let result = null;
let haveDecimal = false;

clearButton.onclick = () => clearCalculator();
deleteButton.onclick = () => deleteNumber();
equalsButton.onclick = () => completeOperation(savedOperator);

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.textContent === "." && !haveDecimal) {
      haveDecimal = true;
    } else if (e.target.textContent === "." && haveDecimal) {
      return;
    }
    numberB += e.target.textContent;
    displayBottom.innerText = numberB;
  });
});

operandButtons.forEach((operand) =>
  operand.addEventListener("click", (e) => {
    if (!numberB) return;
    haveDecimal = false;
    const operandSelection = e.target.innerText;
    if (numberA && numberB && savedOperator) {
      completeOperation();
    } else {
      result = Number(numberB);
    }
    savedOperator = operandSelection;
    clearCalculator(savedOperator);
    console.log(result);
  })
);

clearCalculator = (name = "") => {
  numberA += numberB + " " + name + "";
  displayTop.textContent = numberA;
  displayBottom.textContent = "";
  numberB = "";
};

completeOperation = (savedOperator, a, b) => {
  a = parseFloat(numberA);
  b = parseFloat(numberB);
  console.log(savedOperator, a, b);
  switch (savedOperator) {
    case "+":
      return addition(a, b);

    case "-":
      return subtract(a, b);

    case "/":
      return divide(a, b);

    case "*":
      return multiply(a, b);
  }
};

deleteNumber = () => {};
addDecimal = () => {};

addition = (a, b) => {
  return a + b;
};

subtract = (a, b) => {
  return a - b;
};

multiply = (a, b) => {
  return a * b;
};

divide = (a, b) => {
  return a / b;
};
