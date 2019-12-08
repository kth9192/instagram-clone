import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import {
  Card,
  CardItem,
  Thumbnail,
  Body,
  Left,
  Right,
  Button,
  Icon
} from "native-base";

class CardComponent extends Component {
  render() {
    const { data } = this.props;
    const { image } = JSON.parse(data.json_metadata);

    return (
      <Card style={styles.card}>
        <CardItem>
          <Left>
            <Thumbnail
              source={{
                uri: `https://steemitimages.com/u/${data.author}/avatar`
              }}
            />
            <Body>
              <Text>{data.author}</Text>
              <Text note>{new Date(data.created).toDateString()}</Text>
            </Body>
          </Left>
        </CardItem>
        {image && image.length ? (
          <CardItem cardBody>
            <Image
              source={{
                uri: image[0]
              }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
        ) : null}
        <CardItem style={styles.likes}>
          <Text>{`${data.active_votes.length} likes`}</Text>
        </CardItem>
        <CardItem>
          <Text style={{ fontWeight: "900" }}>{data.title}</Text>
        </CardItem>
        <CardItem>
          <Text>
            {data.body.replace(/\n/g, " ").slice(0, 200)}
            {data.body.replace(/\n/g, " ").length > 200 ? "..." : null}
          </Text>
        </CardItem>
        <CardItem style={{ height: 45 }}>
          <Left>
            <Button transparent>
              <Icon name="ios-heart" style={styles.icon} />
              <Text>{data.active_votes.length}</Text>
            </Button>
            <Button transparent>
              <Icon name="ios-chatbubbles" style={styles.icon} />
              <Text>{data.children}</Text>
            </Button>
            <Button transparent>
              <Icon name="ios-send" style={styles.icon} />
            </Button>
          </Left>
          <Right>
            <Text>{data.pending_payout_value}</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    color: "black"
  },
  card: {
    width: "100%",
    margin: 10
  },
  likes: {
    height: 20,
    margin: 5
  }
});
export default CardComponent;
