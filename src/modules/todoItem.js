export class TodoItem {
  constructor(title, details, dueDate, priority, comments, checklist, actionList) {
    this._title = title;
    this._details = details;
    this._dueDate = dueDate;
    this._priority = priority;
    this._comments = comments;
    this._checklist = checklist;
    this._actionList = actionList;
  }

  //GETTERS
  get actionList() {
    return this._actionList;
  }

  get checklist() {
    return this._checklist;
  }

  get comments() {
    return this._comments;
  }

  get details() {
    return this._details;
  }

  get dueDate() {
    return this._dueDate;
  }

  get priority() {
    return this._priority;
  }

  get title() {
    return this._title;
  }

  //SETTERS
  set details(details) {
    this._details = details;
  }

  set dueDate(dueDate) {
    this._dueDate = dueDate;
  }

  set priority(priority) {
    this._priority = priority;
  }

  set title(title) {
    this._title = title;
  }

  //STATIC
  static priorities = Object.freeze({P1: 1, P2: 2, P3: 3, NONE: 4});

  static compareDate(todoItemA, todoItemB) {
    return todoItemA.dueDate - todoItemB.dueDate;
  }

  static comparePriority(todoItemA, todoItemB) {
    return todoItemA.priority - todoItemB.priority;
  }

  static compareTitle(todoItemA, todoItemB) {
    const titleA = todoItemA.title.toUpperCase();
    const titleB = todoItemB.title.toUpperCase();
    return titleA.localeCompare(titleB);
  }

  //METHODS
  addActionItem(actionItem) {
    this._actionList.push(actionItem);
  }

  addChecklistItem(checklistItem) {
    this._checklist.push(checklistItem);
  }

  addComment(comment) {
    this._comments.push(comment);
  }

  deleteChecklistItem(index) {
    this._checklist.splice(index, 1);
  }

  deleteComment(index) {
    this._comments.splice(index, 1);
  }

  editChecklistItem(index, checklistItem) {
    this._checklist[index] = checklistItem;
  }

  editComment(index, comment) {
    this._comments[index] = comment;
  }
}