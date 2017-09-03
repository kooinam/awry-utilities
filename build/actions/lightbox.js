'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var openLightbox = exports.openLightbox = function openLightbox(images, index) {
  return function (dispatch) {
    dispatch({
      type: 'OPEN_LIGHTBOX',
      payload: {
        images: images,
        index: index
      }
    });
  };
};

var dismissLightbox = exports.dismissLightbox = function dismissLightbox() {
  return function (dispatch) {
    dispatch({
      type: 'DISMISS_LIGHTBOX'
    });
  };
};