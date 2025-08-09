import GoatCard from "@/components/herd/goat_card";
import Header from "@/components/herd/header";
import Badge from "@/components/ui/badge";
import { Text, View } from "react-native";

const Homepage = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-4">
        <Text className="font-plus_jakarta_sans-regular text-2xl text-green-600 mb-4 text-center">
          SemiBold Poppins
        </Text>

        <Badge healthStatus={"pregnant"} />

        <View className="bg-gray-50 w-[350px] mt-4 p-3">
          <GoatCard />
          <Header />
        </View>
      </View>
    </View>
  );
};

export default Homepage;
