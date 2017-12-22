import React, { Component } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import dateFormat from 'dateformat';
import { Icon } from 'antd';
const assert = require('assert')
const parseNum = require('parse-num')

function formatNumber (number, opts) {
  opts = renameKeyShortcuts(Object.assign({}, {
    nanZero: true,
    locale: 'en-US',
    localeMatcher: 'best fit',
    useGrouping: true, // grouping separator determined by locale
    maximumFractionDigits: 15
    // OTHER
    // minimumIntegerDigits
    // minimumFractionDigits
    // maximumFractionDigits
    // minimumSignificantDigits
    // maximumSignificantDigits
  }, opts))

  number = parseNum(number)

  if (isNaN(number)) {
    if (opts.nanZero === false) return 'NaN'
    else number = 0
  }

  const nf = new Intl.NumberFormat([opts.locale], Object.assign({}, opts, { style: 'decimal' }))
  return nf.format(number)
}

function renameKeyShortcuts (opts) {
  Object.keys(opts).forEach((key) => {
    expandMin(opts, key)
    expandMax(opts, key)
  })

  Object.keys(opts).forEach((key) => addDigits(opts, key))

  return opts
}

function expandMin (opts, key) {
  expand(opts, key, 'min', 'minimum')
}
function expandMax (opts, key) {
  expand(opts, key, 'max', 'maximum')
}

function expand (opts, key, shorthand, full) {
  if (!key.includes(full) && key.startsWith(shorthand)) {
    replaceKey(opts, key, key.replace(shorthand, full))
  }
}

function addDigits (opts, key) {
  if (
    (key.startsWith('minimum') || key.startsWith('maximum')) &&
    !key.endsWith('Digits')
  ) {
    replaceKey(opts, key, key + 'Digits')
  }
}

function replaceKey (obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey]
  delete obj[oldKey]
}

function formatCurrency (amount, opts) {
  opts = Object.assign({}, {
    format: '%v', // %s => symbol, %v => value, %c => code
    code: undefined,
    symbol: undefined,
    locale: 'en-US',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    nanZero: true
  }, opts)
  assert(opts.format.includes('%v'), 'Must have "%v" in `format` options.')

  amount = formatNumber(amount, opts)

  return opts.format.replace('%v', amount).replace('%s', opts.symbol).replace('%c', opts.code)
}

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
    // return amount;
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
  const iErrors = [];
  if (error && error.response && error.response.data.errors && error.response.data.errors[field]) {
    message = '';
    const fieldError = error.response.data.errors[field];
    const iError = {
      field: field,
      messages: [],
    };
    if (typeof (fieldError) === 'string') {
      message = `${message} ${capitalize(field, fieldError)} ${fieldError}`;
      iError.messages.push(fieldError);
    } else if (fieldError instanceof Array === false) {
      message = `${message} ${capitalize(field, fieldError.message)} ${fieldError.message}`;
      iError.messages.push(fieldError.message);
    } else {
      for (let errorMessage of fieldError) {
        message = `${message} ${capitalize(field, errorMessage)} ${errorMessage}`;
        iError.messages.push(errorMessage);
      }
    }
    if (iError.messages.length > 0) {
      iErrors.push(iError);
    }
  }

  if (message) {
    return {
      validateStatus: 'error',
      help: message,
      errors: iErrors,
    };
  }

  return {};
};

export const getFieldsError = (error, fields) => {
  let message = '';
  const iErrors = [];
  for(let field of fields) {
    if (error && error.response && error.response.data.errors && error.response.data.errors[field]) {
      const fieldError = error.response.data.errors[field];
      const iError = {
        field: field,
        messages: [],
      };
      if (typeof (fieldError) === 'string') {
        message = `${message} ${capitalize(field, fieldError)} ${fieldError}`;
        iError.messages.push(fieldError);
      } else if (fieldError instanceof Array === false) {
        message = `${message} ${capitalize(field, fieldError.message)} ${fieldError.message}`;
        iError.messages.push(fieldError.message);
      } else {
        for (let errorMessage of fieldError) {
          message = `${message} ${capitalize(field, errorMessage)} ${errorMessage}`;
          iError.messages.push(errorMessage);
        }
      }
      if (iError.messages.length > 0) {
        iErrors.push(iError);
      }
    }
  };

  if (message.length > 0) {
    return {
      validateStatus: 'error',
      help: message,
      errors: iErrors,
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