import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image, Vibration } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "./context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="min-h-[85vh] w-full items-center justify-center px-4">
          <Image
            source={images.logo}
            className="h-[84px] w-[130px]"
            resizeMode="contain"
          ></Image>

          <Image
            source={images.cards}
            className="h-[300px] w-full max-w-[380px]"
            resizeMode="contain"
          ></Image>

          <View className="relative mt-5">
            <Text className="text-center font-pbold text-3xl text-white">
              Discover Endless possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="absolute -bottom-2 -right-6 h-[15px] w-[130px]"
              resizeMode="contain"
            />
          </View>
          <Text className="mt-7 text-center font-pregular text-sm text-gray-100">
            Where creativity meets innovation : embark on a journey of limitless
            exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
