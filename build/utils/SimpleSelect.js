'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/form/style/css');

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _css2 = require('antd/lib/select/style/css');

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIManager = require('./UIManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  <SimpleSelect
    items={[{
      key: 'item_1',
      label: 'Item 1',
    }, {
      key: 'item_2',
      label: 'Item 2',
    }]}
    initialValue={{
      key: 'item_1',
      label: 'Item 1',
    }}
    required={false}
    name={'Key'}
    form={this.props.form}
    formKey="key_id"
    error={this.state.actioner.error}
    errorKeys={['key_id']}
    showLabel={true}
  />
*/

var SimpleSelect = function (_Component) {
  _inherits(SimpleSelect, _Component);

  function SimpleSelect(props) {
    _classCallCheck(this, SimpleSelect);

    var _this = _possibleConstructorReturn(this, (SimpleSelect.__proto__ || Object.getPrototypeOf(SimpleSelect)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(SimpleSelect, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var initialValue = undefined;
      if (this.props.initialValue) {
        initialValue = this.props.initialValue;
      }
      var rules = [];
      if (this.props.required) {
        rules = [{
          validator: function validator(rule, value, callback) {
            if (!value || !value.key) {
              callback(_this2.props.name + ' is required');
            }
            callback();
          }
        }];
      }

      var select = _react2.default.createElement(
        _select2.default,
        {
          style: {
            width: this.props.width
          },
          labelInValue: true,
          placeholder: 'Select a ' + this.props.name,
          disabled: this.props.disabled
        },
        this.props.items.map(function (item) {
          return _react2.default.createElement(
            _select2.default.Option,
            { key: item.key },
            item.label
          );
        })
      );

      var label = this.props.name;
      if (!this.props.showLabel) {
        label = null;
      }
      if (this.props.form) {
        return _react2.default.createElement(
          _form2.default.Item,
          _extends({}, (0, _UIManager.getFieldsError)(this.props.error, this.props.errorKeys), { label: label }),
          this.props.form.getFieldDecorator(this.props.formKey, {
            initialValue: initialValue,
            rules: rules
          })(select)
        );
      } else {
        return select;
      }
    }
  }]);

  return SimpleSelect;
}(_react.Component);

exports.default = SimpleSelect;