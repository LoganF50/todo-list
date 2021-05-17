import { format } from "date-fns";
import { getSVGElement } from "./../utilities.js";

const MainContent = (container) => {
  //private variables
  let _deleteIcon = getSVGElement("trash-sharp");
  let _optionsIcon = getSVGElement("ellipsis-horizontal-sharp");
  let _sortIcon = getSVGElement("swap-vertical-sharp");
  let _title = document.createElement("span");
  let _todosContainer = document.createElement("div");

  const _clearProjectTodos = () => {
    while (_todosContainer.firstChild) {
      _todosContainer.removeChild(_todosContainer.firstChild);
    }
  };

  const _disableDeleteIcon = () => {
    _deleteIcon.classList.add("main__icon--disabled");
  };

  const _disableOptionsIcon = () => {
    _optionsIcon.classList.add("main__icon--disabled");
  };

  const _enableDeleteIcon = () => {
    _deleteIcon.classList.remove("main__icon--disabled");
  };

  const _enableOptionsIcon = () => {
    _optionsIcon.classList.remove("main__icon--disabled");
  };

  const _getTodoNode = (id, projectID, title, dueDate) => {
    //create elements
    let todoNode = document.createElement("div");
    todoNode.classList.add("todo__container");
    let todoInfo = document.createElement("div");
    todoInfo.classList.add("todo__infoContainer");
    let todoTitle = document.createElement("div");
    todoTitle.classList.add("todo__title");
    let todoDueDate = document.createElement("div");
    todoDueDate.classList.add("todo__dueDate");
    let todoIcons = document.createElement("div");
    todoIcons.classList.add("todo__iconsContainer");
    let todoDeleteIcon = getSVGElement("trash-sharp");
    todoDeleteIcon.classList.add("todo__icon", "todo__deleteIcon");

    //fill data
    todoNode.dataset.id = id;
    todoNode.dataset.projectId = projectID;
    todoDeleteIcon.dataset.id = id;
    todoDeleteIcon.dataset.projectId = projectID;
    todoTitle.textContent = title;
    todoDueDate.textContent = format(dueDate, "MM-dd-yyyy");

    //add to containers
    todoInfo.appendChild(todoTitle);
    todoInfo.appendChild(todoDueDate);
    todoIcons.appendChild(todoDeleteIcon);
    todoNode.appendChild(todoInfo);
    todoNode.appendChild(todoIcons);
    return todoNode;
  };

  const _loadHeader = () => {
    //create elements
    let headerContainer = document.createElement("div");
    headerContainer.classList.add("main__header");
    _title.classList.add("main__title");
    _title.textContent = "Title";
    let iconContainer = document.createElement("span");
    _sortIcon.classList.add("main__icon");
    iconContainer.appendChild(_sortIcon);
    _optionsIcon.classList.add("main__icon");
    iconContainer.appendChild(_optionsIcon);
    _deleteIcon.classList.add("main__icon");
    iconContainer.appendChild(_deleteIcon);
    headerContainer.appendChild(_title);
    headerContainer.appendChild(iconContainer);
    return headerContainer;
  };

  const _loadTodoList = () => {
    //create elements
    _todosContainer.classList.add("main__todos");
    return _todosContainer;
  };

  const _updateHeader = (title) => {
    _title.textContent = title;
  };

  const _updateTodoList = (todos) => {
    _clearProjectTodos();
    todos.forEach((todo) => {
      let todoNode = _getTodoNode(
        todo.getId(),
        todo.getProjectID(),
        todo.getTitle(),
        todo.getDueDate()
      );
      _todosContainer.appendChild(todoNode);
    });
  };

  const getDeleteIcon = () => _deleteIcon;
  const getOptionsIcon = () => _optionsIcon;
  const getSortIcon = () => _sortIcon;
  const getTodoDeletes = () => {
    return document.getElementsByClassName("todo__deleteIcon");
  };
  const getTodos = () => {
    return _todosContainer.childNodes;
  };

  //used for initial loading of page
  const loadMainContent = () => {
    //add all items to container
    container.appendChild(_loadHeader());
    container.appendChild(_loadTodoList());
  };

  const updateCurrentProject = (project, isEditable) => {
    _updateHeader(project.getTitle());
    _updateTodoList(project.getTodoList());
    if (isEditable) {
      _enableDeleteIcon();
      _enableOptionsIcon();
    } else {
      _disableDeleteIcon();
      _disableOptionsIcon();
    }
  };

  return {
    getDeleteIcon,
    getOptionsIcon,
    getSortIcon,
    getTodoDeletes,
    getTodos,
    loadMainContent,
    updateCurrentProject,
  };
};

export { MainContent };
