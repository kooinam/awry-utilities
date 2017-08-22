import uuidV4 from 'uuid/v4'
import { message } from 'antd';
import { getErrorDescription, getMessageDuration } from '../utils/UIManager';

// new TableParams({
//   component: this,
//   key: 'tableParams',
//   axiosGetter: getAxios,
//   itemName: 'item',
//   errorMessage: 'Error',
//   scope: null,
// })

class TableParams extends Object {
  constructor(attributes) {
    const newAttributes = Object.assign({
      component: null,
      key: null,
      axiosGetter: null,
      itemsName: null,
      ItemKlass: null,
      errorMessage: null,
      isError: false,
      scope: null,
      isLoading: false,
      pagination: {
        total: 0,
        current: 1,
        per_page: 10,
      },
      items: [],
    }, attributes);

    super(newAttributes);

    this.lastSearchId = 0;
    this.rotateUuid();
  }

  rotateUuid = () => {
    this.uuid = uuidV4();

    return this;
  }

  reload = () => {
    let tableParams = this.rotateUuid();
    let state = {};
    state[this.key] = tableParams;
    this.component.setState(state);
  }

  loadItems = (url, params) => {
    this.lastSearchId += 1;
    const searchId = this.lastSearchId;

    let component = this.component;
    let tableParams = component.state[this.key];
    tableParams.isLoading = true;
    tableParams.rotateUuid();
    let state = {};
    state[this.key] = tableParams;
    component.setState(state, () => {
      const axiosGetter = this.axiosGetter;
      axiosGetter.then((instance) => {
        params = params || {
          params: {},
        };
        params.params.scope = this.scope;
        return instance.get(url, params);
      }).then((response) => {
        if (searchId == this.lastSearchId) {
          let tableParams = component.state[this.key];
          tableParams.isLoading = false;
          tableParams.isError = false;
          tableParams.items = response.data[this.itemsName].map((item) => {
            return new this.ItemKlass(item);
          })
          tableParams.pagination.total = response.data.total_count;
          tableParams.rotateUuid();
          let state = {};
          state[this.key] = tableParams;
          component.setState(state);
          if (this.callback) {
            this.callback();
          }
        }
      }).catch((error) => {
        if (searchId == this.lastSearchId) {
          let tableParams = component.state[this.key];
          tableParams.isLoading = false;
          tableParams.isError = true;
          let state = {};
          state[this.key] = tableParams;
          this.rotateUuid();
          component.setState(state);
          if (error && error.response) {
            if (this.errorMessage) {
              message.error(this.errorMessage, getMessageDuration());
            }
          }
          else {
            console.log(error);
          }
        }
      });
    });
  }
}

export default TableParams;
