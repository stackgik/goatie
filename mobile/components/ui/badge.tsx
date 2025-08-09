import { View, Text } from "react-native";
import React from "react";

// Define the health status type explicitly
type HealthStatus = "healthy" | "sick" | "pregnant" | "needs attention";
type StatusProperties = {
  color: string;
  text: string;
  bgColor: string;
};

// Type the configuration object properly
const herdBadgeConfig: Record<HealthStatus, StatusProperties> = {
  healthy: {
    color: "text-c-green-800",
    text: "healthy",
    bgColor: "bg-c-green-400",
  },
  sick: {
    color: "text-c-red-800",
    text: "sick",
    bgColor: "bg-c-red-300",
  },
  pregnant: {
    color: "text-c-indigo-800",
    text: "pregnant",
    bgColor: "bg-c-indigo-400",
  },
  "needs attention": {
    color: "text-c-yellow-700",
    text: "needs attention",
    bgColor: "bg-c-yellow-400",
  },
};

// Properly type the props interface
interface BadgeProps {
  healthStatus: HealthStatus;
}

const Badge = ({ healthStatus }: BadgeProps) => {
  // Type guard to check if healthStatus exists in config
  if (!(healthStatus in herdBadgeConfig)) {
    console.warn(`Invalid health status: ${healthStatus}`);
    return null;
  }

  const config = herdBadgeConfig[healthStatus];

  return (
    <View className={`${config.bgColor} px-4 py-1 rounded-lg`}>
      <Text className={`${config.color} text-[12px] font-semibold capitalize`}>
        {config.text}
      </Text>
    </View>
  );
};

export default Badge;
