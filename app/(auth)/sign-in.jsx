import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";

const SignIn = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="my-6 h-full w-full justify-center border border-red-400 px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[35px] w-[115px]"
          />
          <Text className="mt-10 font-psemibold text-2xl text-white">
            Log in to Aora
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
