'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// new ModalParams({
//   component: this,
//   key: 'modalParams',
// })

var ModalParams = function (_Object) {
  _inherits(ModalParams, _Object);

  function ModalParams(attributes) {
    _classCallCheck(this, ModalParams);

    var newAttributes = Object.assign({
      component: null,
      key: null,
      visible: false,
      doneCallback: null
    }, attributes);

    var _this = _possibleConstructorReturn(this, (ModalParams.__proto__ || Object.getPrototypeOf(ModalParams)).call(this, newAttributes));

    _this.rotateUuid = function () {
      _this.uuid = (0, _v2.default)();
    };

    _this.show = function (doneCallback) {
      var modalParams = _this.component.state[_this.key];
      modalParams.visible = true;
      modalParams.rotateUuid();
      var state = {};
      state[_this.key] = modalParams;
      _this.component.setState(state);
      _this.doneCallback = doneCallback;
    };

    _this.dismiss = function () {
      var modalParams = _this.component.state[_this.key];
      modalParams.visible = false;
      modalParams.rotateUuid();
      var state = {};
      state[_this.key] = modalParams;
      _this.component.setState(state);
    };

    _this.done = function () {
      var modalParams = _this.component.state[_this.key];
      modalParams.visible = false;
      modalParams.rotateUuid();
      var state = {};
      state[_this.key] = modalParams;
      _this.component.setState(state);
      if (_this.doneCallback) {
        _this.doneCallback();
      }
    };

    _this.rotateUuid();
    return _this;
  }

  return ModalParams;
}(Object);

exports.default = ModalParams;