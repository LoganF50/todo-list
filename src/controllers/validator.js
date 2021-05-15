const Validator = () => {
  const validateTodoItem = (title, details, dueDate) => {
    let isValid = true;
    let errorMsg = '';

    if(title.length === 0) {
      isValid = false;
      errorMsg = 'Todo title cannot be blank';
    } else if(dueDate == '') {
      isValid = false;
      errorMsg = 'Todo due date cannot be blank';
    }

    return {isValid: isValid, errorMsg: errorMsg};
  };

  const validateTodoProject = (title) => {
    let isValid = true;
    let errorMsg = '';

    if(title.length === 0) {
      isValid = false;
      errorMsg = 'Project title cannot be blank';
    }

    return {isValid: isValid, errorMsg: errorMsg};
  };

  return {
    validateTodoItem,
    validateTodoProject
  }
};

export {Validator};