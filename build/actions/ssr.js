'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var setupSSRItems = exports.setupSSRItems = function setupSSRItems(ssrItems) {
  return function (dispatch) {
    return dispatch({
      type: 'SETUP_SSR_ITEMS',
      payload: {
        ssrItems: ssrItems
      }
    });
  };
};

var invalidateSSRItems = exports.invalidateSSRItems = function invalidateSSRItems(key) {
  return function (dispatch) {
    return dispatch({
      type: 'INVALIDATE_SSR_ITEMS',
      payload: {
        key: key
      }
    });
  };
};