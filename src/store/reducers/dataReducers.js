const initialstate = {
    live: {},
    liveVideo: '',
    livePoster: '',
    vodList: [],
    vodCatList: [],
    vodLoading: true,
    refreshing: false,
    xploreList: [],
    xploreVideo: '',
    xplorePoster: '',
    xploreLoading: true
  }
  export default (state = initialstate, action) => {
    switch (action.type) {
        // vod api
        case "GET_VOD_LIST":
            return Object.assign({}, state, {
                vodList: action.payload,
                vodLoading: false
            });
        case "GET_VOD_LIST_UPDATE":
            return Object.assign({}, state, {
                vodList: action.payload,
                refreshing: false
            });
        case "GET_VOD_CATEGORY_LIST":
            return Object.assign({}, state, {
                vodCatList: action.payload
            });
        case "GET_VOD_LOADING":
            return Object.assign({}, state, {
                vodCatList: action.payload
            });

        
        // xplore api
        case "GET_XPLORE_LIST":
            return Object.assign({}, state, {
                xploreList: action.payload,
                xploreLoading: false
            });
        case "GET_XPLORE_VIDEO":
            return Object.assign({}, state, {
                xploreVideo: action.payload,
                refreshing: false
            });
        case "GET_XPLORE_IMAGE":
            return Object.assign({}, state, {
                xplorePoster: action.payload,
                refreshing: false
            });    
        case "GET_XPLORE_LIST_UPDATE":
            return Object.assign({}, state, {
                xploreList: action.payload,
                refreshing: false
            }); 
        case "GET_XPLORE_LOADING":
            return Object.assign({}, state, {
                xploreLoading: !state.xploreLoading
            })


        // live api
        case "GET_LIVE":
            return Object.assign({}, state, {
                live: action.payload
            });
        case "GET_LIVE_POSTER":
            return Object.assign({}, state, {
                livePoster: action.payload
            });
        case "GET_LIVE_VIDEO":
            return Object.assign({}, state, {
                liveVideo: action.payload
            });

            
        case "GET_LIVE_UPDATE":
            return Object.assign({}, state, {
                live: action.payload,
                refreshing: false
            });

        // neutral 
        case "REFRESH_TRUE":
            return Object.assign({}, state, {
                refreshing: !state.refreshing
            });
        default:
            return state
    }
  }
  