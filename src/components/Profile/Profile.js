import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  getUserProfile,
  getUserMediaIds,
  getPosts,
} from "../../modules/user/action";
const access_token = localStorage.getItem("access_token");

export const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.getAccessTokenReducer.user);
  const loading = useSelector((state) => state.getAccessTokenReducer.loading);
  const data = useSelector((state) => state.getAccessTokenReducer.userMediaIds);
  const posts = useSelector((state) => state.getAccessTokenReducer.posts);
  const [dataList, setDataList] = useState([]);
  const [userID, setUserID] = useState(user);

  const numColumns = 3;

  console.log(posts);
  useEffect(() => {
    dispatch(getUserProfile(access_token));
    dispatch(getUserMediaIds(access_token));
  }, [access_token]);
  useEffect(() => {
    dispatch(getPosts(data, access_token));
  }, [data]);
  let post_data = [];
  useEffect(() => {
    posts?.map((post) => {
      post_data.push({
        id: post.data.id,
        media_type: post.data.media_type,
        media_url: post.data.media_url,
        username: post.data.username,
        timestamp: post.data.timestamp,
        caption: post.data.caption,
      });
    });
    setDataList(post_data);
  }, [posts]);
  console.log("Data List => ", dataList);

  useEffect(() => {
    setUserID(user.data);
  }, [user]);
  const formatData = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - totalRows * numColumns;
    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      dataList.push({ id: "blank", empty: true });
      totalLastRow++;
    }
    return dataList;
  };

  const onPressHandler = (id, url, username, caption, time) => {
    console.log("onPress => ", id, url, username, caption, time);
  };
  const renderItem = ({ item, index }) => {
    let { itemStyle, itemText, itemInvisible } = styles;
    if (item.empty) {
      return <View style={[itemStyle, itemInvisible]} />;
    }
    return loading ? (
      <ActivityIndicator></ActivityIndicator>
    ) : (
      <View style={itemStyle}>
        <TouchableOpacity
          onPress={() => {
            onPressHandler(
              item.id,
              item.media_url,
              item.username,
              item.caption,
              item.timestamp
            );
          }}>
          <Image
            style={{ height: 400, width: 380 }}
            source={{
              uri: `${item.media_url}`,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={{ fontSize: 30, fontWeight: 900, paddingHorizontal: 10 }}>
          Instagram
        </Text>
        <Text style={{ fontSize: 25, fontWeight: 500, paddingHorizontal: 10 }}>
          {userID?.username}
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}>
            <View style={{ flexDirection: "column", color: "black" }}>
              <Text style={styles.userText}>{userID?.username}</Text>
              <Text style={styles.userText}>{userID?.id}</Text>
            </View>
          </View>
        </View>
        <FlatList
          data={formatData(dataList, numColumns)}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 100,
  },
  itemStyle: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: 400,
    width: 300,
  },
  itemText: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  userText: {
    fontSize: 30,
    fontWeight: 900,
    paddingHorizontal: 10,
  },
  header: {
    height: 70,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FAFAFA",
    border: "1px solid grey",
  },
  userInfo: {
    height: 200,
    marginBottom: 20,
    border: "1px solid grey",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
  },
});
