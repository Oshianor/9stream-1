// Dashboard actions
export const setCurrentCommunityTabRoute = (tabRoute) => {
  // console.log("You click on a dashboard, Community route => ", tabRoute);
  return {
    type: "SET_CURRENT_COMMUNITY_TAB_ROUTE",
    payload: tabRoute
  }
}


export const setCurrentHeader = (tabRoute) => {
  return {
    type: "SET_CURRENT_HEADER",
    payload: tabRoute
  }
}