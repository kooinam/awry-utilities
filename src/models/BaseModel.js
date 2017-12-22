import cookie from 'react-cookies';
import uuidV4 from 'uuid/v4';

class BaseModel extends Object {
  constructor(attributes) {
    const newAttributes = Object.assign({}, attributes);

    super(newAttributes);

    if (!this.uuid) {
      this.uuid = uuidV4();
    }
  }

  static getCookie = (key) => {
    return cookie.load(key);
  }

  static setCookie = (key, value) => {
    if (typeof (window) === 'undefined') {
      return;
    }

    if (window.location.hostname.match(/([^.]*\.(com$|net$|me$))/g)) {
      cookie.save(key, value, {
        path: '/',
        domain: '.'+window.location.hostname.match(/([^.]*\.(com$|net$|me$))/g)[0],
      });
    } else {
      cookie.save(key, value, {
        path: '/',
      });
    }
  }

  static removeCookie = (key) => {
    if (typeof (window) === 'undefined') {
      return;
    }

    if (window.location.hostname.match(/([^.]*\.(com$|net$|me$))/g)) {
      cookie.remove(key, {
        path: '/',
        domain: '.'+window.location.hostname.match(/([^.]*\.(com$|net$|me$))/g)[0],
      });
      cookie.remove(key, { path: '/' });
    } else {
      cookie.remove(key, { path: '/' });
    }
  }
}

export default BaseModel;
