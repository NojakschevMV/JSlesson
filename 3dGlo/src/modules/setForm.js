
const setForm = () => {
  const errorMessage = 'Что то пошло не так...',
    loadMessage = 'Загрузка...',
    succesMessage = 'Спасибо! Мы скоро с вами свяжемся!';
  const form = [];
  form[0] = document.getElementById('form1');
  form[1] = document.getElementById('form2');
  form[2] = document.getElementById('form3');
  let formInput = document.querySelectorAll('input');
  const statusMessage = document.createElement('div'); // сюда выведем сообщение 
  statusMessage.style.cssText = 'font-size: 2rem;';
  statusMessage.style.cssText = 'color: white;';

  const postData = (body) => {
    return fetch('./server.php', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });


  };


    form[0].addEventListener('submit', (event) => {
      event.preventDefault();
      form[0].appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      statusMessage.style.cssText = 'color: white;';
      const formData = new FormData(form[0]); // получаем данные с нашей формы
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });

      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Status network not 200');
          }
          console.log(response);
          statusMessage.textContent = succesMessage;
          formInput.forEach((elem) => {
            elem.value = '';
          });
        })
        .catch(() => {
          statusMessage.textContent = errorMessage;
        });


    });
    form[1].addEventListener('submit', (event) => {
      event.preventDefault();
      form[1].appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      statusMessage.style.cssText = 'color: white;';
      const formData = new FormData(form[1]); // получаем данные с нашей формы
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });

      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Status network not 200');
          }
          console.log(response);
          statusMessage.textContent = succesMessage;
          formInput.forEach((elem) => {
            elem.value = '';
          });
        })
        .catch(() => {
          statusMessage.textContent = errorMessage;
        });


    });
    form[2].addEventListener('submit', (event) => {
      event.preventDefault();
      form[2].appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      statusMessage.style.cssText = 'color: white;';
      const formData = new FormData(form[2]); // получаем данные с нашей формы
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });

      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Status network not 200');
          }
          console.log(response);
          statusMessage.textContent = succesMessage;
          formInput.forEach((elem) => {
            elem.value = '';
          });
        })
        .catch(() => {
          statusMessage.textContent = errorMessage;
        });


    });

};

export default setForm;