'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/spin/style/css');

var _spin = require('antd/lib/spin');

var _spin2 = _interopRequireDefault(_spin);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  <ErrorContainer
    key={this.state.tableParams.uuid}
    onRetry={this.loadItems}
    spinning={this.state.tableParams.isLoading}
  />
*/

var ErrorContainer = function (_Component) {
  _inherits(ErrorContainer, _Component);

  function ErrorContainer(props) {
    _classCallCheck(this, ErrorContainer);

    var _this = _possibleConstructorReturn(this, (ErrorContainer.__proto__ || Object.getPrototypeOf(ErrorContainer)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ErrorContainer, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _spin2.default,
        { spinning: this.props.spinning, className: '' + this.props.className },
        this.props.children ? this.props.children : _react2.default.createElement(
          'div',
          { className: 'ant-error ' + (!this.props.noTextCenter ? 'text-center' : '') },
          'Something went wrong. Click\xA0',
          _react2.default.createElement(
            'a',
            { role: 'button', tabIndex: '0', onClick: this.props.onRetry },
            'here'
          ),
          '\xA0to try again.'
        )
      );
    }
  }]);

  return ErrorContainer;
}(_react.Component);

function mapStateToProps(state) {
  return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ErrorContainer);