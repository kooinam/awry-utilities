'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAxios = exports.setupAxios = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Network = {
  component: null,
  tokenGetter: null
};

var setupAxios = exports.setupAxios = function setupAxios(component, tokenGetter) {
  Network.component = component;
  Network.tokenGetter = tokenGetter;
};

var addInterceptors = function addInterceptors(instance) {
  instance.interceptors.request.use(function (config) {
    Network.component.showLoading();
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  instance.interceptors.response.use(function (response) {
    Network.component.hideLoading();
    return response;
  }, function (error) {
    Network.component.hideLoading();
    if (error && error.response) {
      if (error.response.status === 401) {
        Network.component.unauthorized();
        return Promise.reject(null);
      }

      return Promise.reject(error);
    }

    return Promise.reject(null);
  });
};

var getAxios = exports.getAxios = function getAxios() {
  return new Promise(function (resolve) {
    var instance = _axios2.default.create({
      baseURL: '/api'
    });
    var headers = {};
    var token = Network.tokenGetter();
    if (token) {
      headers['X-Authentication-Token'] = token;
    }
    Object.assign(instance.defaults, {
      headers: headers
    });
    addInterceptors(instance);
    resolve(instance);
  });
};