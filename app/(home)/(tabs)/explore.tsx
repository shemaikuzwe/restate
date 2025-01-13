import React from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/search";
import { Card, FeaturedCard } from "@/components/cards";
import Filters from "@/components/filters";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import EmptyCard from "@/components/empty-card";

const Explore = () => {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    },
    skip: true,
  });
  useEffect(() => {
    refetch({ filter: params.filter!, query: params.query!, limit: 6 });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };
  return (
    <SafeAreaView className=" bg-white">
      {/* <ScrollView showsVerticalScrollIndicator={false} className=" h-full"> */}
      <FlatList
        data={properties || []}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName=" pb-32"
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              className=" text-primary-300 mt-2"
              size={"large"}
            />
          ) : (
            <EmptyCard />
          )
        }
        showsVerticalScrollIndicator={false}
        columnWrapperClassName="flex gap-5 px-5"
        ListHeaderComponent={
          <View className="px-5">
            <View className=" flex flex-row justify-between items-center mt-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className=" flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} />
              </TouchableOpacity>
              <Text className=" text-base mr-2 font-rubik-medium text-black-300">
                Search for your ideal home
              </Text>
              <Image source={icons.bell} className="w-6 h-6" />
            </View>
            <Search />
            <View className="mt-5 ">
              <Filters />
              <Text className=" text-xl font-rubik-bold to-black-300 mt-5">
                Found {properties?.length}
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};
export default Explore;
