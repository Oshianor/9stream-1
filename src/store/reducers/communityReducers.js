const initialstate = {
  commentId: '',
  commentReply: null,
  comment: [],
  reply: [],
  refresh: false,
  loading: true,
  votingToggle: true,
  commentText: '',
  replyText: ''
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
    case "GET_COMMENT":
      return Object.assign({}, state, {
        comment: action.payload,
        loading: false
      });
    case "GET_REPLY":
      return Object.assign({}, state, {
        reply: action.payload,
        loading: false
      });
    case "VOTING_TOGGLE":
      return Object.assign({}, state, {
        votingToggle: !state.votingToggle
      });
    case "COMMENT_TEXT":
      return Object.assign({}, state, {
        commentText: action.payload,
      });
    default:
      return state
  }
}
