export default (state = {
  breadcrumbIdentifiers: {},
}, action) => {
  switch (action.type) {
    case 'SETUP_BREADCRUMB_IDENTIFIERS':
      const keys = Object.keys(action.payload.breadcrumbIdentifiers);
      for (let key of keys) {
        if (state.breadcrumbIdentifiers[key] != action.payload.breadcrumbIdentifiers[key]) {
          return Object.assign({}, state, {
            breadcrumbIdentifiers: action.payload.breadcrumbIdentifiers,
          });
        }
      }
      return state;
    default:
      return state;
  }
};
