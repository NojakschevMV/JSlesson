"use strict";

function countTimer(newYear) {
  let hello = document.querySelector("#hello"),
    day = document.querySelector("#day"),
    time = document.querySelector("#time"),
    nj = document.querySelector("#nj");

  function getTimeRemaining() {
    let datenewYear = new Date(newYear).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (datenewYear - dateNow) / 1000,
      dayOst = Math.floor(timeRemaining / 60 / 60 / 24);
    return dayOst;
  }

  function updateClock() {
    let dayOst = getTimeRemaining(),
      date = new Date(),
      dayStr,
      dayTimeStr;
    switch (date.getDay()) {
      case 0:
        dayStr = "воскресенье";
        break;
      case 1:
        dayStr = "понедельник";
        break;
      case 2:
        dayStr = "вторник";
        break;
      case 3:
        dayStr = "среда";
        break;
      case 4:
        dayStr = "четверг";
        break;
      case 5:
        dayStr = "пятница";
        break;
      case 6:
        dayStr = "суббота";
        break;
    }
    if (date.getHours() <= 10) {
      dayTimeStr = "Доброе утро";
    }
    if (date.getHours() > 10 && date.getHours() <= 17) {
      dayTimeStr = "Добрый день";
    }
    if (date.getHours() > 17 && date.getHours() <= 22) {
      dayTimeStr = "Добрый вечер";
    }
    if (date.getHours() > 22 && date.getHours() <= 4) {
      dayTimeStr = "Доброй ночи";
    }
    hello.textContent = dayTimeStr;
    day.textContent = `Сегодня ${dayStr}`;
    time.textContent = `Текущее время ${date.toLocaleTimeString('en')}`;
    nj.textContent = `До Нового Года осталось ${dayOst} дней`;

  }
  setInterval(updateClock, 1000);
}
countTimer("31 december 2020");