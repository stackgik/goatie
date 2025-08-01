// hooks/useFonts.js
import { useFonts } from "expo-font";

const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "PlusJakartaSans-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
  });

  return fontsLoaded;
};

export default useCustomFonts;
