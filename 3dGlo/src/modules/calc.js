const calc = (price) => {
  const calcBlock = document.querySelector(".calc-block"),
    calcType = document.querySelector(".calc-type"),
    calcSquare = document.querySelector(".calc-square"),
    calcDay = document.querySelector(".calc-day"),
    calcCount = document.querySelector(".calc-count"),
    totalValue = document.getElementById("total");

  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1;
    let typeValue = calcType.options[calcType.selectedIndex].value; //значение выбраного списка в значении 'options'
    //если выбрана кв то =1 если дом то =1.4 если офис то =2 (из верстки)
    let squareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      //таковы условия: если больше 1 комнаты то +10%
      countValue += (calcCount.value - 1) / 10;
    }
    if (calcDay.value && calcDay.value < 5) {
      //таковы условия: если срок <5 дней то цена*2
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      //если срок от 5 до 10 дней то цена*1,5
      dayValue *= 1.5;
    } //если срок от 10 дней то цена нормальная *1

    if (typeValue && squareValue) {
      //заполненые поля возвращают true
      total = price * typeValue * squareValue * countValue * dayValue;
    }
    totalValue.textContent = total;
  };

  calcBlock.addEventListener("change", (event) => {
    //change - что то меняется в блоке калькулятора
    let target = event.target;

    if (target.matches("select") || target.matches("input")) {
      countSum();
    }
  });
};

export default calc;