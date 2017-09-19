'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/row/style/css');

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _css2 = require('antd/lib/col/style/css');

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _css3 = require('antd/lib/button/style/css');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  <DetailsContainer
    details={[{
      size: 'md',
      title: 'Email',
      value: this.props.user,
    }]}
  />
*/

var DetailsContainer = function (_Component) {
  _inherits(DetailsContainer, _Component);

  function DetailsContainer(props) {
    _classCallCheck(this, DetailsContainer);

    var _this = _possibleConstructorReturn(this, (DetailsContainer.__proto__ || Object.getPrototypeOf(DetailsContainer)).call(this, props));

    _this.renderDetails = function () {
      var details = _this.props.details.map(function (detail) {
        var size = detail.size;
        var col = 12;
        var titleCol = 8;
        if (size === 'lg') {
          titleCol = 4;
          col = 24;
        }
        var editCol = 0;
        var editable = null;
        if (detail.editable) {
          editCol = 2;
          editable = _react2.default.createElement(
            _col2.default,
            { span: 2, className: 'pull-right' },
            _react2.default.createElement(_button2.default, { icon: 'edit', onClick: detail.editable })
          );
        }
        var showCol = 0;
        var showable = null;
        if (detail.showable) {
          showCol = 2;
          showable = _react2.default.createElement(
            _col2.default,
            { span: 2, className: 'pull-right' },
            _react2.default.createElement(_button2.default, { icon: 'eye', onClick: detail.showable })
          );
        }

        return _react2.default.createElement(
          _col2.default,
          { lg: col, className: 'ant-details', key: (0, _v2.default)() },
          _react2.default.createElement(
            _row2.default,
            null,
            _react2.default.createElement(
              _col2.default,
              { span: titleCol, className: 'ant-details-title' },
              detail.title
            ),
            _react2.default.createElement(
              _col2.default,
              { span: 24 - titleCol - editCol - showCol, className: 'ant-details-value' },
              detail.value
            ),
            editable,
            showable
          )
        );
      });

      return details;
    };

    _this.state = {};

    _this.renderDetails = _this.renderDetails.bind(_this);
    return _this;
  }

  _createClass(DetailsContainer, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _row2.default,
        { className: 'ant-details-container ' + this.props.className },
        this.renderDetails()
      );
    }
  }]);

  return DetailsContainer;
}(_react.Component);

function mapStateToProps(state) {
  return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(DetailsContainer);