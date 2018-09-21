export const getUserObject = (userObj) => {
  // console.log("You click on a dashboard, Community route => ", userObj);
  return {
    type: "SET_USER_OBJ",
    payload: userObj
  }
}

export const setUserId = (userId) => {
  // console.log("You click on a dashboard, Community route => ", userObj);
  return {
    type: "SET_USER_ID",
    payload: userId
  }
}