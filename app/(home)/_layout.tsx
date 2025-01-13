import { ActivityIndicator } from "react-native";
import React from "react";
import { useAuth } from "@/lib/auth-providers";
import {Redirect, Slot} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

const AppLayout = () => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) {
    return (
      <SafeAreaView className={"bg-white flex justify-center items-center h-full"}>
        <ActivityIndicator className={"text-primary-300"} size={"large"} />
      </SafeAreaView>
    );
  }
   if (!isLoggedIn) return <Redirect href={"/sign-in"} />;

  return  <Slot/>
};
export default AppLayout;
