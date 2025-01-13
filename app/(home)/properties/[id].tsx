import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppwrite } from "@/lib/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";
import icons from "@/constants/icons";
import images from "@/constants/images";
import Comment from "@/components/comment";
const Property = () => {
  const params = useLocalSearchParams<{ id?: string }>();
  const { data, loading } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: params.id as string,
    },
  });

  if (loading)
    <ActivityIndicator className=" bg-primary-300 mt-5" size={"large"} />;

  const handleBack = () => {
    router.back();
  };
  return (
    <SafeAreaView className=" bg-white h-full">
      <ScrollView className=" mb-28">
        <Image source={{ uri: data?.image }} className="w-full h-96" />
        <TouchableOpacity
          className=" absolute top-5 left-5"
          onPress={handleBack}
        >
          <Image source={icons.backArrow} className="size-7" />
        </TouchableOpacity>
        <View className=" absolute top-5 right-5 flex flex-row gap-4">
          <Image source={icons.heart} className="size-6" />
          <Image source={icons.send} className="size-6" />
        </View>
        <View className="flex flex-col gap-2 mt-5 px-5">
          <Text className=" font-rubik-bold text-2xl ">{data?.name}</Text>
          <View className="flex flex-row justify-between ">
            <Text className="text-primary-300 font-semibold bg-primary-200 py-2 px-3   text-center rounded-3xl">
              {data?.type}
            </Text>
            <View className=" flex flex-row gap-1">
              <Image
                source={icons.star}
                resizeMode="contain"
                className=" w-8 h-5"
              />
              <Text className=" text-base font-rubik-bold text-primary-300">
                {data?.rating}
              </Text>
              <Text className=" text-base font-rubik-bold ">
                ({data?.reviews.length}) reviews
              </Text>
            </View>
          </View>
        </View>
        {/* features card */}
        <View className=" flex flex-row gap-4 px-5 mt-5">
          <View className="flex flex-row  justify-center items-center">
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-12">
              <Image source={icons.bed} className="size-4" />
            </View>
            <Text className=" font-rubik-medium">{data?.bedrooms} Beds</Text>
          </View>
          <View className="flex flex-row justify-center items-center">
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-12">
              <Image source={icons.bath} className="size-4" />
            </View>
            <Text className="  font-rubik-medium">{data?.bathrooms} Bath</Text>
          </View>
          <View className="flex flex-row justify-center items-center">
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-12">
              <Image source={icons.area} className="size-4" />
            </View>
            <Text className=" font-rubik-semi-bold">{data?.area} Sqrt</Text>
          </View>
        </View>

        {/* Agents card */}
        <View className="px-5">
          <View className="w-full border-t border-primary-200 pt-7 mt-5 ">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Agent
            </Text>

            <View className="flex flex-row items-center justify-between mt-4">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: data?.agent.avatar }}
                  className="size-14 rounded-full"
                />

                <View className="flex flex-col items-start justify-center ml-3">
                  <Text className="text-lg text-black-300 text-start font-rubik-bold">
                    {data?.agent.name}
                  </Text>
                  <Text className="text-sm text-black-200 text-start font-rubik-medium">
                    {data?.agent.email}
                  </Text>
                </View>
              </View>

              <View className="flex flex-row items-center gap-3">
                <Image source={icons.chat} className="size-7" />
                <Image source={icons.phone} className="size-7" />
              </View>
            </View>
          </View>
          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Overview
            </Text>
            <Text className="text-black-200 text-base font-rubik mt-2">
              {data?.description}
            </Text>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Facilities
            </Text>

            {data?.facilities.length > 0 && (
              <View className="flex flex-row flex-wrap items-start justify-start mt-2 gap-5">
                {data?.facilities.map((item: string, index: number) => {
                  const facility = data?.facilities.find(
                    (facility: any) => facility.title === item
                  );
                  return (
                    <View
                      key={index}
                      className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                    >
                      <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center">
                        <Image
                          source={
                            item == "Parking"
                              ? icons.carPark
                              : item == "Laundary"
                              ? icons.laundry
                              : item == "Wifi"
                              ? icons.wifi
                              : item == "Pet-friendly"
                              ? icons.dog
                              : item == "Gym"
                              ? icons.run
                              : icons.info
                          }
                          className="size-6"
                        />
                      </View>

                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-black-300 text-sm text-center font-rubik mt-1.5"
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
            {data?.gallery.length > 0 && (
              <View className="mt-7">
                <Text className="text-black-300 text-xl font-rubik-bold">
                  Gallery
                </Text>
                <FlatList
                  contentContainerStyle={{ paddingRight: 20 }}
                  data={data?.gallery}
                  keyExtractor={(item) => item.$id}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <Image
                      source={{ uri: item.image }}
                      className=" size-40 rounded-xl"
                    />
                  )}
                  horizontal
                  contentContainerClassName="flex gap-4 mt-3"
                />
              </View>
            )}
          </View>
          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Location
            </Text>
            <View className="flex flex-row items-center justify-start mt-4 gap-2">
              <Image source={icons.location} className="w-7 h-7" />
              <Text className="text-black-200 text-sm font-rubik-medium">
                {data?.address}
              </Text>
            </View>

            <Image
              source={images.map}
              className="h-52 w-full mt-5 rounded-xl"
            />
          </View>
          {data?.reviews.length > 0 && (
            <View className="mt-7">
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center">
                  <Image source={icons.star} className="size-6" />
                  <Text className="text-black-300 text-xl font-rubik-bold ml-2">
                    {data?.property?.rating} ({data?.property?.reviews.length}{" "}
                    reviews)
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text className="text-primary-300 text-base font-rubik-bold">
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-5">
                <Comment item={data?.reviews[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-black-200 text-xs font-rubik-medium">
              Price
            </Text>
            <Text
              numberOfLines={1}
              className="text-primary-300 text-start text-2xl font-rubik-bold"
            >
              ${data?.price}
            </Text>
          </View>

          <TouchableOpacity className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400">
            <Text className="text-white text-lg text-center font-rubik-bold">
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Property;
