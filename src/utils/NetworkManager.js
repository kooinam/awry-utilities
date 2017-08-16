import axios from 'axios';

const Network = {
  component: null,
  tokenGetter: null,
};

export const setupAxios = (component) => {
  Network.component = component;
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

export const getAxios = () =>
  new Promise((resolve) => {
    const instance = axios.create({
      baseURL: '/api',
    });
    const headers = { };
    const token = tokenGetter();
    if (token) {
      headers['X-Authentication-Token'] = token;
    }
    Object.assign(instance.defaults, {
      headers,
    });
    addInterceptors(instance);
    resolve(instance);
  });

