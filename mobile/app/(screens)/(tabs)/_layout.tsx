import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "./home";
import Herd from "./herd";
import Sales from "./sales";
import UserProfile from "./user_profile";
import VisitSchedule from "./visit_schedule";
import Expenses from "./expenses";

const TabLayout = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "herd") {
            iconName = focused ? "fish" : "fish-outline";
          } else if (route.name === "sales") {
            iconName = focused ? "trending-up" : "trending-up-outline";
          } else if (route.name === "expenses") {
            iconName = focused ? "wallet" : "wallet-outline";
          } else if (route.name === "visit_schedule") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "user_profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName as any} size={20} color={color} />;
        },
        tabBarActiveTintColor: "#16a34a",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#f1f5f9",
          borderTopWidth: 1,
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={Homepage}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="herd"
        component={Herd}
        options={{ tabBarLabel: "Herd" }}
      />
      <Tab.Screen
        name="sales"
        component={Sales}
        options={{ tabBarLabel: "Sales" }}
      />
      <Tab.Screen
        name="visit_schedule"
        component={VisitSchedule}
        options={{ tabBarLabel: "Schedule" }}
      />
      <Tab.Screen
        name="expenses"
        component={Expenses}
        options={{ tabBarLabel: "Expenses" }}
      />
      <Tab.Screen
        name="user_profile"
        component={UserProfile}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
};

export default TabLayout;
