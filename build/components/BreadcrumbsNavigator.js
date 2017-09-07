'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchRouteProperty = exports.matchRouteParams = exports.matchBreadcrumbs = exports.matchRoutes = exports.expandRoutes = undefined;

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

var _breadcrumbs = require('../actions/breadcrumbs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var expandRoutes = exports.expandRoutes = function expandRoutes(routes, parentRoute) {
  var newRoutes = [];

  routes.forEach(function (route) {
    var newRoute = Object.assign({}, route);
    if (parentRoute) {
      newRoute.parentRoute = parentRoute;
      newRoute.path = parentRoute.path + '/' + newRoute.path;
    }
    newRoute.originalPath = newRoute.path;
    if (route.routes) {
      expandRoutes(newRoute.routes, newRoute).forEach(function (childRoute) {
        newRoutes.push(childRoute);
      });
    }
    newRoutes.push(newRoute);
  });

  return newRoutes;
};

var matchRoutes = exports.matchRoutes = function matchRoutes(routes, pathname) {
  var match = null;
  var matchedRoute = null;
  var matchedRoutes = [];

  var newRoutes = expandRoutes(routes, null);
  newRoutes.some(function (route) {
    match = (0, _reactRouterDom.matchPath)(pathname, route);
    if (match) {
      matchedRoute = route;
    }

    return match;
  });

  if (match && matchedRoute) {
    var tempRoute = matchedRoute;
    while (tempRoute) {
      var keys = Object.keys(match.params);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          var re = new RegExp(':' + key, "g");
          tempRoute.path = tempRoute.path.replace(re, match.params[key]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      matchedRoutes.push(tempRoute);
      tempRoute.match = match;
      tempRoute = tempRoute.parentRoute;
    }
  }

  return matchedRoutes.slice().reverse();
};

var matchBreadcrumbs = exports.matchBreadcrumbs = function matchBreadcrumbs(matchedRoutes, breadcrumbIdentifiers) {
  var matchedBreadcrumbs = matchedRoutes.map(function (route) {
    var breadcrumbName = route.routeProps && route.routeProps.breadcrumbName ? route.routeProps.breadcrumbName : '';
    var keys = Object.keys(breadcrumbIdentifiers);
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var key = _step2.value;

        var _re = new RegExp('%{' + key + '}', "g");
        breadcrumbName = breadcrumbName.replace(_re, breadcrumbIdentifiers[key] || ' ');
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    ;

    var re = new RegExp('%{[a-zA-Z0-9]*}', "g");
    breadcrumbName = breadcrumbName.replace(re, ' ');

    if (breadcrumbName.length > 0) {
      return {
        breadcrumbName: breadcrumbName,
        path: route.path
      };
    }

    return null;
  }).filter(function (route) {
    return route;
  });

  return matchedBreadcrumbs;
};

var matchRouteParams = exports.matchRouteParams = function matchRouteParams(matchedRoutes, key) {
  var matchedRoute = matchedRoutes.slice().reverse().find(function (route) {
    return route.match.params[key];
  });

  if (matchedRoute) {
    return matchedRoute.match.params[key];
  }
};

var matchRouteProperty = exports.matchRouteProperty = function matchRouteProperty(matchedRoutes, key) {
  var matchedRoute = matchedRoutes.slice().reverse().find(function (route) {
    return route.routeProps && route.routeProps[key] != undefined;
  });

  if (matchedRoute) {
    return matchedRoute.routeProps[key];
  }
};

var BreadcrumbsNavigator = function (_Component) {
  _inherits(BreadcrumbsNavigator, _Component);

  function BreadcrumbsNavigator(props) {
    _classCallCheck(this, BreadcrumbsNavigator);

    var _this = _possibleConstructorReturn(this, (BreadcrumbsNavigator.__proto__ || Object.getPrototypeOf(BreadcrumbsNavigator)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(BreadcrumbsNavigator, [{
    key: 'render',
    value: function render() {
      var matchedBreadcrumbs = this.props.matchedBreadcrumbs;

      var breadcrumbItems = matchedBreadcrumbs.map(function (route, index) {
        if (index < matchedBreadcrumbs.length - 1) {
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

  return BreadcrumbsNavigator;
}(_react.Component);

/* eslint-disable no-unused-vars */


var connector = (0, _reactRedux.connect)(function (_ref) {
  _objectDestructuringEmpty(_ref);

  return {};
});
/* eslint-enable no-unused-vars */

exports.default = connector(BreadcrumbsNavigator);