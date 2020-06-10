"use strict";
let money = +prompt("Ваш ежемесячный доход? Введите только число.");
let income = "фриланс";
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую."
);
let deposit = confirm("Есть ли у Вас депозит в банке?");
let expenses1 = prompt("Введите обязательную статью расходов?");
let amount1 = +prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов?");
let amount2 = +prompt("Во сколько это обойдется?");
let mission = 100000;
let period = 12;
let budgetDay;

let showTypeOf = function (data) {
  console.log(data, typeof data);
};

let getExpensesMonth = function (a, b) {
  return a + b;
};

let getAccumulatedMonth = function (a, b, c) {
  return money - amount1 - amount2;
};

let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);

let getTargetMonth = function (a, b) {
  return a / b;
};

budgetDay = accumulatedMonth / 30;

let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return "У вас высокий уровень дохода";
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    return "У вас средний уровень дохода";
  } else if (budgetDay <= 600 && budgetDay > 0) {
    return "К сожалению у вас уровень дохода ниже среднего";
  } else if (budgetDay < 0) {
    return "Что то пошло не так";
  }
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(",")); //Вывод возможных расходов в виде массива
console.log("Расходы за месяц " + getExpensesMonth(amount1, amount2) + " руб.");
//console.log(addExpenses.length);  длинна строки
console.log(
  "Срок достижения цели " +
    Math.floor(getTargetMonth(mission, accumulatedMonth)) +
    " месяцев"
);
console.log("Бюджет на день " + Math.floor(budgetDay) + " рублей");
console.log(getStatusIncome());
