import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { GoatProps } from "@/types";

const ArchiveGoat = ({ selectedGoat }: { selectedGoat: GoatProps }) => {
  return (
    <View className="p-4">
      <Text className="text-xl font-bold mb-4">
        📦 Archive {selectedGoat.goatName}?
      </Text>
      <Text className="text-gray-600 mb-6">
        This will move {selectedGoat.goatName} to the archived goats list.
      </Text>
      <View className="flex-row space-x-3">
        <TouchableOpacity className="bg-gray-300 p-3 rounded flex-1">
          <Text className="text-center font-bold">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-500 p-3 rounded flex-1">
          <Text className="text-white text-center font-bold">Archive</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArchiveGoat;
