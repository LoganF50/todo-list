import { Header } from './views/header.js'
import { ProjectsMenu } from './views/projectsMenu.js'
import { MainContent } from './views/mainContent.js'
import { TodoProject } from './models/todoProject.js'
import { TodoItem } from './models/todoItem.js';

const header = Header(document.getElementById('header'));
const projectsMenu = ProjectsMenu(document.getElementById('sidebar'));
const mainContent = MainContent(document.getElementById('main'));
//project 1
const proj1 = TodoProject(1, 'Project 1', []);
const todoItem1 = TodoItem(1, proj1.getId(), 'Todo 1', 'some details about this todo item', '12/31/2021');
const todoItem2 = TodoItem(2, proj1.getId(), 'Todo 2', 'some details about this todo item', '2/9/2021');
proj1.addTodo(todoItem1);
proj1.addTodo(todoItem2);
//project 2
const proj2 = TodoProject(2, 'Project 2', []);
const todoItem3 = TodoItem(3, proj2.getId(), 'Todo 3', 'some details about this todo item', '4/9/2021');
proj2.addTodo(todoItem3);

const projects = [proj1, proj2];
header.loadHeader();
projectsMenu.loadProjectsMenu();
projectsMenu.updateUserProjects(projects);
mainContent.loadMainContent();
mainContent.updateCurrentProject(projects[0], true);

header.getMenuIcon().addEventListener('click', projectsMenu.toggleMenuVisibility);