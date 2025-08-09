import { View, Text } from "react-native";
import React from "react";

const CustomHeader = ({ title, value }: { title: string; value: string }) => {
  return (
    <View className="gap-.5 flex-1">
      <Text
        className="font-poppins-regular text-[22px] text-c-neutral-900 capitalize"
        numberOfLines={1}
      >
        {title}
      </Text>
      <Text className="font-plus_jakarta_sans-regular text-sm text-c-neutral-600">
        {value}
      </Text>
    </View>
  );
};

export default CustomHeader;
