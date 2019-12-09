import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  Container,
  Content,
  Icon,
  Thumbnail,
  Header,
  Left,
  Right,
  Body
} from "native-base";
import CardComponent from "../CardComponent";

class HomeTab extends Component {
  state = {
    feeds: [],
    followings: []
  };

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ color: tintColor }} />
    )
  };

  async fetchFeeds() {
    const data = {
      id: 1,
      jsonrpc: "2.0",
      method: "call",
      params: [
        "database_api",
        "get_discussions_by_created",
        [{ tag: "kr", limit: 10 }]
      ]
    };

    const res_1 = await fetch("https://api.steemit.com", {
      method: "POST",
      body: JSON.stringify(data)
    });
    const res_2 = await res_1.json();
    return res_2.result;
  }

  fetchFollowing() {
    const data = {
      id: 2,
      jsonrpc: "2.0",
      method: "call",
      params: ["follow_api", "get_following", ["anpigon", "", "blog", 10]]
    };

    return fetch("https://api.steemit.com", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res.result.map(({ following }) => following));
  }

  componentWillMount() {
    this.fetchFeeds().then(feeds => {
      this.setState({
        feeds
      });
    });

    this.fetchFollowing().then(followings => {
      this.setState({
        followings
      });
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Icon name="ios-camera" style={{ paddingStart: 10 }} />
          </Left>
          <Body style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>Instagram</Text>
          </Body>
          <Right>
            <Icon name="ios-send" style={{ paddingEnd: 10 }} />
          </Right>
        </Header>
        <Content>
          <View style={{ height: 100 }}>
            <View style={styles.storyHeader}>
              <Text style={{ fontWeight: "bold" }}>Stroies</Text>
              <View style={styles.playerHeader}>
                <Icon name="md-play" style={{ fontSize: 14 }}></Icon>
                <Text style={{ fontWeight: "bold" }}> Watch All</Text>
              </View>
            </View>

            <View style={{ flex: 3 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: "center",
                  paddingStart: 5,
                  paddingEnd: 5
                }}
              >
                {this.state.followings.map(following => (
                  <Thumbnail
                    style={styles.thumbnail}
                    key={following}
                    source={{
                      uri: `https://steemitimages.com/u/${following}/avatar`
                    }}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
          {this.state.feeds.map(feed => (
            <CardComponent key={feed.url} data={feed} />
          ))}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: { width: "100%", backgroundColor: "#fff" },
  storyHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 7
  },
  playerHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  thumbnail: {
    marginHorizontal: 5,
    borderColor: "pink",
    borderWidth: 2
  }
});

export default HomeTab;
