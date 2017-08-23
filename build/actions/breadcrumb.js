'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var setupBreadcrumb = exports.setupBreadcrumb = function setupBreadcrumb(layer, name) {
  return function (dispatch) {
    return dispatch({
      type: 'SET_BREADCRUMB',
      layer: layer,
      breadcrumb: {
        name: name,
        path: path
      }
    });
  };
};