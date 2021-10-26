import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import oauth from "axios-oauth-client";
const getAuthorizationCode = (code) =>
  oauth.client(axios.create(), {
    method: "post",
    url: "https://api.instagram.com/oauth/access_token",
    client_id: "402482767984493",
    client_secret: "e7b497895f75abfab74283b9f0015136",
    redirect_uri: "https://ekinsta.herokuapp.com/home",
    grant_type: "authorization_code",
    code: code,
  });
const getUserInformation = async (access_token) => {
  console.log("auth", access_token);
  const result = await axios.get(
    `https://graph.instagram.com/me?fields=id,username,media_count&access_token=${access_token}`
  );
  return result;
};

const getUserMediaIds = async (access_token) => {
  console.log("auth", access_token);
  const result = await axios.get(
    `https://graph.instagram.com/me/media?field=id&access_token=${access_token}`
  );
  console.log("Result => ", result);
  return result;
};

const getPostPerId = async (data, access_token) => {
  console.log("Data => ", data);
  console.log("access_token => ", access_token);
  const result = [];
  for (let i = 0; i < data.length; i++) {
    let post = await axios.get(
      `https://graph.instagram.com/${data[i].id}?access_token=${access_token}&fields=id,media_type,media_url,username,timestamp,caption,thumbnail_url`
    );
    result.push(post);
  }

  return result;
};
function* fetchAccessToken(action) {
  try {
    const auth = yield call(getAuthorizationCode(action.payload));
    yield put({ type: "GET_ACCESS_TOKEN_SUCCESS", auth: auth });
    if (auth.access_token) {
      localStorage.setItem("access_token", auth.access_token);
    }
  } catch (e) {
    yield put({ type: "GET_ACCESS_TOKEN_FAILED", message: e.message });
  }
}

function* fetchUserInformation(action) {
  try {
    console.log("Action => ", action);
    const user = yield call(getUserInformation, action.payload);
    yield put({ type: "GET_USER_PROFILE_SUCCESS", user });
  } catch (e) {
    yield put({ type: "GET_USER_PROFILE_FAILED", message: e.message });
  }
}

function* fetchUserMediaIds(action) {
  try {
    const userMediaIds = yield call(getUserMediaIds, action.payload);
    yield put({ type: "GET_USER_MEDIA_ID_SUCCESS", userMediaIds });
  } catch (e) {
    yield put({ type: "GET_USER_MEDIA_ID_FAILED", message: e.message });
  }
}

function* fetchPosts(action) {
  console.log("Fetch Post Action => ", action);
  try {
    const posts = yield call(getPostPerId, action.data, action.access_token);
    yield put({ type: "GET_POST_SUCCESS", posts });
  } catch (e) {
    yield put({ type: "GET_POST_FAILED", message: e.message });
  }
}
function* userSaga() {
  yield takeEvery("GET_ACCESS_TOKEN_REQUEST", fetchAccessToken);
  yield takeEvery("GET_USER_PROFILE_REQUEST", fetchUserInformation);
  yield takeEvery("GET_USER_MEDIA_ID_REQUEST", fetchUserMediaIds);
  yield takeEvery("GET_POST_REQUEST", fetchPosts);
}

export default userSaga;
