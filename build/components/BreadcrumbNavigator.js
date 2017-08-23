'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expandRoutes = undefined;

var _css = require('antd/lib/breadcrumb/style/css');

var _breadcrumb = require('antd/lib/breadcrumb');

var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import BreadcrumbItemComponent from './BreadcrumbItemComponent';

var expandRoutes = exports.expandRoutes = function expandRoutes(routes, parentRoute) {
  var newRoutes = [];

  routes.forEach(function (route) {
    var newRoute = Object.assign({}, route);
    if (parentRoute) {
      newRoute.parentRoute = parentRoute;
      newRoute.path = parentRoute.path + '/' + newRoute.path;
    }
    if (route.routes) {
      expandRoutes(newRoute.routes, newRoute).forEach(function (childRoute) {
        newRoutes.push(childRoute);
      });
    }
    newRoutes.push(newRoute);
  });

  return newRoutes;
};

var BreadcrumbNavigator = function (_Component) {
  _inherits(BreadcrumbNavigator, _Component);

  function BreadcrumbNavigator(props) {
    _classCallCheck(this, BreadcrumbNavigator);

    var _this = _possibleConstructorReturn(this, (BreadcrumbNavigator.__proto__ || Object.getPrototypeOf(BreadcrumbNavigator)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(BreadcrumbNavigator, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var matchedRoute = null;
      var matchedRoutes = [];

      var newRoutes = expandRoutes(this.props.routes, null);
      var match = newRoutes.some(function (route) {
        var match = (0, _reactRouterDom.matchPath)(_this2.props.router.location.pathname, route);
        if (match) {
          matchedRoute = route;
        }

        return match;
      });

      if (matchedRoute) {
        var tempRoute = matchedRoute;
        while (tempRoute) {
          matchedRoutes.push(tempRoute);
          tempRoute = tempRoute.parentRoute;
        }
      }

      var breadcrumbItems = matchedRoutes.reverse().filter(function (route) {
        return route.breadcrumbName;
      });
      breadcrumbItems = breadcrumbItems.map(function (route, index) {
        if (index < breadcrumbItems.length - 1) {
          return _react2.default.createElement(
            _breadcrumb2.default.Item,
            { key: _lodash2.default.uniqueId() },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: route.path },
              route.breadcrumbName
            )
          );
        } else {
          return _react2.default.createElement(
            _breadcrumb2.default.Item,
            { key: _lodash2.default.uniqueId() },
            _react2.default.createElement(
              'b',
              null,
              route.breadcrumbName
            )
          );
        }
      });

      return _react2.default.createElement(
        _breadcrumb2.default,
        { className: '' + this.props.className },
        breadcrumbItems
      );
    }
  }]);

  return BreadcrumbNavigator;
}(_react.Component);

/* eslint-disable no-unused-vars */


var connector = (0, _reactRedux.connect)(function (_ref) {
  var router = _ref.router;
  return {
    router: router
  };
});
/* eslint-enable no-unused-vars */

exports.default = connector(BreadcrumbNavigator);