'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isLightboxOpen: false,
    images: [],
    index: 0
  };
  var action = arguments[1];

  switch (action.type) {
    case 'OPEN_LIGHTBOX':
      return Object.assign({}, state, {
        isLightboxOpen: true,
        images: action.payload.images,
        index: action.payload.index
      });
    case 'DISMISS_LIGHTBOX':
      return Object.assign({}, state, {
        isLightboxOpen: false
      });
    default:
      return state;
  }
};