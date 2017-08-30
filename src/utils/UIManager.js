import getSymbolFromCurrency from 'currency-symbol-map';
import formatCurrency from 'format-currency';

function capitalize(str) {
  // let strVal = '';
  let newStr = str.replace(/_/g, ' ');
  // newStr = newStr.split(' ');
  const cap = newStr.substring(0, 1).toUpperCase();
  const rest = newStr.substring(1, newStr.length);
  newStr = `${cap}${rest}`;


  return newStr;
}

export const formatMoney = (amount, currency, placeholder) => {
  const newPlaceholder = placeholder || '$0.00';
  let newAmount = amount;
  if(amount < 0) {
    newAmount = -amount;
  }
  const symbol = getSymbolFromCurrency(currency);
  const opts = {
    format: '%s%v',
    symbol: symbol,
  };
  if(amount) {
    return formatCurrency(amount, opts);
  }

  return newPlaceholder;
}

export const formatDate = (date) => {
  if(date) {
    return dateFormat(date, 'dd mmm yyyy');
  }

  return null;
}

export const formatTime = (date) => {
  if(date) {
    return dateFormat(date, 'h:MM:ss TT');
  }

  return null;
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
    if (fieldError instanceof Array === false) {
      message = `${capitalize(field)} ${fieldError.message}`;
    } else {
      for(let errorMessage of fieldError) {
        message = `${message} ${capitalize(field)} ${errorMessage}`;
      }
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
      for (let errorMessage of error.response.data.errors[field]) {
        message = `${message} ${capitalize(field)} ${errorMessage}`;
      }
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

export const getMessageDuration = () =>
  3;
