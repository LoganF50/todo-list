export class ChecklistItem {
  constructor(title, isComplete) {
    this._title = title;
    this._isComplete = isComplete;
  }

  //GETTERS
  get isComplete() {
    return this._isComplete;
  }

  get title() {
    return this._title;
  }

  //SETTERS
  set isComplete(isComplete) {
    this._isComplete = isComplete;
  }

  set title(title) {
    this._title = title;
  }
}