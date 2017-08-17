function capitalize(str) {
  // let strVal = '';
  let newStr = str.replace(/_/g, ' ');
  // newStr = newStr.split(' ');
  const cap = newStr.substring(0, 1).toUpperCase();
  const rest = newStr.substring(1, newStr.length);
  newStr = `${cap}${rest}`;


  return newStr;
}

export const getErrorDescription = (error) => {
  let message = 'Something went wrong. Please try again later.';
  if (error && error.response) {
    if (error.response && error.response.data && error.response.data.errors
      && error.response.data.errors.base) {
      message = error.response.data.errors.base;
    }
  }

  return message;
};

export const getFieldError = (error, field) => {
  let message = null;
  if (error && error.response && error.response.data.errors && error.response.data.errors[field]) {
    message = '';
    const fieldError = error.response.data.errors[field];
    if (typeof (fieldError) === 'object') {
      message = `${capitalize(field)} ${fieldError.message}`;
    } else {
      fieldError.each((errorMessage) => {
        message = `${message} ${capitalize(field)} ${errorMessage}`;
      });
    }
  }

  if (message) {
    return {
      validateStatus: 'error',
      help: message,
    };
  }

  return {};
};

export const getFieldsError = (error, fields) => {
  let message = '';
  for(let field of fields) {
    if (error && error.response && error.response.data.errors
      && error.response.data.errors[field]) {
      error.response.data.errors[field].each((errorMessage) => {
        message = `${message} ${capitalize(field)} ${errorMessage}`;
      });
    }
  };

  if (message.length > 0) {
    return {
      validateStatus: 'error',
      help: message,
    };
  }

  return {};
};

export const getNotificationDuration = () =>
  3;

