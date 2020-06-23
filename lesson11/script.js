"use strict";
// Переменные для каждого элемента
let start = document.getElementById("start");
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

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0, // сумма всех обязательных расходов
  income: {}, // доп. доходы
  incomeMonth: 0,
  addIncome: [], //перечислим здесь доп доходы
  expenses: {}, // перечислим здесь доп расходы
  addExpenses: [], // перечислим здесь возможные расходы
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  // Проверка что поле доход не пустое
  startCondition: function () {
    if (salaryAmount.value !== "") {
      start.disabled = false;
      start.style.opacity = 1;
    } else {
      start.disabled = true;
      start.style.opacity = 0.4;
    }
  },

  start: function () {
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.ceil(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(", "); //разобьем массив на строку
    additionalIncomeValue.value = appData.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(appData.getTargetMonth()); // округляет в большую сторону
    incomePeriodValue.value = appData.calcPeriod();

    let newPeriodValue = function () {
      incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
    };

    periodSelect.addEventListener("input", newPeriodValue);
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomePlus.style.display = "none";
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        appData.income[itemIncome] = cashIncome;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(","); // Значение строки сразу в массив
    addExpenses.forEach(function (item) {
      //Перебираем массив
      item = item.trim(); // убрать пробелы в возможных расходах
      if (item !== "") {
        appData.addExpenses.push(item); // Запушиваем значение в массив
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += +appData.expenses[key];
    }
    appData.expensesMonth = sum;
  },

  getBudget: function () {
    appData.budgetMonth =
      appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
  },
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
  addPeriodSelect: function () {
    periodAmount.textContent = periodSelect.value;
  },

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
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
};
//Обработчик событий
salaryAmount.addEventListener("input", appData.startCondition);
start.addEventListener("click", appData.start);
expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("input", appData.addPeriodSelect);
//Кнопка изначально заблокирована
start.disabled = true;
start.style.opacity = 0.4;