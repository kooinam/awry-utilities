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

var _css3 = require('antd/lib/spin/style/css');

var _spin = require('antd/lib/spin');

var _spin2 = _interopRequireDefault(_spin);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _UIManager = require('./UIManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  <FilterSelect
    tableParams={this.state.tableParams}
    filterFields={['name_cont']}
    url={'/items.json'}
    initialValue={this.props.item.key}
    keyField='id'
    labelField='name'
    required={false}
    name={'Key'}
    form={this.props.form}
    formKey="key_id"
    error={this.state.actioner.error}
    errorKeys={['key_id']}
  />
*/

var FilterSelect = function (_Component) {
  _inherits(FilterSelect, _Component);

  function FilterSelect(props) {
    _classCallCheck(this, FilterSelect);

    var _this = _possibleConstructorReturn(this, (FilterSelect.__proto__ || Object.getPrototypeOf(FilterSelect)).call(this, props));

    _this.loadOptions = function (keyword) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.props.filterFields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var filterField = _step.value;

          _this.props.tableParams.filter[filterField] = keyword;
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

      var url = _this.props.url;
      var params = {
        params: {
          q: _this.props.tableParams.filter,
          per_page: _this.props.tableParams.pagination.per_page,
          page: _this.props.tableParams.pagination.current
        }
      };

      _this.props.tableParams.loadItems(url, params);
    };

    _this.state = {};

    _this.loadOptions = _this.loadOptions.bind(_this);
    _this.handleSearchOptions = _this.loadOptions.bind(_this);

    _this.handleSearchOptions = (0, _lodash2.default)(_this.handleSearchOptions, 500);
    return _this;
  }

  _createClass(FilterSelect, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var initialValue = undefined;
      if (this.props.initialValue && this.props.initialValue[this.props.keyField]) {
        initialValue = {
          key: String(this.props.initialValue[this.props.keyField]),
          label: this.props.initialValue[this.props.labelField]
        };
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
          allowClear: true,
          onFocus: function onFocus() {
            _this2.loadOptions('');
          },
          showSearch: true,
          labelInValue: true,
          notFoundContent: this.props.tableParams.isLoading ? _react2.default.createElement(_spin2.default, { size: 'small' }) : this.props.name + ' not found',
          onSearch: this.handleSearchOptions,
          placeholder: 'Select a ' + this.props.name,
          filterOption: false,
          disabled: this.props.disabled,
          onChange: this.props.handleChange
        },
        this.props.tableParams.items.map(function (item) {
          return _react2.default.createElement(
            _select2.default.Option,
            { key: String(item[_this2.props.keyField]) },
            item[_this2.props.labelField]
          );
        })
      );

      if (this.props.form) {
        return _react2.default.createElement(
          _form2.default.Item,
          _extends({}, (0, _UIManager.getFieldsError)(this.props.error, this.props.errorKeys), { label: this.props.name }),
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

  return FilterSelect;
}(_react.Component);

exports.default = FilterSelect;