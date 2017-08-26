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

var _css3 = require('antd/lib/input/style/css');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

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
  <FiltersContainer
    filters={[{
      size: 'sm',
      name: 'Username',
      field: 'username',
    }]}
    onSearch={this.handleSearch}
  />
*/

var FiltersContainer = function (_Component) {
  _inherits(FiltersContainer, _Component);

  function FiltersContainer(props) {
    _classCallCheck(this, FiltersContainer);

    var _this = _possibleConstructorReturn(this, (FiltersContainer.__proto__ || Object.getPrototypeOf(FiltersContainer)).call(this, props));

    _this.renderFilters = function () {
      var filters = _this.props.filters.map(function (filter) {
        var size = filter.size;
        var col = 4;
        if (size === 'md') {
          col = 8;
        } else if (size === 'lg') {
          col = 12;
        }

        return _react2.default.createElement(
          _col2.default,
          { span: col, key: (0, _v2.default)() },
          _react2.default.createElement(
            'label',
            { htmlFor: filter.field },
            filter.name,
            ':'
          ),
          _react2.default.createElement(_input2.default, {
            onChange: function onChange(event) {
              _this.props.onSearch('{filter.field}_cont', event.target.value);
            },
            placeholder: filter.name
          })
        );
      });

      return filters;
    };

    _this.state = {};

    _this.renderFilters = _this.renderFilters.bind(_this);
    return _this;
  }

  _createClass(FiltersContainer, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _row2.default,
        { className: 'ant-filter' },
        this.renderFilters()
      );
    }
  }]);

  return FiltersContainer;
}(_react.Component);

function mapStateToProps(state) {
  return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FiltersContainer);