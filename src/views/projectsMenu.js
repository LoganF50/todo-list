import {getSVGElement} from './../utilities.js';

const ProjectsMenu = (container) => {
  let _todayProject = document.createElement('div');
  let _todayCount = document.createElement('div');
  let _upcomingProject = document.createElement('div');
  let _upcomingCount = document.createElement('div');
  let _defaultProject = document.createElement('div');
  let _defaultCount = document.createElement('div');
  let _addProjectIcon = getSVGElement('add-sharp');
  let _userProjectsContainer = document.createElement('div');

  const _clearUserProjects = () => {
    while(_userProjectsContainer.firstChild) {
      _userProjectsContainer.removeChild(_userProjectsContainer.firstChild);
    }
  };

  const _getUserProjectNode = (id, title, count) => {
    let projectElement = document.createElement('div');
    projectElement.classList.add('sidebar__project', 'sidebar__project--user');
    projectElement.dataset.id = id;

    let titleElement = document.createElement('div');
    let countElement = document.createElement('div');
    titleElement.textContent = title;
    titleElement.classList.add('sidebar__title');
    countElement.textContent = count;
    countElement.classList.add('sidebar__count');

    projectElement.appendChild(titleElement);
    projectElement.appendChild(countElement);

    return projectElement;
  };

  const _getStaticProjectNode = (projectElement, countElement, title) => {
    projectElement.classList.add('sidebar__project', 'sidebar__project--static');
    let titleElement = document.createElement('div');
    titleElement.textContent = title;
    titleElement.classList.add('sidebar__title');
    countElement.textContent = 0;
    countElement.classList.add('sidebar__count');

    projectElement.appendChild(titleElement);
    projectElement.appendChild(countElement);
    return projectElement;
  };

  const _loadUserProjects = () => {
    let userContainer = document.createElement('div');
    let userHeaderContainer = document.createElement('div');
    userHeaderContainer.classList.add('sidebar__header');
    let headerTitle = document.createElement('div');
    headerTitle.textContent = 'User Projects';
    _addProjectIcon.classList.add('sidebar__icon');
    userHeaderContainer.appendChild(headerTitle);
    userHeaderContainer.appendChild(_addProjectIcon);

    _userProjectsContainer.classList.add('sidebar__projectContainer');
    userContainer.appendChild(userHeaderContainer);
    userContainer.appendChild(_userProjectsContainer);

    return userContainer;
  };

  const _loadStaticProjects = () => {
    let staticContainer = document.createElement('div');
    staticContainer.classList.add('sidebar__projectContainer');
    let TodayNode = _getStaticProjectNode(_todayProject, _todayCount, 'Today');
    let UpcomingNode = _getStaticProjectNode(_upcomingProject, _upcomingCount, 'Upcoming');
    let defaultNode = _getStaticProjectNode(_defaultProject, _defaultCount, 'Default');
    staticContainer.appendChild(TodayNode);
    staticContainer.appendChild(UpcomingNode);
    staticContainer.appendChild(defaultNode);

    return staticContainer;
  };

  const getAddIcon = () => _addProjectIcon;
  const getDefaultProject = () => _defaultProject;
  const getTodayProject = () => _todayProject;
  const getUpcomingProject = () => _upcomingProject;
  const getUserProjects = () => {
    return _userProjectsContainer.childNodes;
  };

  //used for initial page load
  const loadProjectsMenu = () => {
    container.appendChild(_loadStaticProjects());
    container.appendChild(_loadUserProjects());
  };

  const toggleMenuVisibility = () => {
    container.classList.toggle('sidebar--closed');
  }

  //updates todo counts for each static project
  const updateStaticCounts = (todayCount, upcomingCount, defaultCount) => {
    _todayCount.textContent = todayCount;
    _upcomingCount.textContent = upcomingCount;
    _defaultCount.textContent = defaultCount;
  };

  const updateUserProjects = (projects) => {
    _clearUserProjects();
    projects.forEach(project => {
      let projectNode = _getUserProjectNode(project.getId(), project.getTitle(), project.getTodoList().length);
      _userProjectsContainer.appendChild(projectNode);
    });
  };

  return {
    getAddIcon,
    getDefaultProject,
    getTodayProject,
    getUpcomingProject,
    getUserProjects,
    loadProjectsMenu,
    toggleMenuVisibility,
    updateStaticCounts,
    updateUserProjects
  };
};

export {ProjectsMenu};