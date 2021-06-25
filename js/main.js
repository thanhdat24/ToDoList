// Import lớp đối tượng
import { ToDo } from "./todo.js";
import { ToDoList } from "./todoList.js";

let todoList = new ToDoList();
let completeList = new ToDoList();
// Hàm rút gọn cú pháp getElementById
const getELE = (id) => {
  return document.getElementById(id);
};

// Hàm add todo

const addToDo = () => {
  let txtToDo = getELE("newTask").value;
  let ulToDo = getELE("todo");

  // Kiểm tra nếu người dùng kh nhập nội dung mà bấm add
  if (txtToDo != "") {
    let td = new ToDo(txtToDo, "todo");
    todoList.addToDo(td);
  }
  // gọi hàm
  showToDoList(ulToDo);
  // clean value khi người dùng nhập value mới
  getELE("newTask").value = "";
};

// Tìm tới button addItem

getELE("addItem").addEventListener("click", () => {
  addToDo();
});

// Hàm hiện thị todo
const showToDoList = (ulToDo) => {
  ulToDo.innerHTML = todoList.renderToDo();
};

const showCompleteList = (ulComplete) => {
  ulComplete.innerHTML = completeList.renderToDo();
};
// Hàm remove todo
const deleteToDo = (e) => {
  // chuyển target thành currentTarget
  let tdIndex = e.currentTarget.getAttribute("data-index");
  let status = e.currentTarget.getAttribute("data-status");
  let ulToDo = getELE("todo");
  let ulComplete = getELE("completed");
  console.log(status);
  if (status === "todo") {
    console.log(status);
    todoList.removeToDo(tdIndex);
    showToDoList(ulToDo);
  } else if (status == "completed") {
    completeList.removeToDo(status);
    showCompleteList(ulComplete);
  } else {
    alert("Cannot delete todo!");
  }
};

// chuyền hàm về hàm của window

window.deleteToDo = deleteToDo;

// Hàm complete todo

const completeToDo = (e) => {
  // chuyển target thành currentTarget vì nó hiểu nhằm thành click vào thẻ i, thực tế click vào button
  let tdIndex = e.currentTarget.getAttribute("data-index");
  let status = e.currentTarget.getAttribute("data-status");
  let ulToDo = getELE("todo");
  let ulComplete = getELE("completed");
  if (status == "todo") {
    // slice: start <= index < end
    let completeItem = todoList.tdList.slice(tdIndex, tdIndex + 1);
    // console.log(completeItem);
    let objectToDo = new ToDo(completeItem[0].textTodo, "completed");
    moveToDo(todoList, completeList, objectToDo, tdIndex);
    showToDoList(ulToDo);
    showCompleteList(ulComplete);
  } else if (status == "completed") {
    let undoItem = completeList.tdList.slice(tdIndex, tdIndex + 1);
    let objectToDo = new ToDo(undoItem[0].textTodo, "todo");
    moveToDo(completeList, todoList, objectToDo, tdIndex);
    showToDoList(ulToDo);
    showCompleteList(ulComplete);
  } else {
    alert("Cannot move todo!");
  }
};

window.completeToDo = completeToDo;

// Hàm di chuyển todo dang complete và ngược lại

const moveToDo = (depart, arraval, obj, tdIndex) => {
  // Remove todo from depart
  depart.removeToDo(tdIndex);

  //Add todo to arrival
  arraval.addToDo(obj);
};
// Sắp xếp tăng dần
const sortASC = () => {
  let ulToDo = getELE("todo");
  todoList.sortToDoList(false);
  showToDoList(ulToDo);
};

window.sortASC = sortASC;
// Sắp xếp giảm dần
const sortDES = () => {
  let ulToDo = getELE("todo");
  todoList.sortToDoList(true);
  showToDoList(ulToDo);
};

window.sortDES = sortDES;
