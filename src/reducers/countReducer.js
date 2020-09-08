export default (state = 0, action) => {
    switch (action.type) {
      case "ADD_MESSAGE":
        return state + 1;
  
      default:
        return state;
    }
  };
  