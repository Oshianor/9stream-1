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

export const getcomment = (obj) => {
  return {
    type: "GET_COMMENT",
    payload: obj
  }
}

export const getReply = (obj) => {
  return {
    type: "GET_REPLY",
    payload: obj
  }
}


export const commenttext = (obj) => {
  return {
    type: "COMMENT_TEXT",
    payload: obj
  }
}

export const replytext = (obj) => {
  return {
    type: "REPLY_TEXT",
    payload: obj
  }
}



export const votingtoggle = () => {
  return {
    type: "VOTING_TOGGLE",
  }
}


export const celeb = (obj) => {
  // list of celeb
  return {
    type: "CELEB",
    payload: obj
  }
}



export const voting = (obj) => {
  // list of celeb
  return {
    type: "VOTING",
    payload: obj
  }
}