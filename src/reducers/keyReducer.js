export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_KEY":
      return {...state, [action.payload.apikey]: action.payload};

    default:
      return state;
  }
};
