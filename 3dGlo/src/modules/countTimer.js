
let idTimer;
function countTimer(deadline) {
  let timerHours = document.querySelector("#timer-hours"),
    timerMinutes = document.querySelector("#timer-minutes"),
    timerSeconds = document.querySelector("#timer-seconds");

  function getTimeRemaining() {
    let dateStop = new Date(deadline).getTime(), //дата до которой отсчитываем время,
      //а getTime() преобразует его в милисекунды
      dateNow = new Date().getTime(), // текущая дата в милисекундах
      timeRemaining = (dateStop - dateNow) / 1000, // разница уже в секундах
      seconds = Math.floor(timeRemaining % 60), // остаток от деления на 60
      minutes = Math.floor((timeRemaining / 60) % 60), // секунды делим на минуты
      hours = Math.floor((timeRemaining / 60 / 60) % 24); // получаем кол-во часов
    //  day = Math.floor(timeRemaining / 60 / 60 / 24); покажет остаток дней
    return {
      timeRemaining,
      hours,
      minutes,
      seconds,
    };
  }

  function updateClock() {
    let timer = getTimeRemaining();
    if (timer.hours < 10) {
      timerHours.textContent = `0${timer.hours}`;
    } else {
      timerHours.textContent = timer.hours;
    }
    if (timer.minutes < 10) {
      timerMinutes.textContent = `0${timer.minutes}`;
    } else {
      timerMinutes.textContent = timer.minutes;
    }
    if (timer.seconds < 10) {
      timerSeconds.textContent = `0${timer.seconds}`;
    } else {
      timerSeconds.textContent = timer.seconds;
    }

    if (timer.seconds < 0) {
      timerHours.textContent = "00";
      timerMinutes.textContent = "00";
      timerSeconds.textContent = "00";
    }
    if (timer.timeRemaining < 0) {
      clearInterval(idTimer);
    }
  }
  idTimer = setInterval(updateClock, 1000);
}

export default countTimer;