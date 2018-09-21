export const getvodlist = (list) => {
    return {
        type: "GET_VOD_LIST",
        payload: list
    }
}
export const getvodlistupdate = (list) => {
    return {
        type: "GET_VOD_LIST_UPDATE",
        payload: list
    }
}
export const getvodloading = () => {
    return {
        type: "GET_VOD_LOADING"
    }
}
export const getvodcategorylist = (list) => {
    return {
        type: "GET_VOD_CATEGORY_LIST",
        payload: list
    }
}





export const getxplorelist = (list) => {
    return {
        type: "GET_XPLORE_LIST",
        payload: list
    }
}
export const getxplorevideo = (list) => {
    return {
        type: "GET_XPLORE_VIDEO",
        payload: list
    }
}
export const getxploreimage = (list) => {
    return {
        type: "GET_XPLORE_IMAGE",
        payload: list
    }
}
export const getxplorelistupdate = (list) => {
    return {
        type: "GET_XPLORE_LIST_UPDATE",
        payload: list
    }
}
export const getxploreloading = () => {
    return {
        type: "GET_XPLORE_LOADING"
    }
} 





export const getlive = (list) => {
    return {
        type: "GET_LIVE",
        payload: list
    }
}
export const getliveposter = (list) => {
    return {
        type: "GET_LIVE_POSTER",
        payload: list
    }
}
export const getlivevideo = (list) => {
    return {
        type: "GET_LIVE_VIDEO",
        payload: list
    }
}


export const refresh = (list) => {
    return {
        type: "REFRESH_TRUE"
    }
}

