"use strict";
import "@babel/polyfill";
import "nodelist-foreach-polyfill";
import elementClosest from 'element-closest';
elementClosest(window);
var Promise = require('es6-promise').Promise;


import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopup from "./modules/togglePopup";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import command from "./modules/command";
import formCondition from "./modules/formCondition";
import calc from "./modules/calc";
import formMenuCondition from "./modules/formMenuCondition";
import setForm from "./modules/setForm";

//Таймер
countTimer("30 july 2020");
//Меню
toggleMenu();
//popup открывающееся окно
togglePopup();
// Табы
tabs();
// слайдер
slider();
//Наша команда
command();
// Валидация форм Калькулятора
formCondition();
// Калькулятор
calc(100);
// Валидация форм Меню
formMenuCondition();
//send-ajax-form
setForm();