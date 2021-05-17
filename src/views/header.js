import { getSVGElement } from "./../utilities.js";

const Header = (container) => {
  //private variables
  const _addIcon = getSVGElement("add-sharp");
  const _menuIcon = getSVGElement("menu-sharp");

  const _loadLeftMenu = () => {
    const iconContainer = document.createElement("div");
    _menuIcon.classList.add("header__icon");
    iconContainer.appendChild(_menuIcon);
    return iconContainer;
  };

  const _loadRightMenu = () => {
    const iconContainer = document.createElement("div");
    _addIcon.classList.add("header__icon");
    iconContainer.appendChild(_addIcon);
    return iconContainer;
  };

  const disableAddIcon = () => {
    _addIcon.classList.add("header__icon--disabled");
  };

  const enableAddIcon = () => {
    _addIcon.classList.remove("header__icon--disabled");
  };

  const getAddIcon = () => _addIcon;
  const getMenuIcon = () => _menuIcon;

  //used for initial loading of page
  const loadHeader = () => {
    //add all items to container
    container.appendChild(_loadLeftMenu());
    container.appendChild(_loadRightMenu());
  };

  return {
    disableAddIcon,
    enableAddIcon,
    getAddIcon,
    getMenuIcon,
    loadHeader,
  };
};

export { Header };
