'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderActions = function renderActions(props) {
  var components = _.filter(props.actions, function (action) {
    return action.canAccess;
  }).map(function (action) {
    return action.component;
  });

  return components;
};

exports.default = renderActions;