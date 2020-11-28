import { TodoItem } from './todoItem.js'

export class TodoProject {
  constructor(title, todoList) {
    this._title = title;
    this._todoList = todoList;
  }

  //GETTERS
  get title() {
    return this._title;
  }

  get todoList() {
    return this._todoList;
  }

  //SETTERS
  set title(title) {
    this._title = title;
  }

  //STATIC
  static sortBy = Object.freeze({dueDate: 1, priority: 2, title: 3});

  //METHODS
  addTodoItem(todoItem) {
    this._todoList.push(todoItem);
  }

  deleteTodoItem(index) {
    this._todoList.splice(index, 1);
  }

  editTodoItem(index, todoItem) {
    this._todoList[index] = todoItem;
  }

  //uses static sortBy enum as parameter
  sortTodoItems(sortBy) {
    switch (sortBy) {
      case TodoProject.sortBy.dueDate:
        this._todoList.sort(TodoItem.compareDate);
        break;

      case TodoProject.sortBy.priority:
        this._todoList.sort(TodoItem.comparePriority);
        break;

      case TodoProject.sortBy.title:
        this._todoList.sort(TodoItem.compareTitle);
        break;
    
      default:
        break;
    }
  }
}