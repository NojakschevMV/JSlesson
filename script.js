"use strict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money,
  start = function () {
    do {
      money = prompt("Ваш ежемесячный доход? Введите только число.");
    } while (!isNumber(money));
  };
start();

let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,  // сумма всех обязательных расходов
  income: {}, // доп. доходы
  addIncome: [], //перечислим здесь доп доходы
  expenses: {}, // перечислим здесь доп расходы
  addExpenses: [], // перечислим здесь возможные расходы
  deposit: false,
  mission: 50000,
  period: 12,
  asking: function () {
    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую.",
      "Кино, квартира"
    );
    appData.addExpenses = addExpenses.toLowerCase().split(","); //Вывод возможных расходов в виде массива
    appData.deposit = confirm("Есть ли у Вас депозит в банке?");
    
    let sum = [];
    for (let i = 0; i<2; i++){
       let exp = prompt("Введите обязательную статью расходов?");
      do {
        sum = prompt("Во сколько это обойдется?");
      } while (!isNumber(sum[i]));
      appData.expenses[exp] = +sum;
      
    }
    
  },
  getExpensesMonth: function () {
    let sum = 0;
   for (let key in appData.expenses){
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
    return appData.mission  / appData.budgetMonth;
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

};
appData.asking();
appData.getBudget();




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
for (let key in appData){
  console.log(key + ": " + appData[key]);
}
