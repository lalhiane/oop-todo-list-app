class UiElements {
  constructor() {
    this.inputName = document.getElementById("input-name");
    this.inputAge = document.getElementById("input-age");
    this.inputSubmit = document.getElementById("input-submit");
    this.tableBody = document.querySelector(".table-body");
  }

  fixInputs() {
    this.inputName.value = "";
    this.inputAge.value = "";
    this.inputName.focus();
  }
}

class LocalStorage extends UiElements {
  constructor(todo) {
    super();
    this.todo = todo;
  }

  addTodosToLs() {
    let todos = this.getTodosFromLs();
    localStorage.setItem("todo", JSON.stringify([...todos, this.todo]));
  }

  removeTodoFromLs(id) {
    let todos = this.getTodosFromLs();
    localStorage.setItem(
      "todo",
      JSON.stringify(todos.filter((todo) => todo.id !== id))
    );
  }

  getTodosFromLs() {
    let todos = JSON.parse(localStorage.getItem("todo"));
    return localStorage.getItem("todo") === null ? [] : todos;
  }
}

class Todo extends LocalStorage {
  constructor() {
    super();
  }

  createTodo(todo) {
    const todoEl = document.createElement("div");
    todoEl.className = "todo";
    todoEl.innerHTML = `
        <span class="first">${todo.name}</span>
        <span class="second">${todo.age}</span>
    `;
    const removeBtn = document.createElement("span");
    removeBtn.className = "third";
    removeBtn.innerHTML = "x";
    removeBtn.addEventListener("click", () => {
      this.removeTodoFromLs(todo.id);
      this.showTodos();
    });
    todoEl.appendChild(removeBtn);
    this.tableBody.appendChild(todoEl);
  }

  showTodos() {
    this.tableBody.innerHTML = "";
    let todos = this.getTodosFromLs();
    if (todos.length > 0) {
      todos.forEach((todo) => this.createTodo(todo));
    } else {
      this.tableBody.innerHTML =
        "<p class='msg'>There Is No Items To Show!</p>";
    }
  }
}

const elements = new UiElements();

const todoC = new Todo();

todoC.showTodos();

elements.inputSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  const name = elements.inputName.value,
    age = elements.inputAge.value;
  if (name !== "" && age !== "") {
    let todo = {
      id: Math.random(),
      name: name,
      age: age,
    };
    const ls = new LocalStorage(todo);
    ls.addTodosToLs();
    const todoC = new Todo();
    todoC.showTodos();
    elements.fixInputs();
  } else {
    Swal.fire({
      title: "Error!",
      text: "There Is One Empty Input!",
      icon: "error",
      confirmButtonText: "Cool",
      confirmButtonColor: "#36c1f2",
      confirmButtonText: "Okk",
      iconColor: "#36c1f2",
    });
  }
});
