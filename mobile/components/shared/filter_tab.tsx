import { FlatList } from "react-native";
import React from "react";
import {
  criticalGoats,
  healthyGoats,
  mockGoats,
  pregnantGoats,
  sickGoats,
} from "@/data/mock/goat_profile.mock";
import TabComponent from "../herd/tab_component";

const filterTabConfig = [
  {
    title: "all",
    count: mockGoats.length,
  },
  {
    title: "healthy",
    count: healthyGoats.length,
  },
  {
    title: "sick",
    count: sickGoats.length,
  },
  {
    title: "pregnant",
    count: pregnantGoats.length,
  },
  {
    title: "needs attention",
    count: criticalGoats.length,
  },
];

const FilterTab = () => {
  return (
    <FlatList
      data={filterTabConfig}
      renderItem={({ item }) => (
        <TabComponent count={item.count} title={item.title} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.title}
    />
  );
};

export default FilterTab;
