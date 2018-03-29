'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/upload/style/css');

var _upload = require('antd/lib/upload');

var _upload2 = _interopRequireDefault(_upload);

var _css2 = require('antd/lib/button/style/css');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _css3 = require('antd/lib/icon/style/css');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _NetworkManager = require('../utils/NetworkManager');

var _UIManager = require('../utils/UIManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomReactQuill = function (_React$Component) {
  _inherits(CustomReactQuill, _React$Component);

  function CustomReactQuill(props) {
    _classCallCheck(this, CustomReactQuill);

    var _this = _possibleConstructorReturn(this, (CustomReactQuill.__proto__ || Object.getPrototypeOf(CustomReactQuill)).call(this, props));

    _this.attachQuillRefs = function () {
      // Ensure React-Quill reference is available:
      if (typeof _this.reactQuillRef.getEditor !== 'function') return;
      // Skip if Quill reference is defined:
      if (_this.quillRef != null) return;

      var quillRef = _this.reactQuillRef.getEditor();
      if (quillRef != null) _this.quillRef = quillRef;
    };

    _this.imageHandler = function (image) {
      document.getElementById('attachment').click();
    };

    _this.state = {};

    if (document) {
      _this.quill = require('react-quill');
      var imageResize = require('quill-image-resize-module');
      _this.quill.Quill.register('modules/ImageResize', imageResize.default);
    }

    _this.imageHandler = _this.imageHandler.bind(_this);
    _this.attachQuillRefs = _this.attachQuillRefs.bind(_this);
    return _this;
  }

  _createClass(CustomReactQuill, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.attachQuillRefs();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.attachQuillRefs();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var ReactQuill = this.quill;

      var modules = {
        ImageResize: {
          // See optional "config" below
        },
        formula: true,
        toolbar: {
          container: [['bold', 'italic', 'underline', 'strike', 'blockquote'], [{ 'header': 1 }, { 'header': 2 }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'direction': 'rtl' }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'color': [] }, { 'background': [] }], [{ 'font': [] }], [{ 'align': [] }], ['link', 'image', 'formula'], ['clean']],
          handlers: {
            'image': this.imageHandler
          }
        }
      };

      var formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];

      var uploadProps = {
        name: 'file',
        action: (0, _NetworkManager.getBaseUrl)(this.props.axiosName) + '/attachments',
        headers: (0, _NetworkManager.getHeadersSetter)(this.props.axiosName)(),
        accept: 'image/*',
        onChange: function onChange(info) {
          if (info.file.status === 'done') {
            // this.setState({
            //   attachmentUrl: info.file.response.attachment.url
            // })
            var range = _this2.quillRef.getSelection();
            var position = range ? range.index : 0;
            _this2.quillRef.clipboard.dangerouslyPasteHTML(position, '<img src=\'' + (0, _UIManager.formatImageUrl)(info.file.response.attachment.url) + '\' />');
          }
        }
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(ReactQuill, {
          ref: function ref(el) {
            _this2.reactQuillRef = el;
          },
          defaultValue: this.props.defaultValue,
          onChange: this.props.onChange,
          theme: 'snow',
          modules: modules,
          formates: formats
        }),
        _react2.default.createElement(
          _upload2.default,
          _extends({}, uploadProps, { style: { display: 'none' } }),
          _react2.default.createElement(
            _button2.default,
            { id: 'attachment' },
            _react2.default.createElement(_icon2.default, { type: 'upload' })
          )
        )
      );
    }
  }]);

  return CustomReactQuill;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(CustomReactQuill);