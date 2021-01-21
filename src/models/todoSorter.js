const TodoSorter = () => {
  const compareDate = (todoItemA, todoItemB) => {
    return todoItemA.dueDate - todoItemB.dueDate;
  };
  const comparePriority = (todoItemA, todoItemB) => {
    return todoItemA.priority - todoItemB.priority;
  };
  const compareTitle = (todoItemA, todoItemB) => {
    return todoItemA.title.toUppercase().localeCompare(todoItemB.title.toUppercase());
  };

  return {
    compareDate,
    comparePriority,
    compareTitle
  };
};

export {TodoSorter};