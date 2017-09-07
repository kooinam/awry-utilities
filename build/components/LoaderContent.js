'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcQueueAnim = require('rc-queue-anim');

var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoaderContent = function (_Component) {
  _inherits(LoaderContent, _Component);

  function LoaderContent(props) {
    _classCallCheck(this, LoaderContent);

    var _this = _possibleConstructorReturn(this, (LoaderContent.__proto__ || Object.getPrototypeOf(LoaderContent)).call(this, props));

    _this.renderContent = function () {
      if (!_this.props.isError) {
        return _react2.default.createElement(
          'div',
          { key: 'loader-container' },
          _this.props.children
        );
      }
      return null;
    };

    _this.state = {};

    _this.renderContent = _this.renderContent.bind(_this);
    return _this;
  }

  _createClass(LoaderContent, [{
    key: 'render',
    value: function render() {
      var delay = this.props.delay || 0;
      var duration = this.props.duration || 450;

      if (typeof window !== 'undefined') {
        return _react2.default.createElement(
          _rcQueueAnim2.default,
          { type: ['right'], delay: delay, duration: duration },
          this.renderContent()
        );
      }
      return this.renderContent();
    }
  }]);

  return LoaderContent;
}(_react.Component);

exports.default = LoaderContent;