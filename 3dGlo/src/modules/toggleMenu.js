
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

export default toggleMenu;