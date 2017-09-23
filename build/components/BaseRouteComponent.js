'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _BreadcrumbsNavigator = require('./BreadcrumbsNavigator');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseRouteComponent = function (_Component) {
  _inherits(BaseRouteComponent, _Component);

  function BaseRouteComponent() {
    _classCallCheck(this, BaseRouteComponent);

    return _possibleConstructorReturn(this, (BaseRouteComponent.__proto__ || Object.getPrototypeOf(BaseRouteComponent)).apply(this, arguments));
  }

  _createClass(BaseRouteComponent, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          match = _props.match,
          matchedRoutes = _props.matchedRoutes,
          onMount = _props.onMount,
          routes = _props.routes;

      var url = '';
      if (match) {
        if (match.url && match.url.length > 1) {
          url = match.url + '/';
        } else {
          url = match.url;
        }
      }

      var routeWithSubRoutes = function routeWithSubRoutes(route) {
        var key = '' + url + route.path;

        var matchedRoute = matchedRoutes.find(function (r) {
          return r.originalPath === key;
        });

        if (matchedRoute) {
          key = matchedRoute.path;
        }

        return _react2.default.createElement(_reactRouterDom.Route, {
          key: key,
          exact: route.exact || false,
          path: '' + url + route.path,
          render: function render(childProps) {
            return (
              // Pass the sub-routes down to keep nesting
              _react2.default.createElement(route.component, _extends({}, _this2.props, childProps, { routes: route.routes || [], routeProps: route.routeProps, onMount: onMount, matchedRoutes: matchedRoutes }))
            );
          }
        });
      };

      return _react2.default.createElement(
        _reactRouterDom.Switch,
        { location: this.props.location },
        routes.map(function (route) {
          return routeWithSubRoutes(route);
        })
      );
    }
  }]);

  return BaseRouteComponent;
}(_react.Component);

;

/* eslint-disable no-unused-vars */
var connector = (0, _reactRedux.connect)(function (state) {
  return {
    location: state.router.location
  };
});
/* eslint-enable no-unused-vars */

exports.default = connector(BaseRouteComponent);