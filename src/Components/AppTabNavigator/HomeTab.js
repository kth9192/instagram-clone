import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Container, Content, Icon } from "native-base";
import CardComponent from "../CardComponent";

class HomeTab extends Component {
  state = {
    feeds: []
  };

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ color: tintColor }} />
    )
  };

  fetchFeeds() {
    const data = {
      id: 1,
      jsonrpc: "2.0",
      method: "call",
      params: [
        "database_api",
        "get_discussions_by_created",
        [{ tag: "kr", limit: 20 }]
      ]
    };
    const res = fetch("https://api.steemit.com", {
      method: "POST",
      body: JSON.stringify(data)
    });
    return fetch("https://api.steemit.com", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res.result);
  }

  componentWillMount() {
    this.fetchFeeds().then(feeds => {
      this.setState({
        feeds
      });
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          {this.state.feeds.map(feed => (
            <CardComponent key={feed.post_id} data={feed} />
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
  }
});

export default HomeTab;
