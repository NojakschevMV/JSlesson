"use strict";
// Переменные для каждого элемента
const start = document.getElementById("start");
const cancel = document.getElementById("cancel");
const btnPlus = document.getElementsByTagName("button");
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];
const depositCheck = document.getElementById("deposit-check");
const additionalIncomeItem = document.querySelectorAll(".additional_income-item");
const budgetMonthValue = document.getElementsByClassName("budget_month-value")[0];
const budgetDayValue = document.getElementsByClassName("budget_day-value")[0];
const expensesMonthValue = document.getElementsByClassName(
  "expenses_month-value"
)[0];
const additionalIncomeValue = document.getElementsByClassName(
  "additional_income-value"
)[0];
const additionalExpensesValue = document.getElementsByClassName(
  "additional_expenses-value"
)[0];
const incomePeriodValue = document.getElementsByClassName(
  "income_period-value"
)[0];
const targetMonthValue = document.getElementsByClassName("target_month-value")[0];
const periodSelect = document.querySelector(".period-select");
const periodAmount = document.querySelector(".period-amount");
const salaryAmount = document.querySelector(".salary-amount");
const incomeTitle = document.querySelector(".income-title");
let expensesItems = document.querySelectorAll(".expenses-items");
const expensesTitle = document.querySelector(".expenses-title");
const additionalExpensesItem = document.querySelector(
  ".additional_expenses-item"
);
const targetAmount = document.querySelector(".target-amount");
let incomeItems = document.querySelectorAll(".income-items");
const depositBank = document.querySelector(".deposit-bank");
const depositAmount = document.querySelector(".deposit-amount");
const depositPercent = document.querySelector(".deposit-percent");

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}; //Проверка на число

class AppData {
  constructor() {
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
  }

  startCondition() {
    if (salaryAmount.value !== "") {
      start.disabled = false;
      start.style.opacity = 1;
    } else {
      start.disabled = true;
      start.style.opacity = 0.4;
    }
  }
  start() {
    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();

    document.querySelectorAll('.block').forEach(function (item, node) { //Заблокировать все импуты class = '.block' 
      item.disabled = true;
    });
    start.setAttribute('style', 'display:none');
    cancel.setAttribute('style', 'display:block');
  }
  showResult() {
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
  }
  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  }
  addIncomeBlock() {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomePlus.style.display = "none";
    }
  }


  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== "" && itemAmount !== "") {
        this[startStr][itemTitle] = itemAmount;
      }
    };
    expensesItems.forEach(count);
    incomeItems.forEach(count);
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses() {
    let _this = this;
    let addExpenses = additionalExpensesItem.value.split(","); // Значение строки сразу в массив
    addExpenses.forEach(function (item) {
      //Перебираем массив
      item = item.trim(); // убрать пробелы в возможных расходах
      if (item !== "") {
        _this.addExpenses.push(item); // Запушиваем значение в массив
      }
    });
  }
  getAddIncome() {
    let _this = this;
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        _this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    let _this = this;
    let sum = 0;
    for (let key in _this.expenses) {
      sum += +_this.expenses[key];
    }
    this.expensesMonth = sum;
  }
  getBudget() {

    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = this.budgetMonth / 30;
  }
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }
  addPeriodSelect() {
    periodAmount.textContent = periodSelect.value;
  }
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  reset() { //сброс 
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
    depositPercent.style.display = "none";
    depositCheck.checked = false; // убирает галочку
    depositBank.style.display = "none";
    depositAmount.style.display = "none";
    depositBank.value = '';
    depositAmount.value = '';
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  percentCondition() {
    if (depositPercent.value !== "" && depositPercent.value < 100 && depositPercent.value > 0 && salaryAmount.value !== "") {
      start.disabled = false;
      start.style.opacity = 1;

    } else {
      start.disabled = true;
      start.style.opacity = 0.4;
      alert("Введите корректное значение в поле проценты");
    }
  }
  changePercent() {
    const valueSelect = this.value; //здесь this это блок банков
    if (valueSelect === 'other') {
      depositPercent.style.display = "inline-block";
      this.percentDeposit = depositPercent.value;
      start.disabled = true;
      start.style.opacity = 0.4;
    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = "none";
    }
  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = "inline-block";
      depositAmount.style.display = "inline-block";
      this.deposit = true;

      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositPercent.style.display = "none";
      depositPercent.value = '';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  eventListeners() { //Обработчик событий
    salaryAmount.addEventListener("input", this.startCondition);
    depositPercent.addEventListener("input", this.percentCondition);
    start.addEventListener("click", this.start.bind(this));
    cancel.addEventListener("click", this.reset.bind(this));
    expensesPlus.addEventListener("click", this.addExpensesBlock);
    incomePlus.addEventListener("click", this.addIncomeBlock);
    periodSelect.addEventListener("input", this.addPeriodSelect);
    depositCheck.addEventListener('change', this.depositHandler.bind(this)); //change - смена галочки появилась/исчезла
    //Кнопка изначально заблокирована
    start.disabled = true;
    start.style.opacity = 0.4;
  }
}

const appData = new AppData();
appData.eventListeners();





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