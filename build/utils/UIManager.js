'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function capitalize(str) {
  // let strVal = '';
  var newStr = str.replace(/_/g, ' ');
  // newStr = newStr.split(' ');
  var cap = newStr.substring(0, 1).toUpperCase();
  var rest = newStr.substring(1, newStr.length);
  newStr = '' + cap + rest;

  return newStr;
}

var getErrorDescription = exports.getErrorDescription = function getErrorDescription(error) {
  var message = 'Something went wrong. Please try again later.';
  if (error && error.response) {
    if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.base) {
      message = error.response.data.errors.base;
    }
  }

  return message;
};

var getFieldError = exports.getFieldError = function getFieldError(error, field) {
  var message = null;
  if (error && error.response && error.response.data.errors && error.response.data.errors[field]) {
    message = '';
    var fieldError = error.response.data.errors[field];
    if ((typeof fieldError === 'undefined' ? 'undefined' : _typeof(fieldError)) === 'object') {
      message = capitalize(field) + ' ' + fieldError.message;
    } else {
      fieldError.each(function (errorMessage) {
        message = message + ' ' + capitalize(field) + ' ' + errorMessage;
      });
    }
  }

  if (message) {
    return {
      validateStatus: 'error',
      help: message
    };
  }

  return {};
};

var getFieldsError = exports.getFieldsError = function getFieldsError(error, fields) {
  var message = '';
  fields.each(function (field) {
    if (error && error.response && error.response.data.errors && error.response.data.errors[field]) {
      error.response.data.errors[field].each(function (errorMessage) {
        message = message + ' ' + capitalize(field) + ' ' + errorMessage;
      });
    }
  });

  if (message.length > 0) {
    return {
      validateStatus: 'error',
      help: message
    };
  }

  return {};
};

var getNotificationDuration = exports.getNotificationDuration = function getNotificationDuration() {
  return 3;
};