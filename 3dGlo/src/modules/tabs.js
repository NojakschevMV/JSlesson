
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

export default tabs;