import uuidV4 from 'uuid/v4'
import { message } from 'antd';

import { getErrorDescription, getMessageDuration } from './UIManager';
import { invalidateSSRItems } from '../actions/ssr';

// new TableParams({
//   component: this,
//   key: 'tableParams',
//   axiosGetter: getAxios,
//   itemsName: 'items',
//   ItemKlass: Item,
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
      url: null,
      paramsGetter: () => {
        return {
          params: {
            q: this.filter,
            per_page: this.pagination.per_page,
            page: this.pagination.current,
          },
        };
      },
      errorMessage: null,
      filter: {},
      pagination: {
        total: 0,
        current: 1,
        per_page: 10,
      },
      scope: null,
      isLoading: false,
      isError: false,
      items: [],
      ssrKey: null,
    }, attributes);

    super(newAttributes);

    this.lastSearchId = 0;
    this.rotateUuid();
  }


  isFirstLoading = () => {
    return this.lastSearchId === 1 && this.isLoading;
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

  setComponent = (setter, setterCallback) => {
    const component = this.component;
    if (component) {
      const tableParams = component.state[this.key];
      tableParams.rotateUuid();
      setter(tableParams);
      const state = {};
      state[this.key] = tableParams;
      component.setState(state, setterCallback);
    }
    else {
      setterCallback();
    }
  }

  loadItems = () => {
    if (this.ssrKey && this.component && this.component.props.SSRReducer && this.component.props.SSRReducer.ssrItems && this.component.props.SSRReducer.ssrItems[this.ssrKey] && !this.component.props.SSRReducer.ssrItems[this.ssrKey].isServed) {
      return new Promise((resolve) => {
        const items = this.component.props.SSRReducer.ssrItems[this.ssrKey].value;
        this.setComponent((tableParams) => {
          tableParams.items = items;
        }, () => {
          if (this.callback) {
            this.callback(items);
          }
          this.component.props.dispatch(invalidateSSRItems(this.ssrKey));
          resolve();
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        this.lastSearchId += 1;
        const searchId = this.lastSearchId;

        this.setComponent((tableParams) => {
          tableParams.isLoading = true
        }, () => {
          const axiosGetter = this.axiosGetter;
          axiosGetter().then((instance) => {
            const params = this.paramsGetter();
            params.params.scope = this.scope;

            return instance.get(this.url, params);
          }).then((response) => {
            if (searchId === this.lastSearchId) {
              const items = response.data[this.itemsName].map((item) => {
                return new this.ItemKlass(item);
              })
              this.setComponent((tableParams) => {
                tableParams.isLoading = false;
                tableParams.isError = false;
                tableParams.items = items;
                tableParams.pagination.total = response.data.total_count;
              }, () => {
                if (this.callback) {
                  this.callback(items);
                }
                resolve(items);
              });
            }
            else {
              reject();
            }
          }).catch((error) => {
            if (searchId === this.lastSearchId) {
              this.setComponent((tableParams) => {
                tableParams.isLoading = false;
                tableParams.isError = true;
              }, () => {
                if (error && error.response) {
                  if (this.errorMessage) {
                    message.error(this.errorMessage, getMessageDuration());
                  }
                }
                else {
                  console.log(error);
                }

                reject(error);
              });
            }
            else {
              reject();
            }
          });
        });
      });
    }
  }
}

export default TableParams;
