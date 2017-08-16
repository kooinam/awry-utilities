import { notification } from 'antd';
import { getErrorDescription, getNotificationDuration } from './UIManager';

class Actioner extends Object {
  constructor(attributes) {
    const newAttributes = Object.assign({
      component: null,
      key: null,
      axiosGetter: null,
      method: null,
      itemName: null,
      ItemKlass: null,
      successMessageGetter: null,
      successDescriptionGetter: null,
      successCallback: null,
      errorMessageGetter: null,
      isLoading: false,
      error: { },
    }, attributes);

    super(newAttributes);
  }

  do = (url, params) => {
    const component = this.component;
    const actioner = component.state[this.key];
    actioner.isLoading = true;
    const state = { };
    state[this.key] = actioner;
    component.setState(state, () => {
      const axiosGetter = this.axiosGetter;
      axiosGetter().then((instance) => {
        if (this.method === 'get') {
          return instance.get(url, params);
        } else if (this.method === 'post') {
          return instance.post(url, params);
        } else if (this.method === 'delete') {
          return instance.delete(url, params);
        } else if (this.method === 'patch') {
          return instance.patch(url, params);
        }

        return null;
      }).then((response) => {
        console.log(response);
        const actioner2 = component.state[this.key];
        actioner2.isLoading = false;
        actioner2.error = null;
        const state2 = { };
        state2[this.key] = actioner2;
        const item = new this.ItemKlass(response.data[this.itemName]);
        if (this.successMessageGetter && this.successMessageGetter(item)) {
          let description = null;
          if (this.successDescriptionGetter) {
            description = this.successDescriptionGetter(item);
          }
          notification.success({
            message: this.successMessageGetter(item),
            description,
            duration: getNotificationDuration(),
          });
        }
        component.setState(state2, () => {
          if (this.successCallback) {
            this.successCallback(item);
          }
        });
      }).catch((error) => {
        const actioner2 = component.state[this.key];
        actioner2.isLoading = false;
        actioner2.error = error;
        const state2 = { };
        state2[this.key] = actioner2;
        component.setState(state2, () => {
          if (this.errorCallback) {
            this.errorCallback(error);
          }
        });
        if (error && error.response) {
          if (this.errorMessageGetter && this.errorMessageGetter()) {
            notification.error({
              message: this.errorMessageGetter(),
              description: getErrorDescription(error),
              duration: getNotificationDuration(),
            });
          }
        } else {
          console.log('error', error);
        }
      });
    });
  }
}

export default Actioner;
