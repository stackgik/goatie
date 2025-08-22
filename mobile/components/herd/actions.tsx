import { useCustomBottomSheet } from "@/hooks/useBottomSheet";
import { ActionButtonProps, ActionTypes, GoatProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";
import EditGoat from "./edit_goat";
import ArchiveGoat from "./archive_goat";
import CheckGoatHealth from "./check_goat_health";

//prettier-ignore
const ActionButton = ({ textColor, bgColor, title, iconName, iconColor, actionType, selectedGoat }: ActionButtonProps) => {
  const { openBottomSheet } = useCustomBottomSheet();
  const handleActionPress = ( actionType: ActionTypes, selectedGoat: GoatProps ) => {
    switch (actionType) {
      case "health":
        openBottomSheet(
         <CheckGoatHealth selectedGoat={selectedGoat} />
        );
        break;

      case "edit":
        openBottomSheet(
          <EditGoat selectedGoat={selectedGoat} />
        );
        break;

      case "archive":
        openBottomSheet(
          <ArchiveGoat selectedGoat={selectedGoat} />
        );
        break;
    }
  };
  return (
    <TouchableOpacity
      className={`py-3 flex-1 rounded-md font-plus_jakarta_sans-medium text-md ${textColor} ${bgColor} items-center flex-row gap-2 justify-center `}
      activeOpacity={0.7}
      onPress={() => handleActionPress(actionType, selectedGoat)}
    >
      <Ionicons name={iconName} size={20} color={iconColor} />
      <Text
        className={`${textColor} font-plus_jakarta_sans-semibold tracking-wide capitalize`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
