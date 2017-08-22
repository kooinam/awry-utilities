'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/message/style/css');

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _UIManager = require('../utils/UIManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// new TableParams({
//   component: this,
//   key: 'tableParams',
//   axiosGetter: getAxios,
//   itemName: 'item',
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
      errorMessage: null,
      isError: false,
      scope: null,
      isLoading: false,
      pagination: {
        total: 0,
        current: 1,
        per_page: 10
      },
      items: []
    }, attributes);

    var _this = _possibleConstructorReturn(this, (TableParams.__proto__ || Object.getPrototypeOf(TableParams)).call(this, newAttributes));

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

    _this.loadItems = function (url, params) {
      _this.lastSearchId += 1;
      var searchId = _this.lastSearchId;

      var component = _this.component;
      var tableParams = component.state[_this.key];
      tableParams.isLoading = true;
      tableParams.rotateUuid();
      var state = {};
      state[_this.key] = tableParams;
      component.setState(state, function () {
        var axiosGetter = _this.axiosGetter;
        axiosGetter.then(function (instance) {
          params = params || {
            params: {}
          };
          params.params.scope = _this.scope;
          return instance.get(url, params);
        }).then(function (response) {
          if (searchId == _this.lastSearchId) {
            var _tableParams = component.state[_this.key];
            _tableParams.isLoading = false;
            _tableParams.isError = false;
            _tableParams.items = response.data[_this.itemsName].map(function (item) {
              return new _this.ItemKlass(item);
            });
            _tableParams.pagination.total = response.data.total_count;
            _tableParams.rotateUuid();
            var _state = {};
            _state[_this.key] = _tableParams;
            component.setState(_state);
            if (_this.callback) {
              _this.callback();
            }
          }
        }).catch(function (error) {
          if (searchId == _this.lastSearchId) {
            var _tableParams2 = component.state[_this.key];
            _tableParams2.isLoading = false;
            _tableParams2.isError = true;
            var _state2 = {};
            _state2[_this.key] = _tableParams2;
            _this.rotateUuid();
            component.setState(_state2);
            if (error && error.response) {
              if (_this.errorMessage) {
                _message2.default.error(_this.errorMessage, (0, _UIManager.getMessageDuration)());
              }
            } else {
              console.log(error);
            }
          }
        });
      });
    };

    _this.lastSearchId = 0;
    _this.rotateUuid();
    return _this;
  }

  return TableParams;
}(Object);

exports.default = TableParams;