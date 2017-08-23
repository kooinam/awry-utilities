'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var setupBreadcrumbIdentifiers = exports.setupBreadcrumbIdentifiers = function setupBreadcrumbIdentifiers(breadcrumbIdentifiers) {
  return function (dispatch) {
    return dispatch({
      type: 'SETUP_BREADCRUMB_IDENTIFIERS',
      payload: {
        breadcrumbIdentifiers: breadcrumbIdentifiers
      }
    });
  };
};