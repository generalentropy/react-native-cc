import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useGlobalContext();
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "image/jpeg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image")
        setForm({ ...form, thumbnail: result.assets[0] });
      if (selectType === "video") setForm({ ...form, video: result.assets[0] });
    }
  };

  const handleSubmit = async () => {
    if (!form.prompt || !form.video || !form.thumbnail)
      return Alert.alert("Please fill in all the fields");

    setUploading(true);

    try {
      await createVideo({ ...form, userId: user.$id });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({ title: "", video: null, thumbnail: null, prompt: "" });
    }
    setUploading(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="my-6 px-4">
        <Text className="font-psemibold text-2xl text-white">Upload video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catch title!"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="font-pmedium text-base text-gray-100">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="h-64 w-full rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="h-40 w-full items-center justify-center rounded-2xl bg-black-100">
                <View className="h-14 w-14 items-center justify-center border border-dashed border-secondary-100">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="h-2/3 w-2/3"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="font-pmedium text-base text-gray-100">
            Thumbnail image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="h-64 w-full rounded-2xl"
              />
            ) : (
              <View className="h-16 w-full flex-row items-center justify-center space-x-2 rounded-2xl border-2 border-black-200 bg-black-100">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="h-5 w-5"
                />
                <Text className="font-pmedium text-sm text-gray-100">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title={"Submit & publish"}
          handlePress={handleSubmit}
          containerStyles={"mt-2"}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
