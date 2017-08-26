import uuidV4 from 'uuid/v4';
import { message } from 'antd';
import { getMessageDuration } from './UIManager';

// new ItemLoader({
//   component: this,
//   key: 'itemLoader',
//   axiosGetter: getAxios,
//   itemsName: 'item',
//   ItemKlass: Item,
//   errorMessage: 'Error',
// })

class ItemLoader extends Object {
  constructor(attributes) {
    const newAttributes = Object.assign({
      component: null,
      key: null,
      axiosGetter: null,
      itemName: null,
      ItemKlass: null,
      errorMessage: null,
      isError: false,
      isLoading: false,
      item: null,
      callback: null,
    }, attributes);

    super(attributes);

    this.lastSearchId = 0;
    this.rotateUuid();
  }

  rotateUuid = () => {
    this.uuid = uuidV4();

    return this;
  }

  isFirstLoading = () => {
    return this.lastSearchId === 1 && this.isLoading;
  }

  loadItem = (url, params) => {
    this.lastSearchId += 1;
    const searchId = this.lastSearchId;

    let component = this.component;
    let itemLoader = component.state[this.key];
    itemLoader.isLoading = true;
    itemLoader.rotateUuid();
    let state = {};
    state[this.key] = itemLoader;
    component.setState(state, () => {
      const axiosGetter = this.axiosGetter;
      axiosGetter().then((instance) => {
        return instance.get(url, params);
      }).then((response) => {
        if (searchId === this.lastSearchId) {
          let itemLoader = component.state[this.key];
          itemLoader.isLoading = false;
          itemLoader.isError = false;
          itemLoader.item = new this.ItemKlass(response.data[this.itemName]);
          itemLoader.rotateUuid();
          let state = {};
          state[this.key] = itemLoader;
          component.setState(state, () => {
            if(this.callback) {
              this.callback();
            }
          });
        }
      }).catch((error) => {
        if (searchId === this.lastSearchId) {
          let itemLoader = component.state[this.key];
          itemLoader.isLoading = false;
          itemLoader.isError = true;
          itemLoader.rotateUuid();
          let state = {};
          state[this.key] = itemLoader;
          component.setState(state, () => {
            if(error && error.response) {
              if(this.errorMessage) {
                message.error(this.errorMessage, getMessageDuration());
              }
            }
            else {
              console.log(error);
            }
          });
        }
      });
    });
  }
}

export default ItemLoader;