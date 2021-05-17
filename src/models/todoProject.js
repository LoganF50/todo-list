import { add, compareAsc, isBefore } from "date-fns";

const TodoProject = (id, title, todoList) => {
  //private variables
  let _id = id;
  let _title = title;
  let _todoList = todoList;

  //getters
  const getId = () => _id;
  const getTitle = () => _title;
  const getTodoById = (id) => {
    const index = _todoList.findIndex((todoItem) => todoItem.getId() == id);
    return _todoList[index];
  };
  const getTodoList = () => _todoList;
  //return arraylist of todos due today or earlier
  const getTodosToday = () => {
    const todos = [];
    _todoList.forEach((todo) => {
      if (compareAsc(todo.getDueDate(), new Date()) <= 0) {
        todos.push(todo);
      }
    });
    return todos;
  };
  //return arraylist of todos due within 7 days or earlier
  const getTodosUpcoming = () => {
    const todos = [];
    //loop todos, grabbing if due within 7 days/earlier
    _todoList.forEach((todo) => {
      if (isBefore(todo.getDueDate(), add(new Date(), { weeks: 1 }))) {
        todos.push(todo);
      }
    });
    return todos;
  };

  //setters
  const setId = (newId) => {
    _id = newId;
  };
  const setTitle = (newTitle) => {
    _title = newTitle;
  };
  const setTodoList = (newTodoList) => {
    _todoList = newTodoList;
  };

  //todoList methods
  const addTodo = (todo) => {
    _todoList.push(todo);
  };

  const deleteTodo = (id) => {
    const index = _todoList.findIndex((todoItem) => todoItem.getId() == id);
    _todoList.splice(index, 1);
  };

  const updateTodo = (todo) => {
    const index = _todoList.findIndex(
      (todoItem) => todoItem.getId() == todo.getId()
    );
    _todoList.splice(index, 1, todo);
  };

  return {
    getId,
    getTitle,
    getTodoById,
    getTodoList,
    getTodosToday,
    getTodosUpcoming,
    setId,
    setTitle,
    setTodoList,
    addTodo,
    deleteTodo,
    updateTodo,
  };
};

export { TodoProject };
