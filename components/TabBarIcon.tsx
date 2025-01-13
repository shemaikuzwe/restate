import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
interface Props {
  focused: boolean;
  icon: any;
  title: string;
}

const TabBarIcon = ({ focused, icon, title }: Props) => {
  return (
    <View className="flex-1 mt-3 flex flex-col items-center">
      <Image
        source={icon}
        tintColor={focused ? "#0061FF" : "#6666876"}
        resizeMode="contain"
        className="size-6"
      />
      <Text
        className={`${
          focused
            ? "text-primary-300 font-rubik-medium"
            : "text-black-100 font-rubik"
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );
};

export default TabBarIcon;
