const TodoItem = (id, projectID, title, details, dueDate) => {
  //private variables
  let _id = id;
  let _projectID = projectID;
  let _title = title;
  let _details = details;
  let _dueDate = dueDate;

  //getters
  const getId = () => _id;
  const getProjectID = () => _projectID;
  const getTitle = () => _title;
  const getDetails = () => _details;
  const getDueDate = () => _dueDate;

  //setters
  const setId = (newId) => {
    _id = newId;
  };
  const setProjectID = (newProjectID) => {
    _projectID = newProjectID;
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

  return {
    getId,
    getProjectID,
    getTitle,
    getDetails,
    getDueDate,
    setId,
    setProjectID,
    setTitle,
    setDetails,
    setDueDate,
  };
};

export { TodoItem };
