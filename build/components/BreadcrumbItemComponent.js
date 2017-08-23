'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRedux = require('react-redux');

var _breadcrumbs = require('../actions/breadcrumbs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BreadcrumbItemComponent = function (_Component) {
  _inherits(BreadcrumbItemComponent, _Component);

  function BreadcrumbItemComponent(props) {
    _classCallCheck(this, BreadcrumbItemComponent);

    var _this = _possibleConstructorReturn(this, (BreadcrumbItemComponent.__proto__ || Object.getPrototypeOf(BreadcrumbItemComponent)).call(this, props));

    _this.componentDidMount = function () {
      var url = '';
      if (_this.props.match) {
        url = _this.props.match.url + '/';
      }

      _this.props.dispatch((0, _breadcrumbs.setupBreadcrumb)(_this.props.layer, {
        name: _this.props.name,
        path: url
      }));

      console.log(_this.props.layer + ' ' + _this.props.name);
    };

    _this.state = {};
    return _this;
  }

  _createClass(BreadcrumbItemComponent, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.children
      );
    }
  }]);

  return BreadcrumbItemComponent;
}(_react.Component);

/* eslint-disable no-unused-vars */


var connector = (0, _reactRedux.connect)(function (reducer) {
  return {};
});
/* eslint-enable no-unused-vars */

exports.default = connector(BreadcrumbItemComponent);