'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNotificationDuration = exports.getFieldsError = exports.getFieldError = exports.getErrorDescription = exports.getAxios = exports.setupAxios = exports.ModalParams = exports.Actioner = undefined;

var _Actioner = require('./utils/Actioner');

var _Actioner2 = _interopRequireDefault(_Actioner);

var _ModalParams = require('./utils/ModalParams');

var _ModalParams2 = _interopRequireDefault(_ModalParams);

var _NetworkManager = require('./utils/NetworkManager');

var _UIManager = require('./utils/UIManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {
//   Actioner,
//   ModalParams,
//   setupAxios,
//   getAxios,
//   getErrorDescription,
//   getFieldError,
//   getFieldsError,
//   getNotificationDuration
// } from './utils'

exports.Actioner = Actioner;
exports.ModalParams = _ModalParams2.default;
exports.setupAxios = _NetworkManager.setupAxios;
exports.getAxios = _NetworkManager.getAxios;
exports.getErrorDescription = _UIManager.getErrorDescription;
exports.getFieldError = _UIManager.getFieldError;
exports.getFieldsError = _UIManager.getFieldsError;
exports.getNotificationDuration = _UIManager.getNotificationDuration;