const initialstate = {
  commentId: '',
  commentReply: null
}
export default (state = initialstate, action) => {
  switch (action.type) {
    case "SET_CURRENT_COMMENT_ID":
      return Object.assign({}, state, {
        commentId: action.payload, // input, images
      });
    case "PASS_CURRENT_COMMENT_REPLY_OBJECT_DATA":
      return Object.assign({}, state, {
        commentReply: action.payload
      });
    default:
      return state
  }
}
