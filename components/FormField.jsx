import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

const FormField = ({
  title,
  value,
  placeholder,
  otherStyles,
  handleChangeText,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="font-pmedium text-base text-gray-100">{title}</Text>
      <View className="h-16 w-full rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary">
        <TextInput
          className="flex-1 text-center font-psemibold text-base text-white"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
      </View>
    </View>
  );
};

export default FormField;
