
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

export default slider;