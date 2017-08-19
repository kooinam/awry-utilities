import axios from 'axios';

const Network = {
  component: null,
  tokenGetter: null,
  preferences: {},
};

export const setupAxios = (component, tokenGetter) => {
  Network.component = component;
  Network.tokenGetter = tokenGetter;
};

export const addAxiosPreferences = (key, preferences) => {
  Network.preferences[key] = preferences;
};

const addInterceptors = (instance) => {
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
};

export const getAxios = (key) =>
  new Promise((resolve) => {
    let baseURL = '/api';
    if (key && Network.preferences[key]) {
      const preferences = Network.preferences[key];
      baseURL = preferences.baseURL
    }
    const instance = axios.create({
      baseURL: baseURL,
    });
    const headers = {};
    const token = Network.tokenGetter();
    if (token) {
      headers['X-Authentication-Token'] = token;
    }
    Object.assign(instance.defaults, {
      headers,
    });
    addInterceptors(instance);
    resolve(instance);
  });

