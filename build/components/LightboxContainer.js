'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImageLightbox = require('react-image-lightbox');

var _reactImageLightbox2 = _interopRequireDefault(_reactImageLightbox);

var _reactRedux = require('react-redux');

var _UIManager = require('../utils/UIManager');

var _lightbox = require('../actions/lightbox');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LightboxContainer = function (_Component) {
  _inherits(LightboxContainer, _Component);

  function LightboxContainer(props) {
    _classCallCheck(this, LightboxContainer);

    var _this = _possibleConstructorReturn(this, (LightboxContainer.__proto__ || Object.getPrototypeOf(LightboxContainer)).call(this, props));

    _this.componentDidUpdate = function (prevProps, prevState) {
      if (!prevProps.isLightboxOpen && _this.props.isLightboxOpen) {
        _this.setState({
          selectedImageIndex: _this.props.lightboxIndex
        });
      }
    };

    _this.state = {
      selectedImageIndex: 0
    };
    return _this;
  }

  _createClass(LightboxContainer, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.props.isLightboxOpen && this.state.selectedImageIndex < this.props.lightboxImages.length) {
        return _react2.default.createElement(_reactImageLightbox2.default, {
          animationDuration: this.props.lightboxImages.length == 1 ? 0 : 300,
          mainSrc: (0, _UIManager.formatImageUrl)(this.props.lightboxImages[this.state.selectedImageIndex].url),
          prevSrc: (0, _UIManager.formatImageUrl)(this.props.lightboxImages[(this.state.selectedImageIndex + this.props.lightboxImages.length - 1) % this.props.lightboxImages.length].url),
          nextSrc: (0, _UIManager.formatImageUrl)(this.props.lightboxImages[(this.state.selectedImageIndex + 1) % this.props.lightboxImages.length].url),
          onCloseRequest: function onCloseRequest() {
            _this2.props.dispatch((0, _lightbox.dismissLightbox)());
          },
          onMovePrevRequest: function onMovePrevRequest() {
            _this2.setState({
              selectedImageIndex: (_this2.state.selectedImageIndex + _this2.props.lightboxImages.length - 1) % _this2.props.lightboxImages.length
            });
          },
          onMoveNextRequest: function onMoveNextRequest() {
            _this2.setState({
              selectedImageIndex: (_this2.state.selectedImageIndex + 1) % _this2.props.lightboxImages.length
            });
          }
        });
      } else {
        return null;
      }
    }
  }]);

  return LightboxContainer;
}(_react.Component);

/* eslint-disable no-unused-vars */


var connector = (0, _reactRedux.connect)(function (_ref) {
  var LightboxReducer = _ref.LightboxReducer;
  return {
    isLightboxOpen: LightboxReducer.isLightboxOpen,
    lightboxImages: LightboxReducer.images,
    lightboxIndex: LightboxReducer.index
  };
});
/* eslint-enable no-unused-vars */

exports.default = connector(LightboxContainer);