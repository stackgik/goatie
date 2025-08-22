import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native";
import { useCallback, useMemo } from "react";
import { useCustomBottomSheet } from "@/hooks/useBottomSheet";

const CustomBottomSheet = () => {
  const { isOpen, closeBottomSheet, content } = useCustomBottomSheet();
  const snapPoints = useMemo(() => ["50%", "85%"], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        closeBottomSheet();
      }
    },
    [closeBottomSheet]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <GestureHandlerRootView className="bg-gray-900/50 flex-1 justify-between items-center absolute top-0 right-0 left-0 bottom-0 z-50">
      <Text>BottomSheet Texting microphone!!🎙️</Text>
      <BottomSheet
        snapPoints={snapPoints}
        index={1}
        onChange={handleSheetChanges}
        enablePanDownToClose
        enableContentPanningGesture={false}
        handleIndicatorStyle={{
          backgroundColor: "#dee2e6",
          width: 40,
        }}
      >
        <BottomSheetScrollView className="flex-1 ">
          {content}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default CustomBottomSheet;
