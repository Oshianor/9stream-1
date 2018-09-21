import { combineReducers } from 'redux';
import routeReducer from './routeReducer';
import communityReducer from './communityReducers';
import userReducers from './userReducers';
import dataReducers from './dataReducers';

const appReducer = combineReducers({
  route: routeReducer,
  community: communityReducer,
  user: userReducers,
  data: dataReducers
});

export default appReducer;