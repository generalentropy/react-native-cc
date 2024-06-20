import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const screenOptions = { headerShown: false };

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={screenOptions} />
        <Stack.Screen name="sign-up" options={screenOptions} />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
