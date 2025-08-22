import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Badge from "./badge";
import { Ionicons } from "@expo/vector-icons";

const CustomDropdown = ({
  data,
  selectedValue,
  handleSelectedValue,
}: {
  data: any;
  selectedValue: any;
  handleSelectedValue: any;
}) => {
  return (
    <Dropdown
      data={data}
      labelField="label"
      valueField="value"
      placeholder="Select health status"
      value={selectedValue}
      onChange={(item) => handleSelectedValue(item.value)}
      // Main trigger styling
      style={{
        height: 50,
        borderColor: "#f3f4f6",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: "white",
      }}
      // Dropdown container styling
      containerStyle={{
        borderRadius: 12,
        marginTop: 4,
        borderWidth: 1,
        borderColor: "#f3f4f6",
        overflow: "hidden",
        zIndex: 5,
        elevation: 5,
        padding: 4,
      }}
      // Custom render for each dropdown item
      renderItem={(item, selected) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 16,
            backgroundColor: selected ? "#f8fafc" : "transparent",
            overflow: "hidden",
          }}
        >
          <Badge healthStatus={item.value} />
          {selected && (
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color="#22c55e"
              className="ml-auto"
            />
          )}
        </View>
      )}
      // Show selected badge in trigger using renderLeftIcon
      renderLeftIcon={() => <Badge healthStatus={selectedValue} />}
      // Hide the default selected text
      selectedTextStyle={{
        fontSize: 0, // Make text invisible
        color: "transparent",
      }}
    />
  );
};
