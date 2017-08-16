'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _antd = require('antd');

var _UIManager = require('./UIManager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Actioner = function (_Object) {
  _inherits(Actioner, _Object);

  function Actioner(attributes) {
    _classCallCheck(this, Actioner);

    var newAttributes = Object.assign({
      component: null,
      key: null,
      axiosGetter: null,
      method: null,
      itemName: null,
      ItemKlass: null,
      successMessageGetter: null,
      successDescriptionGetter: null,
      successCallback: null,
      errorMessageGetter: null,
      isLoading: false,
      error: {}
    }, attributes);

    var _this = _possibleConstructorReturn(this, (Actioner.__proto__ || Object.getPrototypeOf(Actioner)).call(this, newAttributes));

    _this.do = function (url, params) {
      var component = _this.component;
      var actioner = component.state[_this.key];
      actioner.isLoading = true;
      var state = {};
      state[_this.key] = actioner;
      component.setState(state, function () {
        var axiosGetter = _this.axiosGetter;
        axiosGetter().then(function (instance) {
          if (_this.method === 'get') {
            return instance.get(url, params);
          } else if (_this.method === 'post') {
            return instance.post(url, params);
          } else if (_this.method === 'delete') {
            return instance.delete(url, params);
          } else if (_this.method === 'patch') {
            return instance.patch(url, params);
          }

          return null;
        }).then(function (response) {
          var actioner2 = component.state[_this.key];
          actioner2.isLoading = false;
          actioner2.error = null;
          var state2 = {};
          state2[_this.key] = actioner2;
          var item = new _this.ItemKlass(response.data[_this.itemName]);
          if (_this.successMessageGetter && _this.successMessageGetter(item)) {
            var description = null;
            if (_this.successDescriptionGetter) {
              description = _this.successDescriptionGetter(item);
            }
            _antd.notification.success({
              message: _this.successMessageGetter(item),
              description: description,
              duration: (0, _UIManager.getNotificationDuration)()
            });
          }
          component.setState(state2, function () {
            if (_this.successCallback) {
              _this.successCallback(item);
            }
          });
        }).catch(function (error) {
          var actioner2 = component.state[_this.key];
          actioner2.isLoading = false;
          actioner2.error = error;
          var state2 = {};
          state2[_this.key] = actioner2;
          component.setState(state2, function () {
            if (_this.errorCallback) {
              _this.errorCallback(error);
            }
          });
          if (error && error.response) {
            if (_this.errorMessageGetter && _this.errorMessageGetter()) {
              _antd.notification.error({
                message: _this.errorMessageGetter(),
                description: (0, _UIManager.getErrorDescription)(error),
                duration: (0, _UIManager.getNotificationDuration)()
              });
            }
          } else {
            console.log('error', error);
          }
        });
      });
    };

    return _this;
  }

  return Actioner;
}(Object);

exports.default = Actioner;