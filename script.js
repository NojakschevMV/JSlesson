"use strict";
// Переменные для каждого элемента
let btnSumm = document.getElementById("start");
let btnPls1 = document.getElementsByTagName("button" [0]);
let btnPls2 = document.getElementsByTagName("button" [1]);
let btnCheck = document.querySelector(".deposit-checkmark");
let btnaddMoney1 = document.querySelectorAll("additional_income-item" [0]);
let btnaddMoney2 = document.querySelectorAll("additional_income-item" [1]);
let resultBudgetMonth = document.getElementsByClassName("budget_month-value");
let resultBudgetDay = document.getElementsByClassName("budget_day-value");
let resultExpensesMonth = document.getElementsByClassName("expenses_month-value");
let resultIncome = document.getElementsByClassName("additional_income-value");
let resultExpenses = document.getElementsByClassName("additional_expenses-value");
let resultPeriod = document.getElementsByClassName("income_period-value");
let resultMonth = document.getElementsByClassName("target_month-value");
let periodSelect = document.querySelector(".period-select");
let inputSalaryAmount = document.querySelector(".salary-amount");
let inputIncomeAmount = document.querySelector(".income-amount");
let inputIncomeTitle = document.querySelector(".income-title");
let inputExpensesAmount = document.querySelector(".expenses-amount");
let inputExpensesTitle = document.querySelector(".expenses-title");
let inputExpensesItem = document.querySelector(".additional_expenses-item");
let inputTargetAmount = document.querySelector(".target-amount");

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  start = function () {
    do {
      money = prompt("Ваш ежемесячный доход?", 30000);
    } while (!isNumber(money));
  };
start();

let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0, // сумма всех обязательных расходов
  income: {}, // доп. доходы
  addIncome: [], //перечислим здесь доп доходы
  expenses: {}, // перечислим здесь доп расходы
  addExpenses: [], // перечислим здесь возможные расходы
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 12,
  asking: function () {
    if (confirm("Есть ли у вас дополнительный заработок?")) {
      let itemIncome;
      let cashIncome;
      do {
        itemIncome = prompt(
          "Какой у вас есть дополнительный заработок",
          "Таксую"
        );
      } while (
        isNumber(itemIncome) ||
        itemIncome.trim() === "" ||
        itemIncome === "string" ||
        itemIncome === null
      );
      do {
        cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?", 10000);
      } while (!isNumber(cashIncome));

      appData.income[itemIncome] = cashIncome;
    }
    let addExpenses;
    do {
      addExpenses = prompt(
        "Перечислите возможные расходы за рассчитываемый период через запятую.",
        "Кино, квартира, хомяки, жена"
      );
    } while (
      isNumber(addExpenses) ||
      addExpenses.trim() === "" ||
      addExpenses === "string" ||
      addExpenses === null
    );
    appData.addExpenses = addExpenses.toLowerCase().split(","); //Вывод возможных расходов в виде массива
    appData.deposit = confirm("Есть ли у Вас депозит в банке?");

    let sum = [];
    for (let i = 0; i < 2; i++) {
      let exp;
      do {
        exp = prompt("Введите обязательную статью расходов?", "текст");
      } while (
        isNumber(exp) ||
        exp.trim() === "" ||
        exp === "string" ||
        exp === null
      );
      do {
        sum = prompt("Во сколько это обойдется?", 5000);
      } while (!isNumber(sum[i]));
      appData.expenses[exp] = +sum;
    }
  },
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += +appData.expenses[key];
    }
    return sum;
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.getExpensesMonth();
    appData.budgetDay = appData.budgetMonth / 30;
    appData.period = appData.mission / appData.budgetMonth;
  },
  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay <= 600 && appData.budgetDay > 0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else if (appData.budgetDay < 0) {
      return "Что то пошло не так";
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt("Какой годовой процент?", "10");
      } while (!isNumber(money));
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена", "10000");
      } while (!isNumber(money));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};
appData.asking();
appData.getBudget();
appData.getInfoDeposit();

console.log("Расходы за месяц " + appData.getExpensesMonth() + " руб.");
//console.log(addExpenses.length);  длинна строки
if (appData.period > 0) {
  console.log(
    "Срок достижения цели " + Math.floor(appData.period) + " месяцев"
  );
} else {
  console.log("Цель не будет достигнута");
}
//console.log("Бюджет на день " + Math.floor(appData.budgetDay) + " рублей");
console.log(appData.getStatusIncome());

console.log("Наша программа включает в себя данные: ");
for (let key in appData) {
  console.log(key + ": " + appData[key]);
}

let str = String(appData.addExpenses);
str = str.trim();
let splits = str.split(", ");
let stringItog = "";

for (let i = 0; i < splits.length; i++) {
  let Name = splits[i];
  let First = Name.substring(0, 1).toUpperCase();
  let Leftovers = Name.substring(1, Name.length);
  stringItog += First + Leftovers + ", ";
}

console.log(stringItog);