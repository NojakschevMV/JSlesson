"use strict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = "фриланс";
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую.", 'Кино, квартира'
);
let deposit = confirm("Есть ли у Вас депозит в банке?");

let mission = 100000;
let period = 12;
let budgetDay;
let expenses1, expenses2;
let showTypeOf = function (data) {
  console.log(data, typeof data);
};

let start = function () {
  do {
    money = prompt("Ваш ежемесячный доход? Введите только число.");
  }
  while (!isNumber(money));
};
start();


let getExpensesMonth = function () {
  let sum;
  let sum1;
  let sum2;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      let expenses1 = prompt("Введите обязательную статью расходов 1?");
      do {
        sum1 = prompt("Во сколько это обойдется?");
      }
      while (!isNumber(sum1));
    } else if (i === 1) {
      let expenses2 = prompt("Введите обязательную статью расходов 2?");
      do {
        sum2 = prompt("Во сколько это обойдется?");
      }
      while (!isNumber(sum2));
    }
    sum = Number(sum1) + Number(sum2);
  }
  return sum;
};

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function () {
  return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function () {
  return mission / accumulatedMonth;
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
console.log("Расходы за месяц " + expensesAmount + " руб.");
//console.log(addExpenses.length);  длинна строки
if (getTargetMonth() > 0) {
  console.log(
    "Срок достижения цели " +
    Math.floor(getTargetMonth()) +
    " месяцев"
  );
} else {
  console.log(
    "Цель не будет достигнута"
  );
}
console.log("Бюджет на день " + Math.floor(budgetDay) + " рублей");
console.log(getStatusIncome());