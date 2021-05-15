import {Sorter} from '../controllers/sorter';
import {StorageHandler} from '../controllers/storageHandler';
import {Validator} from '../controllers/validator';
import {TodoItem} from '../models/todoItem';
import {TodoProject} from '../models/todoProject';
import {Header} from '../views/header';
import {MainContent} from '../views/mainContent';
import {Modal} from '../views/modal';
import {ProjectsMenu} from '../views/projectsMenu';

const App = () => {
  //controllers
  let _storageHandler = StorageHandler();
  let _validator = Validator();

  //data
  let _defaultProject;
  let _projects = [];
  let _currentProjectId = null;
  let _currentTodoId = null;
  let _currentTodoProjectId = null;
  let _isDefaultView = false;
  let _isTodayView = true;
  let _isUpcomingView = false;


  //views
  const _header = Header(document.getElementById('header'));
  const _projectsMenu = ProjectsMenu(document.getElementById('sidebar'));
  const _mainContent = MainContent(document.getElementById('main'));
  const _modal = Modal(document.getElementById('overlay'), document.getElementById('modal'));

  //add event listeners
  const _addListenersProject = () => {
    _projectsMenu.getUserProjects().forEach(node => {
      node.addEventListener('click', (e) => {
        _showViewUserProject(_getProjectById(e.target.dataset.id), node);
      });
    });
  };

  const _addListenersStatic = () => {
    //header
    _header.getAddIcon().addEventListener('click', _showModalTodoAdd);
    _header.getMenuIcon().addEventListener('click', _projectsMenu.toggleMenuVisibility);
    //sidebar
    _projectsMenu.getAddIcon().addEventListener('click', _showModalProjectAdd);
    _projectsMenu.getDefaultProject().addEventListener('click', _showViewDefaultProject);
    _projectsMenu.getTodayProject().addEventListener('click', _showViewToday);
    _projectsMenu.getUpcomingProject().addEventListener('click', _showViewUpcoming);
    //main
    _mainContent.getDeleteIcon().addEventListener('click', _showModalProjectDelete);
    _mainContent.getOptionsIcon().addEventListener('click', _showModalProjectEdit);
    _mainContent.getSortIcon().addEventListener('click', _handleTodoSort);
    //modal
    _modal.getOverlay().addEventListener('click', (e) => {
      //ignores if child (non-overlay) is clicked
      if(e.target === e.currentTarget) {
        _handleModalHide();
      }
    });
    _modal.getCancelButton().addEventListener('click', _handleModalHide);
  };

  //show edit view (left click) / show delete (left click delete icon)
  const _addListenersTodo = () => {
    //todo clicked
    _mainContent.getTodos().forEach(node => {
      node.addEventListener('click', (e) => {
        const todoId = parseInt(e.currentTarget.dataset.id, 10);
        const todoProjectId = parseInt(e.currentTarget.dataset.projectId, 10);
        //update data
        _updateDataOnViewChange(_isDefaultView, _isTodayView, _isUpcomingView, _currentProjectId, todoId, todoProjectId);

        //show edit todo
        _showModalTodoEdit();
      });
    });
    //delete icon clicked
    Array.from(_mainContent.getTodoDeletes()).forEach(node => {
      node.addEventListener('click', (e) => {
        const todoId = parseInt(e.currentTarget.dataset.id, 10);
        const todoProjectId = parseInt(e.currentTarget.dataset.projectId, 10);
        e.stopPropagation();
        //update data
        _updateDataOnViewChange(_isDefaultView, _isTodayView, _isUpcomingView, _currentProjectId, todoId, todoProjectId);

        //show delete todo
        _showModalTodoDelete();
      });
    });
  };

  //gets unique id for new project (starts at 1 to account for default project)
  const _getNewProjectId = () => {
    let maxId = 0;
    _projects.forEach(project => {
      maxId = Math.max(maxId, project.getId());
    });
    return maxId + 1;
  };

  //gets unique id for new todo (starts at 0)
  const _getNewTodoId = (projectId) => {
    let maxId = -1;

    _getProjectById(projectId).getTodoList().forEach(todo => {
      maxId = Math.max(maxId, todo.getId());
    });
    return maxId + 1;
  };

  const _getProjectById = (id) => {
    if(id === _defaultProject.getId()) {
      return _defaultProject;
    } else {
      const index = _projects.findIndex((todoProject) => todoProject.getId() == id);
      return _projects[index];
    }
  };

  //gets todos due today or earlier from all projects
  const _getTodosToday = () => {
    let todos = [];
    todos = todos.concat(_defaultProject.getTodosToday());
    _projects.forEach(proj => {
      todos = todos.concat(proj.getTodosToday());
    });

    return todos;
  };

  //gets todos due this week or earlier from all projects
  const _getTodosUpcoming = () => {
    let todos = [];

    //get upcoming todos
    todos = todos.concat(_defaultProject.getTodosUpcoming());
    _projects.forEach(proj => {
      todos = todos.concat(proj.getTodosUpcoming());
    });

    return todos;
  };

  //Handle Modal Actions
  const _handleModalHide = () => {
    _modal.getActionButton().removeEventListener('click', _handleProjectAdd);
    _modal.getActionButton().removeEventListener('click', _handleProjectDelete);
    _modal.getActionButton().removeEventListener('click', _handleProjectEdit);
    _modal.getActionButton().removeEventListener('click', _handleTodoAdd);
    _modal.getActionButton().removeEventListener('click', _handleTodoDelete);
    _modal.getActionButton().removeEventListener('click', _handleTodoEdit);
    _modal.hideModal();
  };

  const _handleProjectAdd = () => {
    const inputTitle = _modal.getProjectTitle().value;
    _validator.validateTodoProject(inputTitle);

    //add valid project
    if(_validator.isValid) {
      const newProjectId = _getNewProjectId();
      _projects.push(TodoProject(newProjectId, inputTitle, []));
      _updateDataOnViewChange(false, false, false, newProjectId, null, null);
      _updateProjectsMenu();
      _updateMainContent();
      _handleModalHide();
      _updateStorage();
    } else {
      alert(_validator.errorMsg);
    }
  };

  const _handleProjectDelete = () => {
    //remove project
    const index = _projects.findIndex((todoProject) => todoProject.getId() == _currentProjectId);
    _projects.splice(index, 1);

    //change to Today view (will always be there) and hide modal
    _showViewToday();
    _updateProjectsMenu();
    _updateMainContent();
    _handleModalHide();
    _updateStorage();
  };

  const _handleProjectEdit = () => {
    const inputTitle = _modal.getProjectTitle().value;
    _validator.validateTodoProject(inputTitle);

    //update valid project
    if(_validator.isValid) {
      //update project
      const proj = _getProjectById(_currentProjectId);
      proj.setTitle(inputTitle);

      //update view
      _updateProjectsMenu();
      _updateMainContent();
      _handleModalHide();
      _updateStorage();
    } else {
      alert(_validator.errorMsg);
    };
  };

  const _handleTodoAdd = () => {
    const inputDetails = _modal.getTodoDetails().value;
    const inputDueDate = _modal.getTodoDueDate().value;
    const inputTitle = _modal.getTodoTitle().value;
    _validator.validateTodoItem(inputTitle, inputDetails, inputDueDate);

    //add valid todo
    if(_validator.isValid) {
      //add todo to current project
      const newTodo = TodoItem(_getNewTodoId(_currentProjectId),_currentProjectId, inputTitle, inputDetails, new Date(inputDueDate + 'T00:00:00'));
      if(_isDefaultView) {
        _defaultProject.addTodo(newTodo);
        _updateMainContent();
        _updateProjectsMenu();
      //user project
      } else {
        const userProject = _getProjectById(_currentProjectId);
        userProject.addTodo(newTodo);
        _updateMainContent();
        _updateProjectsMenu();
      };
      _handleModalHide();
      _updateStorage();
    } else {
      alert(_validator.errorMsg);
    };
  };

  const _handleTodoDelete = () => {
    //delete todo
    if(_currentProjectId === _defaultProject.getId()) {
      _defaultProject.deleteTodo(_currentTodoId);
    } else {
      const proj = _getProjectById(_currentTodoProjectId);
      proj.deleteTodo(_currentTodoId);
    };

    //update view
    _updateMainContent();
    _updateProjectsMenu();
    _handleModalHide();
    _updateStorage();
  };

  const _handleTodoEdit = () => {
    const inputDetails = _modal.getTodoDetails().value;
    const inputDueDate = _modal.getTodoDueDate().value;
    const inputTitle = _modal.getTodoTitle().value;
    _validator.validateTodoItem(inputTitle, inputDetails, inputDueDate);

    //edit valid todo
    if(_validator.isValid) {
      //create todo
      const updatedTodo = TodoItem(_currentTodoId,_currentTodoProjectId, inputTitle, inputDetails, new Date(inputDueDate + 'T00:00:00'));
      if(_isDefaultView) {
        _defaultProject.updateTodo(updatedTodo);
        _updateMainContent();
        _updateProjectsMenu();
      //user project
      } else {
        const userProject = _getProjectById(_currentTodoProjectId);
        userProject.updateTodo(updatedTodo);
        _updateMainContent();
        _updateProjectsMenu();
      };
      _handleModalHide();
      _updateStorage();
    } else {
      alert(_validator.errorMsg);
    }
  };

  const _handleTodoSort = () => {
    const sortIcon = _mainContent.getSortIcon();
    let sorter = Sorter();

    switch(sortIcon.dataset.nextSortType) {
      case 'Alpha':
        sorter.sortTodoItemsByTitle(_defaultProject.getTodoList(), true);
        _projects.forEach(proj => sorter.sortTodoItemsByTitle(proj.getTodoList(), true));
        sortIcon.dataset.nextSortType = 'RevAlpha';
        break;
      case 'RevAlpha':
        sorter.sortTodoItemsByTitle(_defaultProject.getTodoList(), false);
        _projects.forEach(proj => sorter.sortTodoItemsByTitle(proj.getTodoList(), false));
        sortIcon.dataset.nextSortType = 'DateAsc';
        break;
      case 'DateAsc':
        sorter.sortTodosByDate(_defaultProject.getTodoList(), true);
        _projects.forEach(proj => sorter.sortTodosByDate(proj.getTodoList(), true));
        sortIcon.dataset.nextSortType = 'DateDesc';
        break;
      //dateDesc
      default:
        sorter.sortTodosByDate(_defaultProject.getTodoList(), false);
        _projects.forEach(proj => sorter.sortTodosByDate(proj.getTodoList(), false));
        sortIcon.dataset.nextSortType = 'Alpha';
    };

    //update view
    _updateMainContent();
    _updateProjectsMenu();
  }

  //Show Modals
  const _showModalProjectAdd = () => {
    _modal.showProjectAdd();
    _modal.getActionButton().addEventListener('click', _handleProjectAdd);
  };

  const _showModalProjectDelete = () => {
    _modal.showProjectDelete();
    _modal.getActionButton().addEventListener('click', _handleProjectDelete);
  };

  const _showModalProjectEdit = () => {
    const proj = _getProjectById(_currentProjectId);
    _modal.showProjectEdit(proj.getTitle());
    _modal.getActionButton().addEventListener('click', _handleProjectEdit);
  };

  const _showModalTodoAdd = () => {
    _modal.showTodoAdd();
    _modal.getActionButton().addEventListener('click', _handleTodoAdd);
  };

  const _showModalTodoDelete = () => {
    _modal.showTodoDelete();
    _modal.getActionButton().addEventListener('click', _handleTodoDelete);
  };

  const _showModalTodoEdit = () => {
    const proj = _getProjectById(_currentTodoProjectId);
    const todo = proj.getTodoById(_currentTodoId);
    _modal.showTodoEdit(todo.getDetails(), todo.getDueDate(), todo.getTitle());
    _modal.getActionButton().addEventListener('click', _handleTodoEdit);
  };

  //Show Project Views
  const _showViewDefaultProject = () => {
    //data
    _updateDataOnViewChange(true, false, false, _defaultProject.getId(), null, null);

    //header
    _header.enableAddIcon();

    //projectsMenu
    _projectsMenu.setActiveProject(_projectsMenu.getDefaultProject());

    //mainContent
    _mainContent.updateCurrentProject(_defaultProject, false);
    _addListenersTodo();
  };

  const _showViewToday = () => {
    //data
    _updateDataOnViewChange(false, true, false, null, null, null);

    //header (cannot add todo to non-project view)
    _header.disableAddIcon();

    //projectsMenu
    _projectsMenu.setActiveProject(_projectsMenu.getTodayProject());

    //mainContent (create temp project)
    _mainContent.updateCurrentProject(TodoProject(-1, "Today", _getTodosToday()), false);
    _addListenersTodo();
  };

  const _showViewUpcoming = () => {
    //data
    _updateDataOnViewChange(false, false, true, null, null, null);

    //header (cannot add todo to non-project view)
    _header.disableAddIcon();

    //projectsMenu
    _projectsMenu.setActiveProject(_projectsMenu.getUpcomingProject());

    //mainContent (create temp project)
    _mainContent.updateCurrentProject(TodoProject(-1, "Upcoming", _getTodosUpcoming()), false);
    _addListenersTodo();
  };

  const _showViewUserProject = (project, projectNode) => {
    //data
    _updateDataOnViewChange(false, false, false, project.getId(), null, null);

    //header
    _header.enableAddIcon();

    //projectsMenu
    _projectsMenu.setActiveProject(projectNode);

    //mainContent
    _mainContent.updateCurrentProject(project, true);
    _addListenersTodo();
  };

  const _updateDataOnViewChange = (isDefaultView, isTodayView, isUpcomingView, projectId, todoId, todoProjectId) => {
    _isDefaultView = isDefaultView;
    _isTodayView = isTodayView;
    _isUpcomingView = isUpcomingView;
    _currentProjectId = projectId;
    _currentTodoId = todoId;
    _currentTodoProjectId = todoProjectId;
  };

  //update any time data changes (add/delete/edit project/item)
  const _updateMainContent = () => {
    //update todo list (render + add listeners)
    if(_isDefaultView) {
      _showViewDefaultProject();
    } else if(_isTodayView) {
      _showViewToday();
    } else if(_isUpcomingView) {
      _showViewUpcoming();
    } else {
      _showViewUserProject(_getProjectById(_currentProjectId), _projectsMenu.getUserProjectNodeById(_currentProjectId));
    };
  };

  //update any time data changes (add/delete/edit project/item)
  const _updateProjectsMenu = () => {
    //update static count
    _updateStaticCounts();
    //update user projects list (render + add listeners)
    _projectsMenu.updateUserProjects(_projects);
    _addListenersProject();
    //set active project
    if(_isDefaultView) {
      _projectsMenu.setActiveProject(_projectsMenu.getDefaultProject());
    } else if(_isTodayView) {
      _projectsMenu.setActiveProject(_projectsMenu.getTodayProject());
    } else if(_isUpcomingView) {
      _projectsMenu.setActiveProject(_projectsMenu.getUpcomingProject());
    } else {
      _projectsMenu.setActiveProject(_projectsMenu.getUserProjectNodeById(_currentProjectId));
    };
  };

  const _updateStaticCounts = () => {
    _projectsMenu.updateStaticCounts(_getTodosToday().length, _getTodosUpcoming().length, _defaultProject.getTodoList().length);
  };

  //updates localStorage
  const _updateStorage = () => {
    _storageHandler.setDefaultProject(_defaultProject);
    _storageHandler.setUserProjects(_projects);
  };

  //intial load (initialize models/views)
  const initialize = () => {
    //initialize models
    _defaultProject = _storageHandler.getDefaultProject();
    _projects = _storageHandler.getUserProjects();

    //initialize views
    _header.loadHeader();
    _projectsMenu.loadProjectsMenu();
    _mainContent.loadMainContent();
    _modal.loadModal();

    //misc
    _addListenersProject();
    _addListenersStatic();
    _updateStaticCounts();

    //start on today screen
    _showViewToday();
    _updateProjectsMenu();
  };

  return {
    initialize
  }
};

export {App};