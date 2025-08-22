import { Text, TouchableOpacity } from "react-native";
import React from "react";

interface TabComponentProps {
  count: number;
  title: string;
  onPress?: () => void;
}

const TabComponent = ({ count, title, onPress }: TabComponentProps) => {
  const isActive = true;

  return (
    <TouchableOpacity
      className={`flex-row items-center gap-2 py-2 px-3 rounded-full mr-2 ${
        isActive ? "bg-c-green-100" : " bg-c-neutral-300"
      }`}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text
        className={`font-plus_jakarta_sans-semibold text-base capitalize ${
          isActive ? "text-c-green-700" : "text-c-neutral-500"
        }`}
      >
        {title}
      </Text>

      <Text
        className={`font-plus_jakarta_sans-medium text-base transition-all duration-300 ${
          isActive ? "text-c-green-700" : "text-c-neutral-500"
        }`}
      >
        {count}
      </Text>
    </TouchableOpacity>
  );
};

export default TabComponent;
