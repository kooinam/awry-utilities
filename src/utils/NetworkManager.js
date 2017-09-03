import axios from 'axios';

const Network = {
  component: null,
  preferences: {},
};

export const setupAxios = (component) => {
  Network.component = component;
};

export const addAxiosPreferences = (key, preferences) => {
  Network.preferences[key] = preferences;
};

const addInterceptors = (instance) => {
  if (Network.component) {
    instance.interceptors.request.use((config) => {
      Network.component.showLoading();
      return config;
    }, error =>
      Promise.reject(error),
    );

    instance.interceptors.response.use((response) => {
      Network.component.hideLoading();
      return response;
    }, (error) => {
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

export const getBaseUrl = (key) => {
  let baseURL = '/api';
  const preferences = Network.preferences[key];
  if (preferences) {
    baseURL = preferences.baseURL;
  }

  return baseURL;
};

export const getHeadersSetter = (key) => {
  let headersSetter = () => {
    return {};
  };
  const preferences = Network.preferences[key];
  if (preferences) {
    headersSetter = preferences.headersSetter;
  }

  return headersSetter;
};

export const getAxios = (key) =>
  new Promise((resolve) => {
    const instance = axios.create({
      baseURL: getBaseUrl(key),
    });
    Object.assign(instance.defaults, {
      headers: getHeadersSetter(key)(),
    });
    addInterceptors(instance);
    resolve(instance);
  });