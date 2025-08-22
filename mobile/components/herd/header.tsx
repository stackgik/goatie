import {
  View,
  TouchableOpacity,
  TextInput,
  LayoutChangeEvent,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomHeader from "../shared/custom_header";
import FilterTab from "../shared/filter_tab";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = ({
  onHeightChange,
}: {
  onHeightChange: (event: LayoutChangeEvent) => void;
}) => {
  return (
    <SafeAreaView
      edges={["top"]}
      onLayout={onHeightChange}
      className="bg-white gap-4 p-4 absolute top-0 left-0 right-0 pb-4 z-10"
    >
      <View className="flex-row items-center gap-4">
        <TouchableOpacity
          activeOpacity={0.7}
          className="h-[40px] aspect-square rounded-full flex items-center justify-center bg-c-neutral-300"
        >
          <Ionicons name="chevron-back" size={20} color="#6b7280" />
        </TouchableOpacity>
        <CustomHeader title="herd management" value="7 goats" />
        <TouchableOpacity
          activeOpacity={0.7}
          className="h-[40px] aspect-square rounded-full bg-c-green-600 flex items-center justify-center"
        >
          <Ionicons name="add-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center bg-transparent border border-c-neutral-300 rounded-lg p-4">
        <Ionicons name="search-outline" size={20} color="#9CA3AF" />

        <TextInput
          className="rounded-lg px-3 text-[16px] text-c-neutral-600 font-plus_jakarta_sans-medium flex-1"
          placeholder="Search goats..."
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
      </View>

      <FilterTab />
    </SafeAreaView>
  );
};

export default Header;
