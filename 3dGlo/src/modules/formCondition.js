    // Валидация форм Калькулятора

    const formCondition = () => {
      const calcSquare = document.querySelector(".calc-square"),
        calcCount = document.querySelector(".calc-count"),
        calcDay = document.querySelector(".calc-day");

      const onlyNumber = (event) => {
        let target = event.target;
        target.value = target.value.replace(/\D/g, "");
      };

      calcSquare.addEventListener("input", onlyNumber);
      calcCount.addEventListener("input", onlyNumber);
      calcDay.addEventListener("input", onlyNumber);
    };

    export default formCondition;