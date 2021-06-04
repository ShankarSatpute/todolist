
// selectors
const btn_add = document.querySelector(".add_list");
const todo_list = document.querySelector(".todo_list");
const input_text = document.querySelector(".input_text");

// Events
document.addEventListener("DOMContentLoaded", getValuesFromLocalStorage);
btn_add.addEventListener("click", addList);
todo_list.addEventListener("click", deleteListItems);

// functions
function addList(event) {
  event.preventDefault();
  console.log("Adding snippets ....");

  //create div
  const div_tag = document.createElement("div");
  div_tag.classList.add("div_items");
  // create li
  const list_items = document.createElement("li");
  list_items.innerText = input_text.value;
  div_tag.appendChild(list_items);
  saveOnLocalStorage(input_text.value);
  // button check
  const check_button = document.createElement("button");
  check_button.innerHTML = '<i class="fa fa-check"></i>';
  check_button.classList.add("check_buttons");
  div_tag.appendChild(check_button);

  // button trash
  const trash_button = document.createElement("button");
  trash_button.innerHTML = '<i class="fa fa-trash"></i>';
  trash_button.classList.add("trash_buttons");
  div_tag.appendChild(trash_button);

  //append to ul list
  todo_list.appendChild(div_tag);
  input_text.value = " ";
}

function deleteListItems(e) {
  e.preventDefault();
  const items = e.target;
  if (items.classList[0] === "trash_buttons") {
    const todo = items.parentElement;
    removeFromLocal(todo);
    // todo.classList.add("fall");
    todo.remove();
  }

  if (items.classList[0] === "check_buttons") {
    const todo = items.parentElement;
    todo.classList.toggle("completed");
  }
}

function saveOnLocalStorage(todo) {
  //check already have todos in localStorage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getValuesFromLocalStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const div_tag = document.createElement("div");
        div_tag.classList.add("div_items");
        // create li
        const list_items = document.createElement("li");
        list_items.innerText = todo;
        div_tag.appendChild(list_items);

        // button check
        const check_button = document.createElement("button");
        check_button.innerHTML = '<i class="fa fa-check"></i>';
        check_button.classList.add("check_buttons");
        div_tag.appendChild(check_button);

        // button trash
        const trash_button = document.createElement("button");
        trash_button.innerHTML = '<i class="fa fa-trash"></i>';
        trash_button.classList.add("trash_buttons");
        div_tag.appendChild(trash_button);

        //append to ul list
        todo_list.appendChild(div_tag);
        input_text.value = " ";

    })
}

function removeFromLocal(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    let todosIndex = todo.children[0].innerText;
    todos.splice(todosIndex, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}
// localStorage.clear()