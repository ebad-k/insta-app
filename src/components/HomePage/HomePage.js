import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getAccessTokenAction,
  getUserProfile,
  getUserMediaIds,
  getPosts,
} from "../../modules/user/action";
import { Space } from "antd";
import { View, ActivityIndicator } from "react-native";
const HomePage = ({ history }) => {
  const auth = useSelector((state) => state.getAccessTokenReducer.auth);
  const isAuthenticated = useSelector(
    (state) => state.getAccessTokenReducer.isAuthenticated
  );
  let access_token = "";
  // console.log("History => ", window.location.hr);
  const location = useLocation();
  const code = location.search.split("=")[1];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccessTokenAction(code));
  }, [code]);
  useEffect(() => {
    access_token = localStorage.getItem("access_token");
  }, [auth]);
  return isAuthenticated ? (
    <Redirect to="/profile"></Redirect>
  ) : (
    <View>
      <Space>
        <ActivityIndicator size="large" style={{ marginTop: "30px" }} />
      </Space>
    </View>
  );
};

export default HomePage;
