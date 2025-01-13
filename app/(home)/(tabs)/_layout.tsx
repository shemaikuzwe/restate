import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabBarIcon from "@/components/TabBarIcon";
import icons from "@/constants/icons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name={"index"}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Home" icon={icons.home} />
          ),
        }}
      />
       <Tabs.Screen
        name={"explore"}
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Explore" icon={icons.search} />
          ),
        }}
      />
       <Tabs.Screen
        name={"profile"}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Profile" icon={icons.person} />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
