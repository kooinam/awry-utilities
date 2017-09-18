'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/message/style/css');

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _UIManager = require('./UIManager');

var _ssr = require('../actions/ssr');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// new TableParams({
//   component: this,
//   key: 'tableParams',
//   axiosGetter: getAxios,
//   itemsName: 'items',
//   ItemKlass: Item,
//   errorMessage: 'Error',
//   scope: null,
// })

var TableParams = function (_Object) {
  _inherits(TableParams, _Object);

  function TableParams(attributes) {
    _classCallCheck(this, TableParams);

    var newAttributes = Object.assign({
      component: null,
      key: null,
      axiosGetter: null,
      itemsName: null,
      ItemKlass: null,
      url: null,
      paramsGetter: function paramsGetter(tableParams) {
        return {
          params: {
            q: tableParams.filter,
            per_page: tableParams.pagination.per_page,
            page: tableParams.pagination.current
          }
        };
      },
      errorMessage: null,
      filter: {},
      pagination: {
        total: 0,
        current: 1,
        per_page: 10
      },
      scope: null,
      isLoading: false,
      isError: false,
      items: [],
      ssrKey: null
    }, attributes);

    var _this = _possibleConstructorReturn(this, (TableParams.__proto__ || Object.getPrototypeOf(TableParams)).call(this, newAttributes));

    _this.isFirstLoading = function () {
      return _this.lastSearchId === 1 && _this.isLoading;
    };

    _this.rotateUuid = function () {
      _this.uuid = (0, _v2.default)();

      return _this;
    };

    _this.reload = function () {
      var tableParams = _this.rotateUuid();
      var state = {};
      state[_this.key] = tableParams;
      _this.component.setState(state);
    };

    _this.setComponent = function (setter, setterCallback) {
      setter(_this);
      var component = _this.component;
      if (component) {
        var tableParams = component.state[_this.key];
        tableParams.rotateUuid();
        var state = {};
        state[_this.key] = tableParams;
        component.setState(state, setterCallback);
      } else {
        setterCallback();
      }
    };

    _this.loadItems = function () {
      if (_this.ssrKey && _this.component && _this.component.props.SSRReducer && _this.component.props.SSRReducer.ssrItems && _this.component.props.SSRReducer.ssrItems[_this.ssrKey] && !_this.component.props.SSRReducer.ssrItems[_this.ssrKey].isServed) {
        return new Promise(function (resolve) {
          var items = _this.component.props.SSRReducer.ssrItems[_this.ssrKey].value;
          var pagination = _this.component.props.SSRReducer.ssrItems[_this.ssrKey].pagination;
          _this.setComponent(function (tableParams) {
            tableParams.items = items;
            tableParams.pagination = pagination;
          }, function () {
            if (_this.callback) {
              _this.callback(items);
            }
            _this.component.props.dispatch((0, _ssr.invalidateSSRItems)(_this.ssrKey));
            resolve();
          });
        });
      } else {
        return new Promise(function (resolve, reject) {
          _this.lastSearchId += 1;
          var searchId = _this.lastSearchId;

          _this.setComponent(function (tableParams) {
            tableParams.isLoading = true;
          }, function () {
            var axiosGetter = _this.axiosGetter;
            axiosGetter().then(function (instance) {
              var params = _this.paramsGetter(_this);
              params.params.scope = _this.scope;

              return instance.get(_this.url, params);
            }).then(function (response) {
              if (searchId === _this.lastSearchId) {
                var items = response.data[_this.itemsName].map(function (item) {
                  return new _this.ItemKlass(item);
                });
                _this.setComponent(function (tableParams) {
                  tableParams.isLoading = false;
                  tableParams.isError = false;
                  tableParams.items = items;
                  tableParams.pagination.total = response.data.total_count;
                  tableParams.responseData = response.data;
                }, function () {
                  if (_this.callback) {
                    _this.callback(items, response.data);
                  }
                  resolve(items);
                });
              } else {
                reject();
              }
            }).catch(function (error) {
              if (searchId === _this.lastSearchId) {
                _this.setComponent(function (tableParams) {
                  tableParams.isLoading = false;
                  tableParams.isError = true;
                }, function () {
                  if (error && error.response) {
                    if (_this.errorMessage) {
                      _message2.default.error(_this.errorMessage, (0, _UIManager.getMessageDuration)());
                    }
                  } else {
                    console.log(error);
                  }

                  reject(error);
                });
              } else {
                reject();
              }
            });
          });
        });
      }
    };

    _this.lastSearchId = 0;
    _this.rotateUuid();
    return _this;
  }

  return TableParams;
}(Object);

exports.default = TableParams;