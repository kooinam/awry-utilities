"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var renderActions = function renderActions(actions) {
  var components = _.filter(actions, function (action) {
    return action.canAccess;
  }).map(function (action) {
    return action.component;
  });

  return components;
};

exports.default = renderActions;