import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Text,
  View,
  Image,
} from "react-native";
import { API_KEY } from "@env";

const ApiFetch = () => {
  const [posts, setPosts] = useState([]);

  function getDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return String(year) + "-" + String(month) + "-" + String(day);
  }

  useEffect(() => {
    // fetch("http://192.168.11.8/sample_apiResponse", { method: "GET" })
    const today = getDate();
    console.log("today: ", today);

    fetch(
      "https://p6sgr8twf5.execute-api.ap-northeast-1.amazonaws.com/api/v1/news/" +
        "2022-11-01",
      {
        headers: {
          "x-api-key": API_KEY,
        },
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.articles);
        console.log("data.articles.title = ", data.articles.title); //, data.articles);
      });
  }, []);

  handleOpenWithLinking = (item) => {
    Linking.openURL(item.article_url);
  };

  const renderPost = ({ item }) => {
    console.log(item);

    return (
      <View>
        <View style={styles.textView}>
          <Image
            style={styles.logo}
            source={{
              uri: item.urlToImage,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              handleOpenWithLinking(item);
            }}
          >
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
          <Text style={styles.subText}>{item.author}</Text>
        </View>
        {/* <Divider /> */}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={posts} renderItem={renderPost} />
      {/* {posts.map((post) => (
          <Text key={post.publishedAt}>{post.title}</Text>
        ))}
      </FlatList> */}
    </View>
  );
};

export default ApiFetch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  textView: {
    backgroundColor: "black",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 15,
    color: "white",
  },
  subText: {
    fontSize: 10,
    color: "lightblue",
  },
  logo: {
    width: 66,
    height: 58,
  },
});
