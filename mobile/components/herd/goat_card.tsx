import { View, Text, TouchableOpacity, Image } from "react-native";
import Badge from "../ui/badge";
import { ActionTypes, GoatProps } from "@/types";
import ActionButton from "./actions";
import { Ionicons } from "@expo/vector-icons";
import { actionButtonsConfig } from "@/data/mock/goat_profile.mock";

const GoatCard = ({ goat }: { goat: GoatProps }) => {
  const {
    goatName,
    gender,
    goatAge,
    weight,
    lastHealthCheck,
    healthStatus,
    notes,
  } = goat || {};

  return (
    <TouchableOpacity
      className="bg-white rounded-[20px] p-4 gap-6"
      onPress={() => {}}
      activeOpacity={0.7}
    >
      <View className="flex-row">
        {/* The Goat Image container */}
        <View className="w-[60px] aspect-square rounded-lg overflow-hidden">
          <Image
            source={require("@/assets/images/splash.jpg")}
            alt="goat image"
            resizeMode="cover"
            className="w-full h-full"
          />
        </View>

        {/* The Goat Brief Details Container  */}
        <View className="flex-1 ml-4 gap-2">
          {/* The first Row */}
          <View className="flex-row items-center justify-between">
            <Text className="font-plus_jakarta_sans-bold text-c-neutral-600 font-bold text-[16px]">
              {goatName}
            </Text>

            <Badge healthStatus={healthStatus} />
          </View>

          {/* The Second Row */}
          <Text className="font-plus_jakarta_sans-semibold text-c-neutral-500 text-[12px]">
            {`${gender.charAt(0).toUpperCase() + gender.slice(1)} · ${goatAge}${goatAge > 1 ? "yrs" : "yr"} · ${weight}lbs`}
          </Text>

          {/* The Third Row */}
          <Text className="font-plus_jakarta_sans-regular text-c-neutral-500 font-semibold text-base">
            {notes}
          </Text>

          {/* The Fourth Row */}
          <Text className="font-plus_jakarta_sans-regular text-c-neutral-500 font-semibold text-[12px]">{`Last Check: ${lastHealthCheck}`}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center gap-3">
        {actionButtonsConfig.map(
          ({
            id,
            textColor,
            bgColor,
            title,
            iconName,
            iconColor,
            actionType,
          }) => (
            <ActionButton
              key={id}
              textColor={textColor}
              bgColor={bgColor}
              title={title}
              iconName={iconName as keyof typeof Ionicons.glyphMap}
              iconColor={iconColor}
              actionType={actionType as ActionTypes}
              selectedGoat={goat}
            />
          )
        )}
      </View>
    </TouchableOpacity>
  );
};

export default GoatCard;
