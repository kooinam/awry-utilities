'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/button/style/css');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _css2 = require('antd/lib/form/style/css');

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _css3 = require('antd/lib/input/style/css');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _css4 = require('antd/lib/table/style/css');

var _table = require('antd/lib/table');

var _table2 = _interopRequireDefault(_table);

var _css5 = require('antd/lib/row/style/css');

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _css6 = require('antd/lib/col/style/css');

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _UIManager = require('../utils/UIManager');

var _TableParams = require('../utils/TableParams');

var _TableParams2 = _interopRequireDefault(_TableParams);

var _Actioner = require('../utils/Actioner');

var _Actioner2 = _interopRequireDefault(_Actioner);

var _ErrorContainer = require('./ErrorContainer');

var _ErrorContainer2 = _interopRequireDefault(_ErrorContainer);

var _CustomPagination = require('./CustomPagination');

var _CustomPagination2 = _interopRequireDefault(_CustomPagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  <SiderEditor
    item={this.props.user}
    formParams={
      {
        url: `/users/${this.props.user.username}.json`,
        axiosGetter: () => getAxios('membership-admin'),
        method: 'patch',
        itemName: 'user',
        ItemKlass: User,
        successMessageGetter: user =>
          `User ${user.email} updated successfully`,
        successCallback: (user) => {
          this.props.dispatch(push(`/admin/users/${user.username}`));
          this.props.dispatch(closeRightSider());
          this.props.loadItem();
        },
        errorMessageGetter: () =>
          `Failed to update User ${this.props.user.username}`,
      }
    }
    logParams={
      {
        axiosGetter: () => getAxios('log-admin'),
        url: '/logs.json',
        type: 'Member',
        id: this.props.user.id,
        fieldNames,
      }
    }
    formInputsGetter={
      (item, form, actioner) => {
        return commonUserFormInputs(item, form, actioner, fieldNames);
      }
    }
    formParamsParser={
      (attributes) => {
        return {
          user: attributes,
        };
      }
    }
  />
*/

var SiderEditor = function (_Component) {
  _inherits(SiderEditor, _Component);

  function SiderEditor(props) {
    _classCallCheck(this, SiderEditor);

    var _this = _possibleConstructorReturn(this, (SiderEditor.__proto__ || Object.getPrototypeOf(SiderEditor)).call(this, props));

    _this.componentDidMount = function () {
      _this.loadItems();
    };

    _this.renderItems = function () {
      if (_this.state.tableParams.isError) {
        return _react2.default.createElement(_ErrorContainer2.default, {
          key: _this.state.tableParams.uuid,
          spinning: _this.state.tableParams.isLoading,
          onRetry: _this.loadItems
        });
      }

      var columns = [{
        className: 'ant-td-center ant-td-padding-sm',
        width: '20%',
        title: 'Time',
        key: 'created_at',
        render: function render(value, record) {
          return _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/mat/logs/' + record.id, target: '_blank' },
            (0, _UIManager.formatDate)(record.created_at),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'small',
              null,
              (0, _UIManager.formatTime)(record.created_at)
            )
          );
        }
      }, {
        className: 'ant-td-padding-sm',
        width: '20%',
        title: 'Done by',
        key: 'actioner',
        render: function render(value, record) {
          if (!record.is_system) {
            return _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/mat/users/' + record.actioner_username, target: '_blank' },
              record.actioner_username
            );
          } else {
            return _react2.default.createElement(
              'div',
              null,
              'System'
            );
          }
        }
      }, {
        className: 'ant-td-padding-sm',
        width: '30%',
        title: 'Changes',
        key: 'log_changes',
        render: function render(value, record) {
          var logChanges = Object.keys(record.log_changes).map(function (key) {
            return _react2.default.createElement(
              _row2.default,
              { key: key, className: 'ant-space-row' },
              _react2.default.createElement(
                _col2.default,
                { span: 12 },
                _react2.default.createElement(
                  'span',
                  { className: 'ant-label ant-label-block' },
                  key
                )
              ),
              _react2.default.createElement(
                _col2.default,
                { span: 12 },
                _react2.default.createElement(
                  'span',
                  { className: 'ant-texter-sm' },
                  record.log_changes[key]
                )
              )
            );
          });
          return _react2.default.createElement(
            'div',
            null,
            logChanges
          );
        }
      }, {
        className: 'ant-td-padding-sm',
        width: '30%',
        title: 'Remarks',
        key: 'remark',
        render: function render(value, record) {
          return _react2.default.createElement(
            'div',
            { className: 'ant-texter' },
            record.remarks
          );
        }
      }];

      var locale = {
        emptyText: 'No Log found'
      };

      return _react2.default.createElement(_table2.default, {
        columns: columns,
        dataSource: _this.state.tableParams.items,
        bordered: true,
        locale: locale,
        pagination: false,
        rowKey: 'id',
        loading: _this.state.tableParams.isLoading
      });
    };

    _this.handleSubmit = function (e) {
      e.preventDefault();
      _this.props.form.validateFields(function (errors) {
        if (errors) {
          return false;
        }

        var attributes = _this.props.form.getFieldsValue();
        var params = _this.props.formParamsParser ? _this.props.formParamsParser(attributes) : attributes;
        params.log_remarks = attributes.log_remarks;

        _this.state.actioner.do(_this.props.formParams.url, params);

        return true;
      });
    };

    var _this$props = _this.props,
        formParams = _this$props.formParams,
        logParams = _this$props.logParams;

    var actioner = formParams ? new _Actioner2.default({
      component: _this,
      key: 'actioner',
      axiosGetter: formParams.axiosGetter,
      method: 'patch',
      itemName: formParams.itemName,
      ItemKlass: formParams.ItemKlass,
      successMessageGetter: formParams.successMessageGetter,
      successCallback: formParams.successCallback,
      errorMessageGetter: formParams.errorMessageGetter
    }) : null;

    logParams.fieldNames = (logParams.fieldNames || []).map(function (field) {
      return field + '=';
    });

    _this.state = {
      actioner: actioner,
      tableParams: new _TableParams2.default({
        component: _this,
        key: 'tableParams',
        axiosGetter: logParams.axiosGetter,
        itemsName: 'logs',
        ItemKlass: Object,
        url: logParams.url,
        filter: {
          s: ['created_at DESC']
        },
        paramsGetter: function paramsGetter(tableParams) {
          return {
            params: {
              q: tableParams.filter,
              per_page: tableParams.pagination.per_page,
              page: tableParams.pagination.current,
              log_type: logParams.type,
              log_id: logParams.id,
              field_names: logParams.fieldNames
            }
          };
        }
      })
    };

    _this.renderItems = _this.renderItems.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.loadItems = _this.state.tableParams.loadItems.bind(_this);
    return _this;
  }

  _createClass(SiderEditor, [{
    key: 'render',
    value: function render() {
      var actioner = this.state.actioner;
      var _props = this.props,
          form = _props.form,
          formInputsGetter = _props.formInputsGetter,
          item = _props.item;


      var formInputs = null;
      if (formInputsGetter) {
        formInputs = formInputsGetter(item, form, actioner);
      }

      var formComponent = this.state.actioner ? _react2.default.createElement(
        _col2.default,
        { md: 24 },
        _react2.default.createElement(
          _form2.default,
          { onSubmit: this.handleSubmit },
          _react2.default.createElement(
            _row2.default,
            null,
            _react2.default.createElement(
              _col2.default,
              { md: 24 },
              _react2.default.createElement(
                _form2.default.Item,
                _extends({}, (0, _UIManager.getFieldError)(actioner.error, 'log_remarks'), { label: 'Remarks', hasFeedback: true }),
                form.getFieldDecorator('log_remarks', {
                  rules: [{ required: true, message: 'Remarks is required' }],
                  initialValue: null
                })(_react2.default.createElement(_input2.default, { type: 'textarea', placeholder: 'Remarks', rows: 4 }))
              )
            )
          ),
          formInputs,
          _react2.default.createElement(
            _row2.default,
            null,
            _react2.default.createElement(
              _col2.default,
              { md: 24 },
              _react2.default.createElement(
                _form2.default.Item,
                null,
                _react2.default.createElement(
                  _button2.default,
                  { type: 'primary', htmlType: 'submit', loading: this.state.actioner.isLoading },
                  this.props.formParams.confirmText || 'Update'
                )
              )
            )
          )
        )
      ) : null;

      return _react2.default.createElement(
        _row2.default,
        { className: 'ant-sider-editor ' + this.props.className },
        formComponent,
        _react2.default.createElement(
          _col2.default,
          { md: 24 },
          _react2.default.createElement(
            _row2.default,
            { className: 'ant-content', style: { marginLeft: 0, marginRight: 0 } },
            _react2.default.createElement(
              _col2.default,
              { md: 24 },
              this.renderItems()
            )
          ),
          _react2.default.createElement(
            _row2.default,
            null,
            _react2.default.createElement(
              _col2.default,
              { md: 24, className: 'pull-right' },
              _react2.default.createElement(_CustomPagination2.default, {
                key: this.state.tableParams.uuid,
                tableParams: this.state.tableParams,
                loadItems: this.loadItems,
                anchor: 'listing'
              })
            )
          )
        )
      );
    }
  }]);

  return SiderEditor;
}(_react.Component);

function mapStateToProps(state) {
  return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(_form2.default.create()(SiderEditor));