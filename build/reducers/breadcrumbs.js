'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    breadcrumbIdentifiers: {}
  };
  var action = arguments[1];

  switch (action.type) {
    case 'SETUP_BREADCRUMB_IDENTIFIERS':
      var keys = Object.keys(action.payload.breadcrumbIdentifiers);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (state.breadcrumbIdentifiers[key] != action.payload.breadcrumbIdentifiers[key]) {
            return Object.assign({}, state, {
              breadcrumbIdentifiers: action.payload.breadcrumbIdentifiers
            });
          }
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

      return state;
    default:
      return state;
  }
};