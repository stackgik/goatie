import { Dropdown } from "react-native-element-dropdown";
import {
  Text,
  View,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { HealthStatus } from "@/types";
import Badge from "../ui/badge";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";

import { useForm, Controller } from "react-hook-form";
import { GoatFormData, goatSchema } from "@/lib/zod/goat_schema";
import * as ImagePicker from "expo-image-picker";

const EditGoat = () => {
  const [selectedStatus, setSelectedStatus] = useState<HealthStatus>("healthy");

  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  // Dropdown data
  const genderData = [
    { label: "Buck", value: "buck" },
    { label: "Doe", value: "doe" },
  ];

  const healthStatusData = [
    { label: "Healthy", value: "healthy" },
    { label: "Sick", value: "sick" },
    { label: "Pregnant", value: "pregnant" },
    { label: "Needs Attention", value: "needs attention" },
  ];

  const conditionData = [
    { label: "Excellent", value: "excellent" },
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GoatFormData>({
    resolver: zodResolver(goatSchema),
    defaultValues: {
      name: "",
      gender: undefined,
      birthDate: "",
      weight: "",
      healthStatus: "healthy",
      condition: "good",
      purchasePrice: "",
      purchaseDate: "",
      notes: "",
    },
  });

  const onSubmit = (data: GoatFormData) => {
    const formData = { ...data, avatar: avatarUri };
    console.log("Form Data:", formData);
    Alert.alert(
      "Form Submitted",
      `Goat: ${data.name}\nGender: ${data.gender}\nBirth Date: ${data.birthDate}`,
      [{ text: "OK", onPress: () => reset() }]
    );
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission denied",
        "You need to enable camera roll permissions to select an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission denied",
        "You need to enable camera permissions to take a photo."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const showImagePicker = () => {
    Alert.alert(
      "Select Image",
      "Choose an option",
      [
        { text: "Camera", onPress: takePhoto },
        { text: "Gallery", onPress: pickImage },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const renderError = (error: any) => {
    if (error) {
      return <Text className="text-red-500 text-sm mt-1">{error.message}</Text>;
    }
    return null;
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <ScrollView className="p-5">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-8">
          Edit Goat Information
        </Text>

        {/* Avatar Section */}
        <View className="items-center mb-8">
          <TouchableOpacity onPress={showImagePicker} className="relative">
            <View className="w-32 h-32 rounded-full bg-gray-200 border-4 border-blue-500 items-center justify-center overflow-hidden">
              {avatarUri ? (
                <Image
                  source={{ uri: avatarUri }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <Ionicons name="camera" size={40} color="#6B7280" />
              )}
            </View>
            <View className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full w-10 h-10 items-center justify-center border-2 border-white">
              <Ionicons name="pencil" size={16} color="white" />
            </View>
          </TouchableOpacity>
          <Text className="text-gray-600 mt-2 text-center">
            Tap to {avatarUri ? "change" : "add"} goat photo
          </Text>
        </View>

        {/* Name Input */}
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-700 mb-2">
            Name *
          </Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`h-12 border rounded-lg px-4 text-base bg-white ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter goat's name"
                placeholderTextColor="#9CA3AF"
              />
            )}
          />
          {renderError(errors.name)}
        </View>

        {/* Gender Dropdown */}
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-700 mb-2">
            Gender *
          </Text>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                className={`h-12 border rounded-lg px-4 bg-white ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                }`}
                placeholderStyle={{ fontSize: 16, color: "#9CA3AF" }}
                selectedTextStyle={{ fontSize: 16, color: "#374151" }}
                data={genderData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select gender"
                value={value}
                onChange={(item) => onChange(item.value)}
                renderLeftIcon={() => (
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#6B7280"
                    style={{ marginRight: 10 }}
                  />
                )}
              />
            )}
          />
          {renderError(errors.gender)}
        </View>

        {/* Birth Date Input */}
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-700 mb-2">
            Birth Date * (YYYY-MM-DD)
          </Text>
          <Controller
            control={control}
            name="birthDate"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`h-12 border rounded-lg px-4 text-base bg-white ${
                  errors.birthDate ? "border-red-500" : "border-gray-300"
                }`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="2024-01-15"
                placeholderTextColor="#9CA3AF"
              />
            )}
          />
          {renderError(errors.birthDate)}
        </View>

        {/* Weight Input */}
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-700 mb-2">
            Weight (kg)
          </Text>
          <Controller
            control={control}
            name="weight"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`h-12 border rounded-lg px-4 text-base bg-white ${
                  errors.weight ? "border-red-500" : "border-gray-300"
                }`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter weight"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            )}
          />
          {renderError(errors.weight)}
        </View>

        {/* Health Status Dropdown */}
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-700 mb-2">
            Health Status
          </Text>
          <Controller
            control={control}
            name="healthStatus"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                className="h-12 border border-gray-300 rounded-lg px-4 bg-white"
                placeholderStyle={{ fontSize: 16, color: "#9CA3AF" }}
                selectedTextStyle={{ fontSize: 16, color: "#374151" }}
                data={healthStatusData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select health status"
                value={value}
                onChange={(item) => onChange(item.value)}
                renderLeftIcon={() => (
                  <Ionicons
                    name="medical-outline"
                    size={20}
                    color="#6B7280"
                    style={{ marginRight: 10 }}
                  />
                )}
              />
            )}
          />
        </View>

        {/* Condition Dropdown */}
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-700 mb-2">
            Condition
          </Text>
          <Controller
            control={control}
            name="condition"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                className="h-12 border border-gray-300 rounded-lg px-4 bg-white"
                placeholderStyle={{ fontSize: 16, color: "#9CA3AF" }}
                selectedTextStyle={{ fontSize: 16, color: "#374151" }}
                data={conditionData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select condition"
                value={value}
                onChange={(item) => onChange(item.value)}
                renderLeftIcon={() => (
                  <Ionicons
                    name="fitness-outline"
                    size={20}
                    color="#6B7280"
                    style={{ marginRight: 10 }}
                  />
                )}
              />
            )}
          />
        </View>

        {/* Purchase Price Input */}
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-700 mb-2">
            Purchase Price
          </Text>
          <Controller
            control={control}
            name="purchasePrice"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`h-12 border rounded-lg px-4 text-base bg-white ${
                  errors.purchasePrice ? "border-red-500" : "border-gray-300"
                }`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter purchase price"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            )}
          />
          {renderError(errors.purchasePrice)}
        </View>

        {/* Purchase Date Input */}
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-700 mb-2">
            Purchase Date (YYYY-MM-DD)
          </Text>
          <Controller
            control={control}
            name="purchaseDate"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`h-12 border rounded-lg px-4 text-base bg-white ${
                  errors.purchaseDate ? "border-red-500" : "border-gray-300"
                }`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="2024-01-15"
                placeholderTextColor="#9CA3AF"
              />
            )}
          />
          {renderError(errors.purchaseDate)}
        </View>

        {/* Notes Input */}
        <View className="mb-8">
          <Text className="text-base font-semibold text-gray-700 mb-2">
            Notes
          </Text>
          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="h-24 border border-gray-300 rounded-lg px-4 pt-3 text-base bg-white"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Additional notes about the goat..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            )}
          />
        </View>

        {/* Action Buttons */}
        <View className="space-y-3">
          <TouchableOpacity
            className="bg-blue-500 h-12 rounded-lg items-center justify-center"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white text-lg font-semibold">
              Save Changes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-transparent border border-blue-500 h-12 rounded-lg items-center justify-center"
            onPress={() => {
              reset();
              setAvatarUri(null);
            }}
          >
            <Text className="text-blue-500 text-base font-semibold">
              Reset Form
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default EditGoat;
