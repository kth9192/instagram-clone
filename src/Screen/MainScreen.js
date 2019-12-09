import React, { Component } from "react";
import { StyleSheet, Platform, Text } from "react-native";
import { View, Icon } from "native-base";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import HomeTab from "../Components/AppTabNavigator/HomeTab";
import SearchTab from "../Components/AppTabNavigator/SearchTab";
import AddMediaTab from "../Components/AppTabNavigator/AddMediaTab";
import LikesTab from "../Components/AppTabNavigator/LikesTab";
import ProfileTab from "../Components/AppTabNavigator/ProfileTab";

const AppTabNavigator = createMaterialTopTabNavigator(
  {
    HomeTab: { screen: HomeTab },
    SearchTab: { screen: SearchTab },
    AddMediaTab: { screen: AddMediaTab },
    LikesTab: { screen: LikesTab },
    ProfileTab: { screen: ProfileTab }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        backgroundColor: "white"
      },
      activeTintColor: "#000",
      inactiveTintColor: "#d1cece",
      upperCaseLabel: false,
      showLabel: false,
      showIcon: true
    }
  }
);
const AppTabContainet = createAppContainer(AppTabNavigator);

class MainScreen extends Component {
  static navigationOptions = {
    header: null
    // headerLeft: <Icon name="ios-camera" style={{ paddingLeft: 10 }} />,
    // headerTitle: (
    //   <View style={{ flex: 1, alignItems: "center" }}>
    //     <Text style={{ fontWeight: "bold" }}>Instagram</Text>
    //   </View>
    // ),
    // headerRight: <Icon name="ios-send" style={{ paddingRight: 10 }} />
  };

  render() {
    return <AppTabContainet />;
  }
}

const stlyes = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default MainScreen;
