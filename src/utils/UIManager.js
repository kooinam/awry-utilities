import React, { Component } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import formatCurrency from 'format-currency';
import dateFormat from 'dateformat';
import { Icon } from 'antd';

import { getBaseUrl } from './NetworkManager';

function capitalize(str, dep) {
  if (dep && dep.length > 0 && dep[0] === dep[0].toUpperCase()) {
    return '';
  }
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
  if (amount < 0) {
    newAmount = -amount;
  }
  const symbol = getSymbolFromCurrency(currency);
  const opts = {
    format: '%s%v',
    symbol: symbol,
  };
  if (amount === 0 || amount) {
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

    if (typeof (fieldError) === 'string') {
      message = `${message} ${capitalize(field, fieldError)} ${fieldError}`;
    } else if (fieldError instanceof Array === false) {
      message = `${message} ${capitalize(field, fieldError.message)} ${fieldError.message}`;
    } else {
      for (let errorMessage of fieldError) {
        message = `${message} ${capitalize(field, errorMessage)} ${errorMessage}`;
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
    if (error && error.response && error.response.data.errors && error.response.data.errors[field]) {
      const fieldError = error.response.data.errors[field];

      if (typeof (fieldError) === 'string') {
        message = `${message} ${capitalize(field, fieldError)} ${fieldError}`;
      } else if (fieldError instanceof Array === false) {
        message = `${message} ${capitalize(field, fieldError.message)} ${fieldError.message}`;
      } else {
        for (let errorMessage of fieldError) {
          message = `${message} ${capitalize(field, errorMessage)} ${errorMessage}`;
        }
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

export const formatImageUrl = (url, key) => {
  key = key || 'resources';

  if(url && url.length > 0) {
    if(url[0] == '/') {
      return `${getBaseUrl(key)}/${url}`;
    }
    else {
      return url;
    }
  }
};

export const formatInteger = (string) => {
  if (string) {
    return string.replace(/[^0-9\.]+/g,"");
  }

  return null;
};

export const formatBooleanSign = (value) => {
  if(value) {
    return (
      <Icon type="check" className="ant-success-icon" />
    );
  }

  return (
    <Icon type="close" className="ant-danger-icon" />
  );
};