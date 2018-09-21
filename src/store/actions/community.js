// Dashboard actions
export const setCurrentCommentId = (obj) => {
  return {
    type: "SET_CURRENT_COMMENT_ID",
    payload: obj
  }
}

export const passCurrentComentReplyObjectData = (obj) => {
  return {
    type: "PASS_CURRENT_COMMENT_REPLY_OBJECT_DATA",
    payload: obj
  }
}