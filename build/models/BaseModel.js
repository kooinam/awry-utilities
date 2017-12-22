'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactCookies = require('react-cookies');

var _reactCookies2 = _interopRequireDefault(_reactCookies);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseModel = function (_Object) {
  _inherits(BaseModel, _Object);

  function BaseModel(attributes) {
    _classCallCheck(this, BaseModel);

    var newAttributes = Object.assign({}, attributes);

    var _this = _possibleConstructorReturn(this, (BaseModel.__proto__ || Object.getPrototypeOf(BaseModel)).call(this, newAttributes));

    if (!_this.uuid) {
      _this.uuid = (0, _v2.default)();
    }
    return _this;
  }

  return BaseModel;
}(Object);

BaseModel.getCookie = function (key) {
  return _reactCookies2.default.load(key);
};

BaseModel.setCookie = function (key, value) {
  if (typeof window === 'undefined') {
    return;
  }

  if (window.location.hostname.match(/([^.]*\.(com$|net$|me$))/g)) {
    _reactCookies2.default.save(key, value, {
      path: '/',
      domain: '.' + window.location.hostname.match(/([^.]*\.(com$|net$|me$))/g)[0]
    });
  } else {
    _reactCookies2.default.save(key, value, {
      path: '/'
    });
  }
};

BaseModel.removeCookie = function (key) {
  if (typeof window === 'undefined') {
    return;
  }

  if (window.location.hostname.match(/([^.]*\.(com$|net$|me$))/g)) {
    _reactCookies2.default.remove(key, {
      path: '/',
      domain: '.' + window.location.hostname.match(/([^.]*\.(com$|net$|me$))/g)[0]
    });
    _reactCookies2.default.remove(key, { path: '/' });
  } else {
    _reactCookies2.default.remove(key, { path: '/' });
  }
};

exports.default = BaseModel;