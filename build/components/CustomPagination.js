'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/pagination/style/css');

var _pagination = require('antd/lib/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  <CustomPagination
    key={this.state.tableParams.uuid}
    tableParams={this.state.tableParams}
    loadItems={this.loadItems}
    urlGetter={null}
    anchor={null}
  />
*/

var CustomPagination = function (_Component) {
  _inherits(CustomPagination, _Component);

  function CustomPagination(props) {
    _classCallCheck(this, CustomPagination);

    var _this = _possibleConstructorReturn(this, (CustomPagination.__proto__ || Object.getPrototypeOf(CustomPagination)).call(this, props));

    _this.handleChangePagination = function (page, pageSize) {
      var tableParams = _this.props.tableParams;
      tableParams.pagination.current = page;
      tableParams.pagination.per_page = pageSize;
      tableParams.rotateUuid();
      _this.props.loadItems();

      if (_this.props.anchor && document.getElementById(_this.props.anchor)) {
        window.scrollTo(0, document.getElementById(_this.props.anchor).getBoundingClientRect().top + window.scrollY);
      }
    };

    _this.renderPaginationPage = function (page, type) {
      var inner = null;
      if (type === 'next') {
        inner = null;
      } else if (type === 'prev') {
        inner = null;
      } else if (type === 'page') {
        inner = page;
      }

      var to = {
        search: '?page=' + page,
        pathname: _this.props.urlGetter(page)
      };

      return _react2.default.createElement(
        _reactRouterDom.Link,
        { to: to, className: 'page-inner' },
        inner
      );
    };

    _this.state = {};

    _this.handleChangePagination = _this.handleChangePagination.bind(_this);
    _this.renderPaginationPage = _this.renderPaginationPage.bind(_this);
    return _this;
  }

  _createClass(CustomPagination, [{
    key: 'render',
    value: function render() {
      var pagination = _react2.default.createElement(_pagination2.default, {
        className: 'ant-pagination',
        itemRender: this.props.urlGetter ? this.renderPaginationPage : undefined,
        current: this.props.tableParams.pagination.current,
        total: this.props.tableParams.pagination.total,
        defaultPageSize: this.props.tableParams.pagination.per_page,
        onChange: this.handleChangePagination,
        showSizeChanger: true,
        onShowSizeChange: this.handleChangePagination
      });
      if (this.props.hideSizeChanger) {
        pagination = _react2.default.createElement(_pagination2.default, {
          className: 'ant-pagination',
          itemRender: this.props.urlGetter ? this.renderPaginationPage : undefined,
          current: this.props.tableParams.pagination.current,
          total: this.props.tableParams.pagination.total,
          defaultPageSize: this.props.tableParams.pagination.per_page,
          onChange: this.handleChangePagination
        });
      }

      return pagination;
    }
  }]);

  return CustomPagination;
}(_react.Component);

function mapStateToProps(state) {
  return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(CustomPagination);