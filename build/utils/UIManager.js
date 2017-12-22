'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatBooleanSign = exports.formatInteger = exports.formatImageUrl = exports.getMessageDuration = exports.getNotificationDuration = exports.getFieldsError = exports.getFieldError = exports.getErrorDescription = exports.formatTime = exports.formatDate = exports.formatMoney = undefined;

var _css = require('antd/lib/icon/style/css');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _currencySymbolMap = require('currency-symbol-map');

var _currencySymbolMap2 = _interopRequireDefault(_currencySymbolMap);

var _dateformat = require('dateformat');

var _dateformat2 = _interopRequireDefault(_dateformat);

var _NetworkManager = require('./NetworkManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require('assert');
var parseNum = require('parse-num');

function formatNumber(number, opts) {
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
  }, opts));

  number = parseNum(number);

  if (isNaN(number)) {
    if (opts.nanZero === false) return 'NaN';else number = 0;
  }

  var nf = new Intl.NumberFormat([opts.locale], Object.assign({}, opts, { style: 'decimal' }));
  return nf.format(number);
}

function renameKeyShortcuts(opts) {
  Object.keys(opts).forEach(function (key) {
    expandMin(opts, key);
    expandMax(opts, key);
  });

  Object.keys(opts).forEach(function (key) {
    return addDigits(opts, key);
  });

  return opts;
}

function expandMin(opts, key) {
  expand(opts, key, 'min', 'minimum');
}
function expandMax(opts, key) {
  expand(opts, key, 'max', 'maximum');
}

function expand(opts, key, shorthand, full) {
  if (!key.includes(full) && key.startsWith(shorthand)) {
    replaceKey(opts, key, key.replace(shorthand, full));
  }
}

function addDigits(opts, key) {
  if ((key.startsWith('minimum') || key.startsWith('maximum')) && !key.endsWith('Digits')) {
    replaceKey(opts, key, key + 'Digits');
  }
}

function replaceKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

function formatCurrency(amount, opts) {
  opts = Object.assign({}, {
    format: '%v', // %s => symbol, %v => value, %c => code
    code: undefined,
    symbol: undefined,
    locale: 'en-US',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    nanZero: true
  }, opts);
  assert(opts.format.includes('%v'), 'Must have "%v" in `format` options.');

  amount = formatNumber(amount, opts);

  return opts.format.replace('%v', amount).replace('%s', opts.symbol).replace('%c', opts.code);
}

function capitalize(str, dep) {
  if (dep && dep.length > 0 && dep[0] === dep[0].toUpperCase()) {
    return '';
  }
  // let strVal = '';
  var newStr = str.replace(/_/g, ' ');
  // newStr = newStr.split(' ');
  var cap = newStr.substring(0, 1).toUpperCase();
  var rest = newStr.substring(1, newStr.length);
  newStr = '' + cap + rest;

  return newStr;
}

var formatMoney = exports.formatMoney = function formatMoney(amount, currency, placeholder) {
  var newPlaceholder = placeholder || '$0.00';
  var newAmount = amount;
  if (amount < 0) {
    newAmount = -amount;
  }
  var symbol = (0, _currencySymbolMap2.default)(currency);
  var opts = {
    format: '%s%v',
    symbol: symbol
  };
  if (amount === 0 || amount) {
    return formatCurrency(amount, opts);
    // return amount;
  }

  return newPlaceholder;
};

var formatDate = exports.formatDate = function formatDate(date) {
  if (date) {
    return (0, _dateformat2.default)(date, 'dd mmm yyyy');
  }

  return null;
};

var formatTime = exports.formatTime = function formatTime(date) {
  if (date) {
    return (0, _dateformat2.default)(date, 'h:MM:ss TT');
  }

  return null;
};

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
  var iErrors = [];
  if (error && error.response && error.response.data.errors && error.response.data.errors[field]) {
    message = '';
    var fieldError = error.response.data.errors[field];
    var iError = {
      field: field,
      messages: []
    };
    if (typeof fieldError === 'string') {
      message = message + ' ' + capitalize(field, fieldError) + ' ' + fieldError;
      iError.messages.push(fieldError);
    } else if (fieldError instanceof Array === false) {
      message = message + ' ' + capitalize(field, fieldError.message) + ' ' + fieldError.message;
      iError.messages.push(fieldError.message);
    } else {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = fieldError[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var errorMessage = _step.value;

          message = message + ' ' + capitalize(field, errorMessage) + ' ' + errorMessage;
          iError.messages.push(errorMessage);
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
    if (iError.messages.length > 0) {
      iErrors.push(iError);
    }
  }

  if (message) {
    return {
      validateStatus: 'error',
      help: message,
      errors: iErrors
    };
  }

  return {};
};

var getFieldsError = exports.getFieldsError = function getFieldsError(error, fields) {
  var message = '';
  var iErrors = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var field = _step2.value;

      if (error && error.response && error.response.data.errors && error.response.data.errors[field]) {
        var fieldError = error.response.data.errors[field];
        var iError = {
          field: field,
          messages: []
        };
        if (typeof fieldError === 'string') {
          message = message + ' ' + capitalize(field, fieldError) + ' ' + fieldError;
          iError.messages.push(fieldError);
        } else if (fieldError instanceof Array === false) {
          message = message + ' ' + capitalize(field, fieldError.message) + ' ' + fieldError.message;
          iError.messages.push(fieldError.message);
        } else {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = fieldError[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var errorMessage = _step3.value;

              message = message + ' ' + capitalize(field, errorMessage) + ' ' + errorMessage;
              iError.messages.push(errorMessage);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
        if (iError.messages.length > 0) {
          iErrors.push(iError);
        }
      }
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
      help: message,
      errors: iErrors
    };
  }

  return {};
};

var getNotificationDuration = exports.getNotificationDuration = function getNotificationDuration() {
  return 3;
};

var getMessageDuration = exports.getMessageDuration = function getMessageDuration() {
  return 3;
};

var formatImageUrl = exports.formatImageUrl = function formatImageUrl(url, key) {
  key = key || 'resources';

  if (url && url.length > 0) {
    if (url[0] == '/') {
      return (0, _NetworkManager.getBaseUrl)(key) + '/' + url;
    } else {
      return url;
    }
  }
};

var formatInteger = exports.formatInteger = function formatInteger(string) {
  if (string) {
    return string.replace(/[^0-9\.]+/g, "");
  }

  return null;
};

var formatBooleanSign = exports.formatBooleanSign = function formatBooleanSign(value) {
  if (value) {
    return _react2.default.createElement(_icon2.default, { type: 'check', className: 'ant-success-icon' });
  }

  return _react2.default.createElement(_icon2.default, { type: 'close', className: 'ant-danger-icon' });
};