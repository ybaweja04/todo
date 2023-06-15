const enter = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const todoButton = document.querySelector(".todo-button");

todoButton.addEventListener("click", addTask);
list.addEventListener("click", deleteCheck);

function addTask(){
    if (enter.value === ""){
        alert("WRITE SOMETHING!!")
    }
    else{
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = enter.value; 
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        
        const completedButton = document.createElement("button");
        completedButton.innerHTML = 'Completed';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = 'Delete';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);   
        saveLocalTodos(enter.value);
        list.appendChild(todoDiv);
        enter.value = "";

    }
}

function deleteCheck(e) {

    const item = e.target;
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        console.log(todo);
        removeLocalTodos(todo);
        todo.remove();

        
    }

    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        if(todo.classList.contains("completed")){
            item.innerText = "Not Completed";
        }
        else{
            item.innerText = "Completed";
        }
    }
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = 'Completed';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = 'Delete';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        list.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}