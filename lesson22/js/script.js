'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }


    render() {
        this.todoList.textContent = "";
        this.todoCompleted.textContent = "";
        this.todoData.forEach(this.createItem, this); //перебираем обьекты дел и передаем this!
        this.addToStorage();
    }

    createItem(todo) { //каждый из обьектов дел в переборе
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
			<div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>
        `);
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }
    addTodo(event) {
        event.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.cenerateKey()
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
            this.input.value = '';
        } else {
            alert('Пустое дело добавить нельзя');
        }
    }
    cenerateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    //==================ДЗ===============

    deleteItem(event) {
        this.todoData.delete(event.target.parentNode.parentNode.key);
        this.render();
    }

    compliteItem(event) {
        this.todoData.forEach((elem) => {
            if (elem.key === event.target.parentNode.parentNode.key) {
                // нашел к какому li принадлежит кнопка и сравнил key
                elem.completed = !elem.completed; // инвертировал true/false
            }
        });
        this.render();
    }

    handler() {
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.addEventListener('click', (event) => {
            if (event.target.matches(".todo-complete")) {
                this.compliteItem(event);
            } else if (event.target.matches(".todo-remove")) {
                this.deleteItem(event);
            }
        });
    }







    //===================================


    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
    }

}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();
todo.handler();