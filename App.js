import React, { Component } from "react";
import { Stylesheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MainScreen from "./src/Screen/MainScreen";

const AppStackNavigator = createStackNavigator({
  Home: {
    screen: MainScreen
  }
});

export default createAppContainer(AppStackNavigator);
