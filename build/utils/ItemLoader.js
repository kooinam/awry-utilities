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

// new ItemLoader({
//   component: this,
//   key: 'itemLoader',
//   axiosGetter: getAxios,
//   itemsName: 'item',
//   ItemKlass: Item,
//   errorMessage: 'Error',
// })

var ItemLoader = function (_Object) {
  _inherits(ItemLoader, _Object);

  function ItemLoader(attributes) {
    _classCallCheck(this, ItemLoader);

    var newAttributes = Object.assign({
      component: null,
      key: null,
      axiosGetter: null,
      itemName: null,
      ItemKlass: null,
      url: null,
      errorMessage: null,
      isError: false,
      isLoading: false,
      item: null,
      callback: null,
      ssrKey: null,
      isSSR: false,
      cache: false
    }, attributes);

    var _this = _possibleConstructorReturn(this, (ItemLoader.__proto__ || Object.getPrototypeOf(ItemLoader)).call(this, attributes));

    _this.rotateUuid = function () {
      _this.uuid = (0, _v2.default)();

      return _this;
    };

    _this.isFirstLoading = function () {
      return _this.lastSearchId === 1 && _this.isLoading;
    };

    _this.setComponent = function (setter, setterCallback) {
      var component = _this.component;
      if (component) {
        var itemLoader = component.state[_this.key];
        itemLoader.rotateUuid();
        setter(itemLoader);
        var state = {};
        state[_this.key] = itemLoader;
        component.setState(state, setterCallback);
      } else {
        setterCallback();
      }
    };

    _this.loadItem = function (params) {
      if (_this.ssrKey && _this.component && _this.component.props.SSRReducer && _this.component.props.SSRReducer.ssrItems && _this.component.props.SSRReducer.ssrItems[_this.ssrKey] && (!_this.component.props.SSRReducer.ssrItems[_this.ssrKey].isServed || _this.cache)) {
        return new Promise(function (resolve) {
          var item = _this.component.props.SSRReducer.ssrItems[_this.ssrKey].value;
          _this.setComponent(function (itemLoader) {
            itemLoader.item = new _this.ItemKlass(item);
            itemLoader.isSSR = true;
          }, function () {
            if (_this.callback) {
              _this.callback(item);
            }
            _this.component.props.dispatch((0, _ssr.invalidateSSRItems)(_this.ssrKey));
            resolve(item);
          });
        });
      } else {
        return new Promise(function (resolve, reject) {
          _this.lastSearchId += 1;
          var searchId = _this.lastSearchId;

          _this.setComponent(function (itemLoader) {
            itemLoader.isLoading = true;
          }, function () {
            var axiosGetter = _this.axiosGetter;
            axiosGetter().then(function (instance) {
              return instance.get(_this.url, params);
            }).then(function (response) {
              if (searchId === _this.lastSearchId) {
                var item = new _this.ItemKlass(response.data[_this.itemName]);
                _this.setComponent(function (itemLoader) {
                  itemLoader.isLoading = false;
                  itemLoader.isError = false;
                  itemLoader.item = item;
                  itemLoader.isSSR = false;
                }, function () {
                  if (_this.callback) {
                    _this.callback(item);
                  }
                  resolve(item);
                });
              } else {
                reject();
              }
            }).catch(function (error) {
              if (searchId === _this.lastSearchId) {
                _this.setComponent(function (itemLoader) {
                  itemLoader.isLoading = false;
                  itemLoader.isError = true;
                  itemLoader.isSSR = false;
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
    _this.item = _this.item || new _this.ItemKlass();
    _this.rotateUuid();
    return _this;
  }

  return ItemLoader;
}(Object);

exports.default = ItemLoader;