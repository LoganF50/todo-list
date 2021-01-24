const TodoItem = (id, title, details, dueDate, priority) => {
  //private variables
  let _id = id;
  let _title = title;
  let _details = details;
  let _dueDate = dueDate;
  let _priority = priority;

  //getters
  const getId = () => _id;
  const getTitle = () => _title;
  const getDetails = () => _details;
  const getDueDate = () => _dueDate;
  const getPriority = () => _priority;

  //setters
  const setId = (newId) => {
    _id = newId;
  };
  const setTitle = (newTitle) => {
    _title = newTitle;
  };
  const setDetails = (newDetails) => {
    _details = newDetails;
  };
  const setDueDate = (newDueDate) => {
    _dueDate = newDueDate;
  };
  const setPriority = (newPriority) => {
    _priority = newPriority;
  };

  //enums
  const priorities = Object.freeze({P1: 1, P2: 2, NONE: 3});

  return {
    getId,
    getTitle,
    getDetails,
    getDueDate,
    getPriority,
    setId,
    setTitle,
    setDetails,
    setDueDate,
    setPriority,
    priorities
  };
};

export {TodoItem};