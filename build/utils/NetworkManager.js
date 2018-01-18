'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAxios = exports.getHeadersSetter = exports.getBaseUrl = exports.addAxiosPreferences = exports.setupAxios = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getNetwork() {
  global = typeof window === 'undefined' ? global : window;

  global.Network = global.Network || {
    component: null,
    preferences: {}
  };

  return global.Network;
}

var setupAxios = exports.setupAxios = function setupAxios(component) {
  getNetwork().component = component;
};

var addAxiosPreferences = exports.addAxiosPreferences = function addAxiosPreferences(key, preferences) {
  getNetwork().preferences[key] = preferences;
};

var addInterceptors = function addInterceptors(instance) {
  if (getNetwork().component) {
    instance.interceptors.request.use(function (config) {
      getNetwork().component.showLoading();
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    instance.interceptors.response.use(function (response) {
      getNetwork().component.hideLoading();
      return response;
    }, function (error) {
      getNetwork().component.hideLoading();
      if (error && error.response) {
        if (error.response.status === 401) {
          if (Network.component.unauthorized) {
            Network.component.unauthorized();
          }
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
  var preferences = getNetwork().preferences[key];
  if (preferences) {
    baseURL = preferences.baseURL;
  }

  return baseURL;
};

var getHeadersSetter = exports.getHeadersSetter = function getHeadersSetter(key) {
  var headersSetter = function headersSetter() {
    return {};
  };
  var preferences = getNetwork().preferences[key];
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