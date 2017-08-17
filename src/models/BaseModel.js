import uuidV4 from 'uuid/v4';

class BaseModel extends Object {
  constructor(attributes) {
    const newAttributes = Object.assign({}, attributes);

    super(newAttributes);

    if (!this.uuid) {
      this.uuid = uuidV4();
    }
  }
}

export default BaseModel;
