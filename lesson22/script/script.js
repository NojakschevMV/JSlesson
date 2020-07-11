window.addEventListener("DOMContentLoaded", function () {
  "use strict";

  //Таймер

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
  countTimer("9 july 2020");

  //Меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu");

    const handlerMenu = () => {
      //открывает и закрывает меню
      // Пример взаимодействия с помощью классов
      menu.classList.toggle("active-menu"); // toggle - удалить/добавить класс

      /* Пример взаимодействия с помощью стилей:

      if (!menu.style.transform || menu.style.transform === `translate(-100%)`){
        menu.style.transform = `translate(0)`;
      }else{
        menu.style.transform = `translate(-100%)`;
      }*/
    };

    btnMenu.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".menu");
      if (target.classList.contains("menu")) {
        handlerMenu();
      }
    });
    menu.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest("menu");
      if (target.classList.contains("active-menu")) {
        handlerMenu();
      }
    });
  };
  toggleMenu();

  //popup открывающееся окно

  const togglePopup = () => {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn"),
      popupContent = document.querySelector(".popup-content"),
      width = document.documentElement.clientWidth;

    let idAnimation;
    let count = 0;
    let popupAnimation = function () {
      idAnimation = requestAnimationFrame(popupAnimation);
      count++;
      if (count < 40) {
        popupContent.style.left = count + "%";
      } else {
        cancelAnimationFrame(idAnimation);
      }
    };

    popupBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        popup.style.display = "block";
        if (width > 768) {
          idAnimation = requestAnimationFrame(popupAnimation);
        }
      });
    });

    popup.addEventListener("click", (event) => {
      // Если тыкнуть вне модального окна, оно закроется
      let target = event.target;
      if (target.classList.contains("popup-close")) {
        //Тыкая на крестик окно закроется
        popup.style.display = "none";
        if (width > 768) {
          popupContent.style.left = 0 + "px";
          count = 0;
        }
      } else {
        target = target.closest(".popup-content");
        /*Иначе тыкая в модальное окно мы будем получать '.popup-content', но
        если мы тыкнем вне окна то closest ненайдет '.popup-content' и вернет Null в target*/
        if (!target) {
          popup.style.display = "none";
          popupContent.style.left = 0 + "px";
          count = 0;
        }
      }
    });
  };
  togglePopup();

  // Табы

  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active"); // кнопка станет активной
          tabContent[i].classList.remove("d-none"); // если таб соответствует индексу, то отоброжаем
        } else {
          tab[i].classList.remove("active"); // кнопка перестанет быть активной
          tabContent[i].classList.add("d-none"); // если таб не соответствует индексу, скрываем
        }
      }
    };

    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab");
      /* Проверит наличие класса в таргет
      и если не найдет поднимется выше к родителю, если найдет то запишет в таргет родителя.
      если не найдет поднимется еще выше, если нигде не найдет вернет Null */

      if (target) {
        //если target !== Null
        tab.forEach((item, i) => {
          //Цикл проверки на какой таб мы тыкнули
          if (item === target) {
            toggleTabContent(i); // передаем индекс таба
          }
        });
      }
    });
  };
  tabs();

  // слайдер

  const slider = () => {
    const slider = document.querySelector(".portfolio-content"),
      slide = document.querySelectorAll(".portfolio-item"),
      btn = document.querySelectorAll(".portfolio-btn"),
      ul = document.querySelector(".portfolio-dots"),
      dot = [];
    let currentSlide = 0,
      interval;

    //Добавляем точки
    const dotAdd = () => {
      slide.forEach((elem, index) => {
        dot[index] = document.createElement("li");
        ul.appendChild(dot[index]);
        dot[index].classList.add("dot");
      });
      dot[0].classList.add("dot-active");
    };
    dotAdd();

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };

    const startSlide = (time = 3000) => {
      //значение по умолчанию 3 сек
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener("click", (event) => {
      event.preventDefault();
      let target = event.target;

      //Фильтр чтобы клик срабатывал только от кнопок и точек
      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }

      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");

      if (target.matches("#arrow-right")) {
        //если цель "стрелочка вправо"
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        //если цель "стрелочка влево"
        currentSlide--;
      } else if (target.matches(".dot")) {
        //если цель "точечки"
        dot.forEach((elem, index) => {
          // перебор всех точек чтоб узнать какая выбрана
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      //Чтобы слайдер зациклился
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });

    slider.addEventListener("mouseover", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide();
      }
    });
    slider.addEventListener("mouseout", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide(1500);
      }
    });

    startSlide(1500);
  };
  slider();

  //Наша команда

  const command = () => {
    const commandImg = document.querySelectorAll('.row')[8];

    commandImg.addEventListener("mouseover", (event) => {
      let target = event.target;
      //Фильтр чтобы клик срабатывал только от кнопок и точек
      if (target.matches(".command__photo")) {
        if (target.getAttribute('src') === "images/command/command-1.jpg") {
          target.setAttribute('src', 'images/command/command-1a.jpg');
        }
        if (target.getAttribute('src') === "images/command/command-2.jpg") {
          target.setAttribute('src', 'images/command/command-2a.jpg');
        }
        if (target.getAttribute('src') === "images/command/command-3.jpg") {
          target.setAttribute('src', 'images/command/command-3a.jpg');
        }
        if (target.getAttribute('src') === "images/command/command-4.jpg") {
          target.setAttribute('src', 'images/command/command-4a.jpg');
        }
        if (target.getAttribute('src') === "images/command/command-5.jpg") {
          target.setAttribute('src', 'images/command/command-5a.jpg');
        }
        if (target.getAttribute('src') === "images/command/command-6.jpg") {
          target.setAttribute('src', 'images/command/command-6a.jpg');
        }
      }
    });

    commandImg.addEventListener("mouseout", (event) => {
      let target = event.target;
      //Фильтр чтобы клик срабатывал только от кнопок и точек
      if (target.matches(".command__photo")) {
        if (target.getAttribute('src') === "images/command/command-1a.jpg") {
          target.setAttribute('src', 'images/command/command-1.jpg');
        }
        if (target.getAttribute('src') === "images/command/command-2a.jpg") {
          target.setAttribute('src', 'images/command/command-2.jpg');
        }
        if (target.getAttribute('src') === "images/command/command-3a.jpg") {
          target.setAttribute('src', 'images/command/command-3.jpg');
        }
        if (target.getAttribute('src') === "images/command/command-4a.jpg") {
          target.setAttribute('src', 'images/command/command-4.jpg');
        }
        if (target.getAttribute('src') === "images/command/command-5a.jpg") {
          target.setAttribute('src', 'images/command/command-5.jpg');
        }
        if (target.getAttribute('src') === "images/command/command-6a.jpg") {
          target.setAttribute('src', 'images/command/command-6.jpg');
        }
      }
    });
  };
  command();

  // Валидация форм

  const formCondition = () => {
    const calcSquare = document.querySelector('.calc-square'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day');

    const onlyNumber = (event) => {
      let target = event.target;
      target.value = target.value.replace(/\D/g, '');
    };

    calcSquare.addEventListener('input', onlyNumber);
    calcCount.addEventListener('input', onlyNumber);
    calcDay.addEventListener('input', onlyNumber);


  };
  formCondition();
}); //Весь код пишем после загрузки страницы