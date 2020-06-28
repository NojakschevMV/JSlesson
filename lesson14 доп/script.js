"use strict";
let myBtn = document.getElementById('myBtn');
let inputSelector = document.querySelectorAll('.myInput')[0];
let inputHeight = document.querySelectorAll('.myInput')[1];
let inputWidth = document.querySelectorAll('.myInput')[2];
let inputBg = document.querySelectorAll('.myInput')[3];
let inputFontSize = document.querySelectorAll('.myInput')[4];
let inputText = document.querySelectorAll('.myInput2')[0];

function DomElement(selector, height, width, bg, fontSize, text) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.text = text;
}
let newElem = new DomElement();

DomElement.prototype.start = function () {
  let selector = inputSelector.value;
  let height = inputHeight.value;
  let width = inputWidth.value;
  let bg = inputBg.value;
  let fontSize = inputFontSize.value;
  let text = inputText.value;
  let newElem = new DomElement(selector, height, width, bg, fontSize, text);
  if (selector[0] === '.') {
    let newDiv = document.createElement('div');
    newDiv.classList.add(inputSelector.value);
    newDiv.textContent = inputText.value;
    myBtn.insertAdjacentElement('afterend', newDiv);
    newDiv.style.cssText = 'height: ' + height + 'px; width: ' + width + 'px; background: ' + bg + '; font-size: ' + fontSize + 'px;';
  } else {
    if (selector[0] === '#') {
      let newId = document.createElement('p');
      newId.id = inputSelector.value;
      newId.textContent = inputText.value;
      myBtn.insertAdjacentElement('afterend', newId);
      newId.style.cssText = 'height: ' + height + 'px; width: ' + width + 'px; background: ' + bg + '; font-size: ' + fontSize + 'px;';
    }
  }
  console.log(newElem);
};

myBtn.addEventListener('click', newElem.start);