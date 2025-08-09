import { View, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomHeader from "../shared/custom_header";
import FilterTab from "../shared/filter_tab";

const Header = () => {
  return (
    // The header wrapper
    <View className="bg-white gap-4 p-4">
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

      <View>
        <TextInput
          className="rounded-lg px-3 py-2 text-sm text-c-neutral-800 bg-transparent border border-c-neutral-300"
          placeholder="Search goats..."
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <FilterTab />
    </View>
  );
};

export default Header;
