import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import Badge from "../ui/badge";

const cardData = [
  { id: 1, iconName: "barbell-outline", value: "155 lbs", title: "Weight" },
  {
    id: 2,
    iconName: "heart-outline",
    value: "Oct 22",
    title: "last check",
  },
  {
    id: 3,
    iconName: "calendar-outline",
    value: "2",
    title: "treatments",
  },
];

const GoatCard = () => {
  return (
    <View className="bg-white rounded-[20px] p-4 gap-6">
      {/* Top row */}
      <View className="flex-row justify-between">
        <View className="flex-row gap-2 items-center">
          <View className="w-[80px] aspect-square rounded-lg overflow-hidden">
            <Image
              source={require("@/assets/images/splash.jpg")}
              alt="goat image"
              resizeMode="cover"
              className="w-full h-full"
            />
          </View>

          <View className="gap-1">
            <Text className="font-plus_jakarta_sans-regular text-c-neutral-600 font-bold text-[16px]">
              Bella
            </Text>

            <Text className="font-plus_jakarta_sans-regular text-c-neutral-500 font-semibold text-[12px]">
              Doe . 3yrs 8mo
            </Text>

            <Badge healthStatus={"pregnant"} />
          </View>
        </View>

        <TouchableOpacity className="relative" activeOpacity={0.7}>
          <Ionicons name="ellipsis-vertical" size={20} color="#4b5563" />
        </TouchableOpacity>
      </View>

      {/* Middle row */}
      <View className="flex-row justify-between items-center">
        {cardData.map((el) => (
          <View className="gap-1 items-center" key={el.id}>
            <Ionicons name={el.iconName as any} size={20} color="#9ca3af" />

            <Text className="font-plus_jakarta_sans-regular text-c-neutral-600 font-bold text-[14px">
              {el.value}
            </Text>

            <Text className="font-plus_jakarta_sans-regular text-c-neutral-400 font-bold text-[12px] capitalize">
              {el.title}
            </Text>
          </View>
        ))}
      </View>

      {/* Action button */}
      <TouchableOpacity
        className=" py-3 rounded-md bg-c-green-600"
        activeOpacity={0.6}
      >
        <Text className="text-c-green-400 font-plus_jakarta_sans-semibold font-bold capitalize text-center">
          view details
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoatCard;
