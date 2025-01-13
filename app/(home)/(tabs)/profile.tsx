import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import SettingsItem from "@/components/settingsItem";
import { settings } from "@/constants/data";
import { useAuth } from "@/lib/auth-providers";
import { logout } from "@/lib/appwrite";

const Profile = () => {
  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result) {
        Alert.alert("success", "You have been logged out");
        refetch();
      }
    } catch (err) {
      Alert.alert("error", "An error occured while loggin out");
    }
  };
  const { user, refetch } = useAuth();
  return (
    <SafeAreaView className="h-full bg-white w-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className=" font-rubik-bold text-xl">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        <View className="flex flex-row justify-center mt-5 ">
          <View className=" flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className=" absolute bottom-11 right-2">
              <Image source={icons.edit} className=" size-8" />
            </TouchableOpacity>
            <Text className=" text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>
        <View className=" flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>
        <View className=" flex flex-col mt-5 pt-5 border-t border-primary-200">
          {settings.slice(0, 2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>
        <View className=" flex flex-col mt-5 pt-5 border-t border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-destructive"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;
