const initialstate = {
  user: {},
  userId: ''
}
export default (state = initialstate, action) => {
  switch (action.type) {
    case "SET_USER_OBJ":
      return Object.assign({}, state, {
        user: action.payload
      });
    case "SET_USER_ID":
      return Object.assign({}, state, {
        userId: action.payload
      });
    default:
      return state
  }
}
