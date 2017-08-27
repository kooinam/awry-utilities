'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    ssrItems: {}
  };
  var action = arguments[1];

  switch (action.type) {
    case 'SETUP_SSR_ITEMS':
      var keys = Object.keys(action.payload.ssrItems);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (state.ssrItems[key] != action.payload.ssrItems[key]) {
            state.ssrItems[key] = action.payload.ssrItems[key];
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

      state.ssrItems = Object.assign({}, state.ssrItems);

      return state;
    case 'INVALIDATE_SSR_ITEMS':
      state.ssrItems[action.payload.key].isServed = true;
      state.ssrItems = Object.assign({}, state.ssrItems);

      return state;
    default:
      return state;
  }
};