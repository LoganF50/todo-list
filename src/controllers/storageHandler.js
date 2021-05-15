import {TodoItem} from '../models/todoItem';
import {TodoProject} from '../models/todoProject';

const StorageHandler = () => {
  //storage
  const deserializeTodoItem = (serialized) => {
    const {id, projectID, title, details, dueDate} = serialized;
    return TodoItem(id, projectID, title, details, Date.parse(dueDate));
  };

  const deserializeTodoProject = (serialized) => {
    const {id, title, todoList} = serialized;

    let todos = [];
    todoList.forEach(todo => todos.push(deserializeTodoItem(todo)));
    return TodoProject(id, title, todos);
  };

  const serializeTodoItem = (todo) => {
    return {id: todo.getId(), projectID: todo.getProjectID(), title: todo.getTitle(), details: todo.getDetails(), dueDate: new Date(todo.getDueDate())};
  };

  const serializeTodoProject = (project) => {
    let serializedTodos = [];
    
    project.getTodoList().forEach(todo => serializedTodos.push(serializeTodoItem(todo)));
    return {id: project.getId(), title: project.getTitle(), todoList: serializedTodos};
  };

  //getters
  const getDefaultProject = () => {
    if(localStorage.getItem('defaultProject') === null) {
      let newDate = new Date();
      newDate.setHours(0, 0, 0, 0);
      const defaultProject = TodoProject(0, 'Default', [TodoItem(0, 0, 'Create first project', 'hit the + in the sidebar to create your first project', newDate)]);
      return defaultProject;
    } else {
      const jProject = JSON.parse(localStorage.getItem('defaultProject'));
      return deserializeTodoProject(jProject);
    }
  };
  
  const getUserProjects = () => {
    let projects = [];
    const jProjects = JSON.parse(localStorage.getItem('userProjects'));
    if(jProjects === null ) {
      return projects;
    } else {
      jProjects.forEach(project => projects.push(deserializeTodoProject(project)));
      return projects;
    }
  };

  //setters
  const setDefaultProject = (defaultProject) => {
    localStorage.setItem('defaultProject', JSON.stringify(serializeTodoProject(defaultProject)));
  };

  const setUserProjects = (userProjects) => {
    let storageProjects = [];
    userProjects.forEach(project => storageProjects.push(serializeTodoProject(project)));
    localStorage.setItem('userProjects', JSON.stringify(storageProjects));
  };

  return {
    getDefaultProject,
    getUserProjects,
    setDefaultProject,
    setUserProjects
  };
};

export {StorageHandler};