const displayTop = document.getElementById("display-top");
const displayBottom = document.getElementById("display-bottom");
const operandButtons = document.querySelectorAll("[data-operand]");
const numberButtons = document.querySelectorAll("[data-number]");
const clearButton = document.getElementById("clear-btn");
const deleteButton = document.getElementById("delete-btn");
const equalsButton = document.getElementById("equals-btn");
const decimalButton = document.getElementById("decimal-btn");

let numberA = "";
let numberB = "";
let savedOperator = null;

deleteButton.onclick = () => deleteEntry();
clearButton.onclick = () => clearCalculator();
decimalButton.onclick = () => appendDecimal();
equalsButton.onclick = () => calculationResult();

numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);
operandButtons.forEach((button) =>
  button.addEventListener("click", () => appendOperator(button.textContent))
);

appendDecimal = () => {
  if (displayBottom.textContent.includes(".")) return;
  displayBottom.textContent += ".";
};

appendNumber = (n) => {
  if (displayBottom.textContent === "0") {
    displayBottom.textContent = "";
  }
  displayBottom.textContent += n;
};

appendOperator = (operand) => {
  if (savedOperator !== null) calculationResult();
  numberA = displayBottom.textContent;
  savedOperator = operand;
  displayTop.textContent = `${numberA} ${savedOperator}`;
  displayBottom.textContent = "";
  document.getElementById("delete-btn").disabled = false;
};

clearCalculator = () => {
  displayBottom.textContent = "0";
  displayTop.textContent = "";
  numberA = "";
  numberB = "";
  savedOperator = null;
  document.getElementById("delete-btn").disabled = false;
  document.getElementById("equals-btn").disabled = false;
};

deleteEntry = () => {
  displayBottom.textContent = displayBottom.textContent.slice(0, -1);
};

roundNumber = (n) => {
  return Math.round(n * 10000) / 10000;
};

calculationResult = () => {
  if (savedOperator === "/" && displayBottom.textContent === "0") {
    savedOperator = null;
    displayBottom.textContent = "Infinity";
    document.getElementById("equals-btn").disabled = true;
    document.getElementById("delete-btn").disabled = true;
    return;
  }
  numberB = displayBottom.textContent;
  displayBottom.textContent = roundNumber(
    completeCalculation(numberA, savedOperator, numberB)
  );

  document.getElementById("delete-btn").disabled = true;
  displayTop.textContent = `${numberA} ${savedOperator} ${numberB}`;
  savedOperator = null;
};

completeCalculation = (a, operand, b) => {
  a = Number(a);
  b = Number(b);
  console.log(operand, a, b);
  switch (operand) {
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
