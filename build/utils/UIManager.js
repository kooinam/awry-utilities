'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
    if (fieldError instanceof Array === false) {
      message = capitalize(field) + ' ' + fieldError.message;
    } else {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = fieldError[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var errorMessage = _step.value;

          message = message + ' ' + capitalize(field) + ' ' + errorMessage;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
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
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop = function _loop() {
      var field = _step2.value;

      if (error && error.response && error.response.data.errors && error.response.data.errors[field]) {
        error.response.data.errors[field].each(function (errorMessage) {
          message = message + ' ' + capitalize(field) + ' ' + errorMessage;
        });
      }
    };

    for (var _iterator2 = fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  ;

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