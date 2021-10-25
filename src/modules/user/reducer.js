import * as type from "../types";

const initialState = {
  auth: null,
  isAuthenticated: null,
  loading: false,
  error: null,
  user: {},
  userMediaIds: {},
  posts: [],
};

export default function getAccessTokenReducer(state = initialState, action) {
  switch (action.type) {
    case type.GET_ACCESS_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case type.GET_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        auth: action.auth,
      };
    case type.GET_ACCESS_TOKEN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
        isAuthenticated: false,
      };

    case type.GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case type.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
      };
    case type.GET_USER_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case type.GET_USER_MEDIA_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case type.GET_USER_MEDIA_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        userMediaIds: action.userMediaIds.data.data,
      };
    case type.GET_USER_MEDIA_ID_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case type.GET_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case type.GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.posts,
      };
    case type.GET_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
