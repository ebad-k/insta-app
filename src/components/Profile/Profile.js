import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [caption, setCaption] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [timestamp, setTimeStamp] = useState("");
  const numColumns = 3;

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
            setId(item.id);
            setCaption(item.caption);
            setMediaUrl(item.media_url);
            setTimeStamp(item.timestamp);
            setUsername(item.username);
            setModalVisible(true);
          }}
        >
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
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View>
                  <Image
                    style={{ height: 400, width: 380 }}
                    source={{
                      uri: `${mediaUrl}`,
                    }}
                  />
                </View>
                <View style={{ flexDirection: "column", paddingLeft: 20 }}>
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: 600,
                      marginBottom: 30,
                    }}
                  >
                    {username}
                  </Text>
                  <Text style={{ fontWeight: 600 }}>Caption : {caption}</Text>
                  <Text style={{ fontWeight: 600 }}>Media ID : {id}</Text>
                  <Text style={{ fontWeight: 600 }}>
                    Timestamp: {timestamp}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 10, marginLeft: "90%" }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}> Close </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
            }}
          >
            <Text
              style={{ fontSize: 30, fontWeight: 900, fontFamily: "verdana" }}
            >
              Welcome to your Instagram account
            </Text>
            <View style={{ flexDirection: "column", color: "black" }}>
              <Text style={styles.userText}>Username : {userID?.username}</Text>
              <Text style={styles.userText}>User ID : {userID?.id}</Text>
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
    color: "#ffffff",
    fontSize: 30,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  userText: {
    fontSize: 25,
    fontFamily: "verdana",
    fontWeight: 500,
    paddingHorizontal: 10,
  },

  header: {
    height: 70,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#d9d9d9",
    border: "1px solid grey",
  },
  userInfo: {
    height: 200,
    marginBottom: 20,
    border: "1px solid grey",
    justifyContent: "center",
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 700,
    height: 500,
    margin: 20,
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
