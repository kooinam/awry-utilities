'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    breadcrumbs: {}
  };
  var action = arguments[1];

  switch (action.type) {
    case 'SET_BREADCRUMB':
      var newBreadcrumbs = {};
      newBreadcrumbs[action.payload.layer] = action.payload.breadcrumb;

      return Object.assign({}, state, {
        breadcrumbs: newBreadcrumbsnewBreadcrumbs
      });
    default:
      return state;
  }
};