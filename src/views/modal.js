import { format } from 'date-fns';

const Modal = (overlay, container) => {
  /*
  Actions:
    1) add project
    2) delete project
    3) edit project
    4) add item
    5) delete item
    6) edit item

  Divs needed:
    1) cancel button (ALL)
    2) action button (ALL)
    3) project title (add/edit project)
    4) item title (add/edit item)
    5) item details (add/edit item)
    6) item dueDate (add/edit item)

  Classes needed:
    .modal__button:
    .modal__button--primary: action
    .modal__button--secondary: cancel
    .modal__input: all inputs
    .modal__input--date: date picker
    .modal__input--text: 
    .modal__input--text_long: Todo details
    .modal__label: labels input
    .modal__row: holds row of modal data
    .modal__text: 
    .modal__title: top of modal
  */

  //private variables
  const _actionButton = document.createElement('button');
  const _cancelButton = document.createElement('button');
  const _todoDetails = document.createElement('textarea');
  const _todoDueDate = document.createElement('input');
  const _todoTitle = document.createElement('input');
  const _projectTitle = document.createElement('input');

  const _clearModal = () => {
    while(container.firstChild) {
      container.removeChild(container.firstChild);
    };
  };

  const _showModal = () => {
    overlay.classList.remove('modal--hidden');
    container.classList.remove('modal--hidden');
  };

  const getActionButton = () => _actionButton;
  const getCancelButton = () => _cancelButton;
  const getTodoDetails = () => _todoDetails;
  const getTodoDueDate = () => _todoDueDate;
  const getTodoTitle = () => _todoTitle;
  const getOverlay = () => overlay;
  const getProjectTitle = () => _projectTitle;

  const hideModal = () => {
    overlay.classList.add('modal--hidden');
    container.classList.add('modal--hidden');
    _clearModal();
  };

  const loadModal = () => {
    _actionButton.classList.add('modal__button', 'modal__button--primary');
    _cancelButton.classList.add('modal__button', 'modal__button--secondary');
    _todoDetails.classList.add('modal__input', 'modal__input--text_long');
    _todoDetails.cols = '40';
    _todoDetails.rows = '4';
    _todoDueDate.classList.add('modal__input', 'modal__input--date');
    _todoDueDate.type = 'date';
    _todoTitle.classList.add('modal__input', 'modal__input--text');
    _todoTitle.type = 'text'
    _projectTitle.classList.add('modal__input', 'modal__input--text');
    _projectTitle.type = 'text';
  };

  const showProjectAdd = () => {
    _clearModal();
    const title = document.createElement('div');
    title.classList.add('modal__title');
    title.textContent = 'Add Project';
    const separator = document.createElement('div');
    separator.classList.add('modal__separator');

    const projectTitleLabel = document.createElement('label');
    projectTitleLabel.classList.add('modal__label');
    projectTitleLabel.textContent = 'Title';
    _projectTitle.value = '';

    const buttonHolder = document.createElement('div');
    buttonHolder.classList.add('modal__row');
    _actionButton.textContent = 'Add';
    _cancelButton.textContent = 'Cancel';
    buttonHolder.appendChild(_actionButton);
    buttonHolder.appendChild(_cancelButton);

    container.appendChild(title);
    container.appendChild(separator);
    container.appendChild(projectTitleLabel);
    container.appendChild(_projectTitle);
    container.appendChild(buttonHolder);
    _showModal();
  };

  const showProjectDelete = () => {
    _clearModal();
    const title = document.createElement('div');
    title.classList.add('modal__title');
    title.textContent = 'Delete Project';
    const separator = document.createElement('div');
    separator.classList.add('modal__separator');

    const text = document.createElement('div');
    text.classList.add('modal__text');
    text.textContent = 'Are you sure you want to delete this project?';

    const buttonHolder = document.createElement('div');
    buttonHolder.classList.add('modal__row');
    _actionButton.textContent = 'Delete';
    _cancelButton.textContent = 'Cancel';
    buttonHolder.appendChild(_actionButton);
    buttonHolder.appendChild(_cancelButton);

    container.appendChild(title);
    container.appendChild(separator);
    container.appendChild(text);
    container.appendChild(buttonHolder);
    _showModal();
  };

  const showProjectEdit = (title) => {
    _clearModal();
    const titleNode = document.createElement('div');
    titleNode.classList.add('modal__title');
    titleNode.textContent = 'Edit Project';
    const separator = document.createElement('div');
    separator.classList.add('modal__separator');

    const projectTitleLabel = document.createElement('label');
    projectTitleLabel.classList.add('modal__label');
    projectTitleLabel.textContent = 'Title';
    _projectTitle.value = title;

    const buttonHolder = document.createElement('div');
    buttonHolder.classList.add('modal__row');
    _actionButton.textContent = 'Edit';
    _cancelButton.textContent = 'Cancel';
    buttonHolder.appendChild(_actionButton);
    buttonHolder.appendChild(_cancelButton);

    container.appendChild(titleNode);
    container.appendChild(separator);
    container.appendChild(projectTitleLabel);
    container.appendChild(_projectTitle);
    container.appendChild(buttonHolder);
    _showModal();
  };

  const showTodoAdd = () => {
    _clearModal();
    const title = document.createElement('div');
    title.classList.add('modal__title');
    title.textContent = 'Add Todo';
    const separator = document.createElement('div');
    separator.classList.add('modal__separator');

    const todoTitleLabel = document.createElement('label');
    todoTitleLabel.classList.add('modal__label');
    todoTitleLabel.textContent = 'Title';
    _todoTitle.value = '';

    const todoDetailsLabel = document.createElement('label');
    todoDetailsLabel.classList.add('modal__label');
    todoDetailsLabel.textContent = 'Details';
    _todoDetails.value = '';

    const todoDueDateLabel = document.createElement('label');
    todoDueDateLabel.classList.add('modal__label');
    todoDueDateLabel.textContent = 'Due Date';
    _todoDueDate.value = format(new Date(), 'yyyy-MM-dd');

    const buttonHolder = document.createElement('div');
    buttonHolder.classList.add('modal__row');
    _actionButton.textContent = 'Add';
    _cancelButton.textContent = 'Cancel';
    buttonHolder.appendChild(_actionButton);
    buttonHolder.appendChild(_cancelButton);

    container.appendChild(title);
    container.appendChild(separator);
    container.appendChild(todoTitleLabel);
    container.appendChild(_todoTitle);
    container.appendChild(todoDetailsLabel);
    container.appendChild(_todoDetails);
    container.appendChild(todoDueDateLabel);
    container.appendChild(_todoDueDate);
    container.appendChild(buttonHolder);
    _showModal();
  };

  const showTodoDelete = () => {
    _clearModal();
    const title = document.createElement('div');
    title.classList.add('modal__title');
    title.textContent = 'Delete Todo';
    const separator = document.createElement('div');
    separator.classList.add('modal__separator');

    const text = document.createElement('div');
    text.classList.add('modal__text');
    text.textContent = 'Are you sure you want to delete this todo?';

    const buttonHolder = document.createElement('div');
    buttonHolder.classList.add('modal__row');
    _actionButton.textContent = 'Delete';
    _cancelButton.textContent = 'Cancel';
    buttonHolder.appendChild(_actionButton);
    buttonHolder.appendChild(_cancelButton);

    container.appendChild(title);
    container.appendChild(separator);
    container.appendChild(text);
    container.appendChild(buttonHolder);
    _showModal();
  };

  const showTodoEdit = (details, dueDate, title) => {
    _clearModal();
    const titleNode = document.createElement('div');
    titleNode.classList.add('modal__title');
    titleNode.textContent = 'Edit Todo';
    const separator = document.createElement('div');
    separator.classList.add('modal__separator');

    const todoTitleLabel = document.createElement('label');
    todoTitleLabel.classList.add('modal__label');
    todoTitleLabel.textContent = 'Title';
    _todoTitle.value = title;

    const todoDetailsLabel = document.createElement('label');
    todoDetailsLabel.classList.add('modal__label');
    todoDetailsLabel.textContent = 'Details';
    _todoDetails.value = details;

    const todoDueDateLabel = document.createElement('label');
    todoDueDateLabel.classList.add('modal__label');
    todoDueDateLabel.textContent = 'Due Date';
    _todoDueDate.value = format(dueDate, 'yyyy-MM-dd');

    const buttonHolder = document.createElement('div');
    buttonHolder.classList.add('modal__row');
    _actionButton.textContent = 'Edit';
    _cancelButton.textContent = 'Cancel';
    buttonHolder.appendChild(_actionButton);
    buttonHolder.appendChild(_cancelButton);

    container.appendChild(titleNode);
    container.appendChild(separator);
    container.appendChild(todoTitleLabel);
    container.appendChild(_todoTitle);
    container.appendChild(todoDetailsLabel);
    container.appendChild(_todoDetails);
    container.appendChild(todoDueDateLabel);
    container.appendChild(_todoDueDate);
    container.appendChild(buttonHolder);
    _showModal();
  };

  return {
    getActionButton,
    getCancelButton,
    getTodoDetails,
    getTodoDueDate,
    getTodoTitle,
    getOverlay,
    getProjectTitle,
    hideModal,
    loadModal,
    showProjectAdd,
    showProjectDelete,
    showProjectEdit,
    showTodoAdd,
    showTodoDelete,
    showTodoEdit
  };
};

export {Modal};