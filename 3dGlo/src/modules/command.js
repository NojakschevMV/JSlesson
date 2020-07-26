
const command = () => {
  const commandImg = document.querySelectorAll(".row")[8];

  commandImg.addEventListener("mouseover", (event) => {
    let target = event.target;
    //Фильтр чтобы клик срабатывал только от кнопок и точек
    if (target.matches(".command__photo")) {
      if (target.getAttribute("src") === "images/command/command-1.jpg") {
        target.setAttribute("src", "images/command/command-1a.jpg");
      }
      if (target.getAttribute("src") === "images/command/command-2.jpg") {
        target.setAttribute("src", "images/command/command-2a.jpg");
      }
      if (target.getAttribute("src") === "images/command/command-3.jpg") {
        target.setAttribute("src", "images/command/command-3a.jpg");
      }
      if (target.getAttribute("src") === "images/command/command-4.jpg") {
        target.setAttribute("src", "images/command/command-4a.jpg");
      }
      if (target.getAttribute("src") === "images/command/command-5.jpg") {
        target.setAttribute("src", "images/command/command-5a.jpg");
      }
      if (target.getAttribute("src") === "images/command/command-6.jpg") {
        target.setAttribute("src", "images/command/command-6a.jpg");
      }
    }
  });

  commandImg.addEventListener("mouseout", (event) => {
    let target = event.target;
    //Фильтр чтобы клик срабатывал только от кнопок и точек
    if (target.matches(".command__photo")) {
      if (target.getAttribute("src") === "images/command/command-1a.jpg") {
        target.setAttribute("src", "images/command/command-1.jpg");
      }
      if (target.getAttribute("src") === "images/command/command-2a.jpg") {
        target.setAttribute("src", "images/command/command-2.jpg");
      }
      if (target.getAttribute("src") === "images/command/command-3a.jpg") {
        target.setAttribute("src", "images/command/command-3.jpg");
      }
      if (target.getAttribute("src") === "images/command/command-4a.jpg") {
        target.setAttribute("src", "images/command/command-4.jpg");
      }
      if (target.getAttribute("src") === "images/command/command-5a.jpg") {
        target.setAttribute("src", "images/command/command-5.jpg");
      }
      if (target.getAttribute("src") === "images/command/command-6a.jpg") {
        target.setAttribute("src", "images/command/command-6.jpg");
      }
    }
  });
};

export default command;