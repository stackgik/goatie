import { View, LayoutChangeEvent, FlatList } from "react-native";
import React, { useState } from "react";
import Header from "@/components/herd/header";
import { mockGoats } from "@/data/mock/goat_profile.mock";
import GoatCard from "@/components/herd/goat_card";

const Herd = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  const handleHeaderLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  };

  return (
    <View className="flex-1 bg-[#f3f3f3]">
      <Header onHeightChange={handleHeaderLayout} />

      <FlatList
        ListHeaderComponent={<View style={{ height: headerHeight }} />}
        data={mockGoats}
        keyExtractor={(item) => item.goatId}
        renderItem={({ item }) => <GoatCard goat={item} />}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingBlock: 20,
        }}
      />
    </View>
  );
};

export default Herd;
