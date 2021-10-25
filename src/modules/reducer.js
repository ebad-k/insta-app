import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import getAccessTokenReducer from "./user/reducer";

const rootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    getAccessTokenReducer,
  });
};

export default rootReducer;
