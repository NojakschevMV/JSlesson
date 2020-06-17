"use strict";
//книги по порядку
let bookTitle = document.getElementsByClassName("book");

bookTitle[0].before(bookTitle[1]);
bookTitle[2].before(bookTitle[4]);
bookTitle[3].before(bookTitle[4]);
bookTitle[4].before(bookTitle[5]);
//задний фон
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
//Исправить заголовок в книге 3
let bookTitle3 = document.getElementsByTagName("a");
bookTitle3[2].textContent = 'Книга 3. this и Прототипы Объектов';
//Удалить рекламу
let adv = document.getElementsByClassName("adv");
adv[0].remove();
//Восстановить порядок глав во второй книге
let bookLi2 = document.getElementsByTagName("li");
bookLi2[8].before(bookLi2[9]);
bookLi2[9].before(bookLi2[12]);
bookLi2[10].before(bookLi2[14]);
bookLi2[11].before(bookLi2[12]);
bookLi2[12].before(bookLi2[13]);
bookLi2[13].before(bookLi2[14]);
bookLi2[14].before(bookLi2[15]);
//Восстановить порядок глав в пятой книге
let bookLi5 = document.getElementsByTagName("li");
bookLi5[38].before(bookLi5[45]);
bookLi5[39].before(bookLi5[40]);
bookLi5[40].before(bookLi5[41]);
bookLi5[42].before(bookLi5[43]);
bookLi5[43].before(bookLi5[44]);
//в шестой книге добавить главу “Глава 8: За пределами ES6”
let bookLi6 = document.getElementsByTagName("ul");
let newli = document.createElement('li');
newli.textContent = 'Глава 8: За пределами ES6';
bookLi6[5].insertAdjacentElement('beforeend', newli);
let bookLi66 = document.getElementsByTagName("li");
bookLi5[56].before(bookLi5[57]);