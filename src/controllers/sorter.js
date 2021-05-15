import {compareAsc} from 'date-fns'

const Sorter = () => {
  const sortTodosByDate = (todos, isOldestFirst) => {
    todos.sort((a,b) => compareAsc(a.getDueDate(), b.getDueDate()));

    //reverse so newest items are first
    if(!isOldestFirst) {
      todos.reverse();
    };
  };

  const sortTodoItemsByTitle = (todos, isAlphabetical) => {
    todos.sort((a, b) => a.getTitle().toUpperCase().localeCompare(b.getTitle()));

    //reverse so non-alphabetical
    if(!isAlphabetical) {
      todos.reverse();
    }
  };

  return {
    sortTodosByDate,
    sortTodoItemsByTitle
  };
};

export {Sorter};