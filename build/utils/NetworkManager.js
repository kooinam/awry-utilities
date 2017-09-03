'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAxios = exports.getHeadersSetter = exports.getBaseUrl = exports.addAxiosPreferences = exports.setupAxios = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Network = {
  component: null,
  preferences: {}
};

var setupAxios = exports.setupAxios = function setupAxios(component) {
  Network.component = component;
};

var addAxiosPreferences = exports.addAxiosPreferences = function addAxiosPreferences(key, preferences) {
  Network.preferences[key] = preferences;
};

var addInterceptors = function addInterceptors(instance) {
  if (Network.component) {
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
  }
};

var getBaseUrl = exports.getBaseUrl = function getBaseUrl(key) {
  var baseURL = '/api';
  var preferences = Network.preferences[key];
  if (preferences) {
    baseURL = preferences.baseURL;
  }

  return baseURL;
};

var getHeadersSetter = exports.getHeadersSetter = function getHeadersSetter(key) {
  var headersSetter = function headersSetter() {
    return {};
  };
  var preferences = Network.preferences[key];
  if (preferences) {
    headersSetter = preferences.headersSetter;
  }

  return headersSetter;
};

var getAxios = exports.getAxios = function getAxios(key) {
  return new Promise(function (resolve) {
    var instance = _axios2.default.create({
      baseURL: getBaseUrl(key)
    });
    Object.assign(instance.defaults, {
      headers: getHeadersSetter(key)()
    });
    addInterceptors(instance);
    resolve(instance);
  });
};