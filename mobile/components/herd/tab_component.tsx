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
      className={`flex-row items-center gap-2 py-2 px-3 rounded-full mr-2 border ${
        isActive
          ? "bg-c-green-600 border-c-green-600"
          : " border-c-neutral-300 bg-transparent"
      }`}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text
        className={`font-plus_jakarta_sans-medium text-xs capitalize ${
          isActive ? "text-white" : "text-c-neutral-600"
        }`}
      >
        {title}
      </Text>

      <Text
        className={`font-plus_jakarta_sans-semibold text-[11px]  h-4 min-w-6 flex rounded-full items-center justify-center text-c-neutral-800 transition-all duration-300 ${
          isActive ? "bg-white" : "bg-c-neutral-100"
        }`}
      >
        {count}
      </Text>
    </TouchableOpacity>
  );
};

export default TabComponent;
