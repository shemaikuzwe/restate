import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-providers";
import { Redirect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import seed from "@/lib/seed";
import { StatusBar } from "expo-status-bar";

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn]);
  const handleLogin = async () => {
    const res = await login();
    if (res) {
      refetch();
    } else {
      Alert.alert("Error", "Login Failed");
    }
  };
  if (loading) return <ActivityIndicator className=" bg-primary-300" size={"large"}/>;
  return (
    <SafeAreaView className={"bg-white h-full"}>
    
      <ScrollView contentContainerClassName={"h-full pb-24"}>
     
        <Image
          source={images.onboarding}
          className={" w-full h-4/6"}
          resizeMode={"contain"}
        />
        <View className={"px-10"}>
          <Text
            className={
              "text-base text-center uppercase font-rubik text-black-200"
            }
          >
            Welcome to Restate
          </Text>
          <Text className={" text-3xl font-rubik-bold mt-2 text-center"}>
            Let's Get You close to {"\n"}
            <Text className={"text-primary-300"}>Your Dream Home</Text>
          </Text>
          <Text
            className={" text-lg font-rubik text-black-200 text-center mt-12"}
          >
            {" "}
            Login to Restate with Google
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            className={
              " bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
            }
          >
            <View className={"flex flex-row items-center justify-center"}>
              <Image
                source={icons.google}
                className={"w-5 h-5"}
                resizeMode={"contain"}
              />
              <Text className={"text-lg font-rubik-medium text-black-300 ml-2"}>
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
          <StatusBar style={"dark"} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignIn;
