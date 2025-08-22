import { View, Text } from "react-native";
import React from "react";
import { GoatProps } from "@/types";

const CheckGoatHealth = ({ selectedGoat }: { selectedGoat: GoatProps }) => {
  return (
    <View className="p-4">
      <Text className="text-xl font-bold mb-4">
        🏥 {selectedGoat.goatName} - Health
      </Text>
      <Text className="mb-2">
        Status:{" "}
        <Text className="font-semibold">{selectedGoat.healthStatus}</Text>
      </Text>
      <Text className="mb-2">
        Weight: <Text className="font-semibold">{selectedGoat.weight} lbs</Text>
      </Text>
      <Text className="mb-2">
        Last Check:{" "}
        <Text className="font-semibold">{selectedGoat.lastHealthCheck}</Text>
      </Text>

      {selectedGoat.healthIssues.length > 0 && (
        <View className="mt-3">
          <Text className="font-bold mb-1">Health Issues:</Text>
          {selectedGoat.healthIssues.map((issue, index) => (
            <Text key={index} className="text-red-600">
              • {issue}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default CheckGoatHealth;
