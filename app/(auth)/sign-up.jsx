import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      return Alert.alert("Error", "Please, fill all the fields");
    }
    setIsSubmitting(true);

    try {
      const result = await createUser(form);
      setUser(result);
      setIsLoggedIn(true);
      // set it to global state...
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full border bg-primary">
      <ScrollView>
        <View className="my-6 min-h-[90vh] w-full justify-center px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[35px] w-[115px]"
          />
          <Text className="mt-10 font-psemibold text-2xl text-white">
            Sign up
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={handleSubmit}
            containerStyles={`mt-7`}
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="font-pregular text-lg text-gray-100">
              Have an account already?{" "}
              <Link
                className="font-psemibold text-lg text-secondary-100"
                href="/sign-in"
              >
                Sign in{" "}
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
