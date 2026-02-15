const form = document.getElementById("calc-form");
const operationSelect = document.getElementById("operation");
const firstNumberInput = document.getElementById("first-num");
const secondNumberInput = document.getElementById("second-num");
const resultValue = document.getElementById("result-value");
const errorMessage = document.getElementById("error-message");
const historyList = document.getElementById("history-list");

const history = [];

const symbols = {
  add: "+",
  subtract: "-",
  multiply: "X",
  divide: "÷",
};

const calculate = (operation, a, b) => {
  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) {
        throw new Error("Cannot divide by zero.");
      }
      return a / b;
    default:
      return NaN;
  }
};

const renderHistory = () => {
  historyList.innerHTML = "";
  history.forEach((entry, index) => {
    const item = document.createElement("li");
    item.textContent = `${entry}`;
    historyList.appendChild(item);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessage.textContent = "";

  const operation = operationSelect.value;
  const first = parseFloat(firstNumberInput.value);
  const second = parseFloat(secondNumberInput.value);

  if (Number.isNaN(first) || Number.isNaN(second)) {
    errorMessage.textContent = "Please enter valid numbers.";
    return;
  }

  try {
    const result = calculate(operation, first, second);
    resultValue.textContent = result;

    const entry = `${first} ${symbols[operation]} ${second} = ${result}`;
    history.unshift(entry);

    if (history.length > 5) {
      history.pop();
    }

    renderHistory();
  } catch (error) {
    errorMessage.textContent = error.message;
  }
});