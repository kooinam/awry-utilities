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

export const getAxios = (key) =>
  new Promise((resolve) => {
    let baseURL = '/api';
    const preferences = Network.preferences[key];
    if (preferences) {
      baseURL = preferences.baseURL;
    }
    const instance = axios.create({
      baseURL: baseURL,
    });
    let headers = {};
    if (preferences) {
      headers = Object.assign(headers, preferences.headersSetter());
    }
    Object.assign(instance.defaults, {
      headers,
    });
    addInterceptors(instance);
    resolve(instance);
  });

