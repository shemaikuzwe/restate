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
import { useAuth } from "@/lib/auth-providers";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import EmptyCard from "@/components/empty-card";

export default function Index() {
  const { user } = useAuth();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const { data: latestProperties, loading: latestLoading } = useAppwrite({
    fn: getLatestProperties,
  });
  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
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
            <View className=" flex flex-row items-center justify-between mt-5">
              <View className=" flex flex-row items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className=" flex flex-col items-start ml-2 justify-center">
                  <Text className=" text-xs font-rubik text-blue-100">
                    Good Morning
                  </Text>
                  <Text className=" text-base font-rubik-medium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className=" size-6" />
            </View>
            <Search />
            <View className="my-5 ">
              <View className=" flex flex-row items-center justify-between">
                <Text className=" text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className=" text-base font-rubik-bold text-primary-300">
                    see All
                  </Text>
                </TouchableOpacity>
              </View>
              {latestLoading ? (
                <ActivityIndicator
                  className=" text-primary-300"
                  size={"large"}
                />
              ) : !latestProperties || latestProperties.length == 0 ? (
                <EmptyCard />
              ) : (
                <FlatList
                  data={latestProperties || []}
                  keyExtractor={(item) => item.$id}
                  ListEmptyComponent={
                    latestLoading ? (
                      <ActivityIndicator
                        className=" text-primary-300 mt-5"
                        size={"large"}
                      />
                    ) : (
                      <EmptyCard />
                    )
                  }
                  horizontal
                  renderItem={({ item }) => (
                    <FeaturedCard
                      onPress={() => handleCardPress(item.$id)}
                      item={item}
                    />
                  )}
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-5"
                />
              )}
            </View>

            <View className="my-5 ">
              <View className=" flex flex-row items-center justify-between">
                <Text className=" text-xl font-rubik-bold text-black-300">
                  Our Recommandations
                </Text>
                <TouchableOpacity>
                  <Text className=" text-base font-rubik-bold text-primary-300">
                    see All
                  </Text>
                </TouchableOpacity>
              </View>
              <Filters />
            </View>
          </View>
        }
      />

      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
