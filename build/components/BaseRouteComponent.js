'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseRouteComponent = function BaseRouteComponent(props) {
  var url = '';
  if (props.match) {
    url = props.match.url + '/';
  }

  var routeWithSubRoutes = function routeWithSubRoutes(route) {
    return _react2.default.createElement(_reactRouterDom.Route, {
      key: route.path,
      exact: route.exact || false,
      path: '' + url + route.path,
      render: function render(childProps) {
        return (
          // Pass the sub-routes down to keep nesting
          _react2.default.createElement(route.component, _extends({}, childProps, { routes: route.routes, routeProps: route.routeProps, onMount: props.onMount }))
        );
      }
    });
  };

  return _react2.default.createElement(
    _reactRouterDom.Switch,
    null,
    props.routes.map(function (route) {
      return routeWithSubRoutes(route);
    })
  );
};

exports.default = BaseRouteComponent;