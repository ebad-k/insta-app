import * as type from "../types";

export function getAccessTokenAction(code) {
  return {
    type: type.GET_ACCESS_TOKEN_REQUEST,
    payload: code,
  };
}

export function getUserProfile(auth) {
  return {
    type: type.GET_USER_PROFILE_REQUEST,
    payload: auth,
  };
}
export function getUserMediaIds(auth) {
  return {
    type: type.GET_USER_MEDIA_ID_REQUEST,
    payload: auth,
  };
}

export function getPosts(data, access_token) {
  return {
    type: type.GET_POST_REQUEST,
    data: data,
    access_token: access_token,
  };
}
