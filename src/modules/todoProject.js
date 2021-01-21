import { TodoSorter } from './todoSorter.js'

const TodoProject = (id, title, todoList) => {
  //private variables
  let _id = id;
  let _title = title;
  let _todoList = todoList;

  //getters
  const getId = () => _id;
  const getTitle = () => _title;
  const getTodoList = () => _todoList;

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

  //sorters
  const sortTodoItemsByDate = () => {
    const sorter = TodoSorter();
    _todoList.sort(sorter.compareDate());
  };

  const sortTodoItemsByPriority = () => {
    const sorter = TodoSorter();
    _todoList.sort(sorter.comparePriority());
  };

  const sortTodoItemsByTitle = () => {
    const sorter = TodoSorter();
    _todoList.sort(sorter.compareTitle());
  };

  //todoList methods
  const addTodo = (todo) => {
    _todoList.push(todo);
  };

  const deleteTodo = (id) => {
    const index = _todoList.findIndex((todoItem) => todoItem.id == todo.id);
    _todoList.splice(index, 1);
  };

  const updateTodo = (todo) => {
    const index = _todoList.findIndex((todoItem) => todoItem.id == todo.id);
    _todoList.splice(index, 1, todo);
  };

  return {
    getId,
    getTitle,
    getTodoList,
    setId,
    setTitle,
    setTodoList,
    sortTodoItemsByDate,
    sortTodoItemsByPriority,
    sortTodoItemsByTitle,
    addTodo,
    deleteTodo,
    updateTodo
  };
};

export {TodoProject};