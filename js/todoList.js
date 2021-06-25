export class ToDoList {
  constructor() {
    this.tdList = [];
  }
  addToDo(todo) {
    this.tdList.push(todo);
  }
  removeToDo(index) {
    this.tdList.splice(index, 1);
  }
  renderToDo() {
    let content = "";
    // reduceRight: duyệt mảng từ phải sang trái (bắt đầu ở phần tử cuối mảng, vì để hiện thị todo mới nhất ở trên cùng)
    content = this.tdList.reduceRight((tdContent, item, index) => {
      // tdContent  = tdContent(nội dung cũ) + `nội dung mới`
      tdContent += `
            <li>
                <span>${item.textTodo}</span>
                <div class="buttons">
                    <button class="remove" data-index ="${index}" data-status ="${item.status}" onclick="deleteToDo(event)">
                        <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class="complete" data-index ="${index}" data-status ="${item.status}" onclick="completeToDo(event)">
                       <i class="far fa-check-circle"></i>
                       <i class="fas fa-check-circle"></i>
                    </button>
                </div>
            </li>
            `;
      return tdContent;
    }, "");
    return content;
  }
  
  sortToDoList(isDES) {
    this.tdList.sort((todo, nextToDo) => {
      const textA = todo.textTodo.toLowerCase();
      const textB = nextToDo.textTodo.toLowerCase();

      // So sánh tiếng việt có dấu, ASC
      return textB.localeCompare(textA);
    });
    if (isDES){
      this.tdList.reverse();
    }
  }
}
