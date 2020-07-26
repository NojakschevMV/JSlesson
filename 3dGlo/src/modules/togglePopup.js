
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

export default togglePopup;