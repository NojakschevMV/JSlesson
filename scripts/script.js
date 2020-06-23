'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let arr = JSON.parse(localStorage.getItem('todoData'));
let todoData = arr;



// функция перебирает весь массив с делами и обновляет список дел
const render = function () {

    todoList.textContent = '';
    todoCompleted.textContent = '';
    localStorage.setItem('todoData', JSON.stringify(todoData));
    todoData.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) { //если выполнено true 
            todoCompleted.append(li); // добавить в выполненые
        } else {
            todoList.append(li); // добавить в новые
        }
        //кнопка "выполнено"
        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function () {
            item.completed = !item.completed; //инвентировать true/false
            render();
        });
        //кнопка удалить
        const btnDelete = li.querySelector('.todo-remove');
        btnDelete.addEventListener('click', function () {
            todoData.splice(item, 1); // удалить дело из массива
            render();
        });
    });
};

// При нажатии добавим новое дело
todoControl.addEventListener('submit', function (event) {
    event.preventDefault(); // отключить обновление страницы
    if (headerInput.value !== '') {
        const newTodo = { //создаем обьект
            value: headerInput.value,
            completed: false
        };
        todoData.push(newTodo); //запушиваем в массив со всеми делами
        headerInput.value = ''; //очищаем поле ввода

        render();
    } else {
        alert('Вы ничего не ввели');
    }
});
render();