'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var setupHelmet = exports.setupHelmet = function setupHelmet(items) {
  return function (dispatch) {
    return dispatch({
      type: 'SETUP_HELMET',
      payload: {
        items: items
      }
    });
  };
};