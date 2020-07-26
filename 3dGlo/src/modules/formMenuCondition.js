// Валидация форм Меню

const formMenuCondition = () => {
  let formInputText = [];
  formInputText[0] = document.getElementById('form1-name');
  formInputText[1] = document.getElementById('form2-name');
  formInputText[2] = document.getElementById('form3-name');
  formInputText[3] = document.getElementById('form2-message');
  let formInputNumber = document.querySelectorAll('.form-phone');

  const onlyNumberForm = (event) => {
    let target = event.target;
    target.value = target.value.replace(/[^\+\d]/g, '');
  };
  const onlyLetterForm = (event) => {
    let target = event.target;
    target.value = target.value.replace(/[a-z0-9]/ig, "");
  };
  formInputText.forEach((elem) => {
    elem.addEventListener("input", onlyLetterForm);
  });
  formInputNumber.forEach((elem) => {
    elem.addEventListener("input", onlyNumberForm);
  });
};

export default formMenuCondition;