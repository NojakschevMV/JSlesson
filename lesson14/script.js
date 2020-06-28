"use strict";
// Переменные для каждого элемента
let start = document.getElementById("start");
let cancel = document.getElementById("cancel");
let btnPlus = document.getElementsByTagName("button");
let incomePlus = btnPlus[0];
let expensesPlus = btnPlus[1];
let depositCheck = document.querySelector(".deposit-checkmark");
let additionalIncomeItem = document.querySelectorAll(".additional_income-item");
let budgetMonthValue = document.getElementsByClassName("budget_month-value")[0];
let budgetDayValue = document.getElementsByClassName("budget_day-value")[0];
let expensesMonthValue = document.getElementsByClassName(
  "expenses_month-value"
)[0];
let additionalIncomeValue = document.getElementsByClassName(
  "additional_income-value"
)[0];
let additionalExpensesValue = document.getElementsByClassName(
  "additional_expenses-value"
)[0];
let incomePeriodValue = document.getElementsByClassName(
  "income_period-value"
)[0];
let targetMonthValue = document.getElementsByClassName("target_month-value")[0];
let periodSelect = document.querySelector(".period-select");
let periodAmount = document.querySelector(".period-amount");
let salaryAmount = document.querySelector(".salary-amount");
let incomeTitle = document.querySelector(".income-title");
let expensesItems = document.querySelectorAll(".expenses-items");
let expensesTitle = document.querySelector(".expenses-title");
let additionalExpensesItem = document.querySelector(
  ".additional_expenses-item"
);
let targetAmount = document.querySelector(".target-amount");
let incomeItems = document.querySelectorAll(".income-items");

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0; // сумма всех обязательных расходов
  this.income = {}; // доп. доходы
  this.incomeMonth = 0;
  this.addIncome = []; //перечислим здесь доп доходы
  this.expenses = {}; // перечислим здесь доп расходы
  this.addExpenses = []; // перечислим здесь возможные расходы
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
};
AppData.prototype.startCondition = function () {
  if (salaryAmount.value !== "") {
    start.disabled = false;
    start.style.opacity = 1;
  } else {
    start.disabled = true;
    start.style.opacity = 0.4;
  }
};
AppData.prototype.start = function () {
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();

  this.showResult();

  //salaryAmount.disabled = true;
  //
  document.querySelectorAll('.block').forEach(function (item, node) {
    item.disabled = true;
  });
  start.setAttribute('style', 'display:none');
  cancel.setAttribute('style', 'display:block');
};
AppData.prototype.showResult = function () {
  let _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.ceil(this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(", "); //разобьем массив на строку
  additionalIncomeValue.value = this.addIncome.join(", ");
  targetMonthValue.value = Math.ceil(this.getTargetMonth()); // округляет в большую сторону
  incomePeriodValue.value = this.calcPeriod();

  let newPeriodValue = function () {
    incomePeriodValue.value = _this.budgetMonth * periodSelect.value;
  };

  periodSelect.addEventListener("input", newPeriodValue);
};
AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll(".expenses-items");
  if (expensesItems.length === 3) {
    expensesPlus.style.display = "none";
  }
};
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItems = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
  incomeItems = document.querySelectorAll(".income-items");
  if (incomeItems.length === 3) {
    incomePlus.style.display = "none";
  }
};
AppData.prototype.getExpenses = function () {
  let _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector(".expenses-title").value;
    let cashExpenses = item.querySelector(".expenses-amount").value;
    if (itemExpenses !== "" && cashExpenses !== "") {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function () {
  let _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector(".income-title").value;
    let cashIncome = item.querySelector(".income-amount").value;
    if (itemIncome !== "" && cashIncome !== "") {
      _this.income[itemIncome] = cashIncome;
    }
  });
  for (let key in _this.income) {
    _this.incomeMonth += +_this.income[key];
  }
};
AppData.prototype.getAddExpenses = function () {
  let _this = this;
  let addExpenses = additionalExpensesItem.value.split(","); // Значение строки сразу в массив
  addExpenses.forEach(function (item) {
    //Перебираем массив
    item = item.trim(); // убрать пробелы в возможных расходах
    if (item !== "") {
      _this.addExpenses.push(item); // Запушиваем значение в массив
    }
  });
};
AppData.prototype.getAddIncome = function () {
  let _this = this;
  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      _this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getExpensesMonth = function () {
  let _this = this;
  let sum = 0;
  for (let key in _this.expenses) {
    sum += +_this.expenses[key];
  }
  this.expensesMonth = sum;
};
AppData.prototype.getBudget = function () {
  this.budgetMonth =
    this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = this.budgetMonth / 30;
};
AppData.prototype.getTargetMonth = function () {

  return targetAmount.value / this.budgetMonth;
};
AppData.prototype.addPeriodSelect = function () {
  periodAmount.textContent = periodSelect.value;

};
AppData.prototype.calcPeriod = function () {

  return this.budgetMonth * periodSelect.value;
};
//сброс ------------------------------------------------------------------------------------
AppData.prototype.reset = function () {

  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0; // сумма всех обязательных расходов
  this.income = {}; // доп. доходы
  this.incomeMonth = 0;
  this.addIncome = []; //перечислим здесь доп доходы
  this.expenses = {}; // перечислим здесь доп расходы
  this.addExpenses = []; // перечислим здесь возможные расходы
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;

  document.querySelectorAll('.block').forEach(function (item, node) {
    item.value = '';
  });
  this.showResult();

  document.querySelectorAll('.block').forEach(function (item, node) {
    item.disabled = false;
  });
  start.setAttribute('style', 'display:block');
  cancel.setAttribute('style', 'display:none');
  //Кнопка изначально заблокирована
  start.disabled = true;
  start.style.opacity = 0.4;
  targetMonthValue.value = "Cрок";
};

AppData.prototype.eventListeners = function () {
  salaryAmount.addEventListener("input", appData.startCondition);
  start.addEventListener("click", appData.start.bind(appData));
  cancel.addEventListener("click", appData.reset.bind(appData));
  expensesPlus.addEventListener("click", appData.addExpensesBlock);
  incomePlus.addEventListener("click", appData.addIncomeBlock);
  periodSelect.addEventListener("input", appData.addPeriodSelect);
};

let appData = new AppData();
appData.eventListeners();
start.disabled = true;
start.style.opacity = 0.4;





//Обработчик событий

//Кнопка изначально заблокирована







/*getInfoDeposit: function () {
  if (appData.deposit) {
    do {
      appData.percentDeposit = prompt("Какой годовой процент?", "10");
    } while (!isNumber(money));
    do {
      appData.moneyDeposit = prompt("Какая сумма заложена", "10000");
    } while (!isNumber(money));
  }
},*/
/*getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay <= 600 && appData.budgetDay > 0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else if (appData.budgetDay < 0) {
      return "Что то пошло не так";
    }
  },*/