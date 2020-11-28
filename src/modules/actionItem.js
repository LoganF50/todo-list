export class ActionItem {
  constructor(actionType, dateOccurred) {
    this._actionType = actionType;
    this._dateOccurred = dateOccurred;
  }
  
  //GETTERS
  get actionType() {
    return this._actionType;
  }

  get dateOccurred() {
    return this._dateOccurred;
  }

  //SETTERS
  set actionType(actionType) {
    this._actionType = actionType;
  }

  set dateOccurred(dateOccurred) {
    this._dateOccurred = dateOccurred;
  }

  //STATIC
  static actionTypes = Object.freeze({ADDED_TASK:1, COMPLETED_TASK:2, DELETED_TASK:3, UPDATED_TASK:4});
}