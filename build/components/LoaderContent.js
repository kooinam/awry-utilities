'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/card/style/css');

var _card = require('antd/lib/card');

var _card2 = _interopRequireDefault(_card);

var _css2 = require('antd/lib/spin/style/css');

var _spin = require('antd/lib/spin');

var _spin2 = _interopRequireDefault(_spin);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Fade = require('./Fade');

var _Fade2 = _interopRequireDefault(_Fade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoaderContent = function (_Component) {
  _inherits(LoaderContent, _Component);

  function LoaderContent(props) {
    _classCallCheck(this, LoaderContent);

    var _this = _possibleConstructorReturn(this, (LoaderContent.__proto__ || Object.getPrototypeOf(LoaderContent)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(LoaderContent, [{
    key: 'render',
    value: function render() {
      var duration = this.props.duration || 0.5;
      var _props = this.props,
          inanimate = _props.inanimate,
          firstLoading = _props.firstLoading,
          loading = _props.loading,
          noTextCenter = _props.noTextCenter,
          isSSR = _props.isSSR;


      var content = this.props.children;

      if (this.props.isError) {
        content = this.props.errorContent ? this.props.errorContent : _react2.default.createElement(
          'div',
          { className: (noTextCenter ? '' : 'text-center') + ' ant-error help-text' },
          'Something went wrong. Click\xA0',
          _react2.default.createElement(
            'a',
            { onClick: this.props.onRetry },
            'here'
          ),
          '\xA0to try again.'
        );
      }

      if (this.props.errors) {
        if (this.props.errors.errorStatus) {
          if (this.props.errors.contents && this.props.errors.contents[this.props.errors.errorStatus]) {
            content = this.props.errors.contents[this.props.errors.errorStatus];
          } else {
            if (this.props.errors.errorStatus === 403) {
              content = _react2.default.createElement(
                'div',
                { className: (noTextCenter ? '' : 'text-center') + ' ant-error help-text' },
                'Sorry, you are not authorized to view this...'
              );
            } else if (this.props.errors.errorStatus === 404) {
              content = _react2.default.createElement(
                'div',
                { className: (noTextCenter ? '' : 'text-center') + ' ant-error help-text' },
                'Sorry, resource not found...'
              );
            } else {
              content = _react2.default.createElement(
                'div',
                { className: (noTextCenter ? '' : 'text-center') + ' ant-error help-text' },
                'Something went wrong. Click\xA0',
                _react2.default.createElement(
                  'a',
                  { onClick: this.props.onRetry },
                  'here'
                ),
                '\xA0to try again.'
              );
            }
          }
        }
      }

      if (!inanimate && typeof window != 'undefined') {
        content = _react2.default.createElement(
          _Fade2.default,
          {
            duration: duration
          },
          content
        );
      }

      return _react2.default.createElement(
        _card2.default,
        { loading: firstLoading || !isSSR && typeof window === 'undefined', className: 'ant-loader-card ' + this.props.className },
        _react2.default.createElement(
          _spin2.default,
          { spinning: (!firstLoading && loading) == true },
          content
        )
      );
    }
  }]);

  return LoaderContent;
}(_react.Component);

exports.default = LoaderContent;