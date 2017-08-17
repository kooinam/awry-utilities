/* @flow */

import uuidV4 from 'uuid/v4';

// new ModalParams({
//   component: this,
//   key: 'modalParams',
// })

class ModalParams extends Object {
  constructor(attributes) {
    const newAttributes = Object.assign({
      component: null,
      key: null,
      visible: false,
      doneCallback: null,
    }, attributes);

    super(newAttributes);

    this.rotateUuid();
  }

  rotateUuid = () => {
    this.uuid = uuidV4();
  }

  show = (doneCallback) => {
    const modalParams = this.component.state[this.key];
    modalParams.visible = true;
    modalParams.rotateUuid();
    const state = {};
    state[this.key] = modalParams;
    this.component.setState(state);
    this.doneCallback = doneCallback;
  }

  dismiss = () => {
    const modalParams = this.component.state[this.key];
    modalParams.visible = false;
    modalParams.rotateUuid();
    const state = {};
    state[this.key] = modalParams;
    this.component.setState(state);
  }

  done = () => {
    const modalParams = this.component.state[this.key];
    modalParams.visible = false;
    modalParams.rotateUuid();
    const state = {};
    state[this.key] = modalParams;
    this.component.setState(state);
    if (this.doneCallback) {
      this.doneCallback();
    }
  }
}

export default ModalParams;
