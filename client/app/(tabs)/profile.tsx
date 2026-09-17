import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { dummyUser } from "@/assets/assets";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, PROFILE_MENU } from "@/constants";

export default function Profile() {
  const { user } = { user: dummyUser };
  console.log("IMAGE URL:", user.imageUrl);
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <Header title="Profile" />

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={
          !user
            ? { flex: 1, justifyContent: "center", alignItems: "center" }
            : { paddingTop: 16 }
        }
      >
        {!user ? (
          // Guest User Screen
          <View className="items-center w-full">
            <View className="w-24 h-24  rounded-full bg-gray-200 items-center justify-center mb-6">
              <Ionicons name="person" size={40} color={COLORS.secondary} />
            </View>
            <Text className="text-primary font-bold text-xl mb-2 ">
              Guest User
            </Text>
            <Text className="text-secondary text-base mb-8 text-center w-3/4 px-4">
              Log in to View your profile ,orders,and addresses
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/sign-in")}
              className="bg-primary w-3/5 py-3 rounded-full items-center shadow-lg "
            >
              <Text className="text-white font-bold text-lg px-4">
                Login / Signup
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View className="items-center mb-8">
              <View className="mb-3">
                <Image
                  source={{ uri: user.imageUrl }}
                  className="size-20 border-2 border-white shadow-sm rounded-full w-20 h-20 "
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                  }}
                />
              </View>
              <Text className="text-xl font-bold text-primary">
                {user.firstName + " " + user.lastName}
              </Text>
              <Text className="text-sm text-secondary">
                {user.emailAddresses[0].emailAddress}
              </Text>

              {/* Admin Panel Button if User is Admin */}
              {user.publicMetadata?.role === "admin" && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push("/admin")}
                  className="mt-4 bg-primary rounded-xl px-5 py-3 mt-3 flex-row items-center"
                >
                  <Ionicons name="grid-outline" size={18} color="#fff" />

                  <Text className="text-white font-semibold text-sm ml-2">
                    Admin Panel
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Menu */}
            <View className="bg-white rounded-xl  border-gray-100/75 p-2 mb-4">
              {PROFILE_MENU.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className={`flex-row items-center p-4 ${index !== PROFILE_MENU.length - 1 ? "border-b border-gray-100" : ""}`}
                  onPress={() => router.push(item.route as any)}
                >
                  <View className="w-10 h-10 bg-surface rounded-full items-center justify-center mr-4">
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={COLORS.primary}
                    />
                  </View>
                  <Text className="flex-1 text-primary font-medium">
                    {item.title}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Logout Button */}
            <TouchableOpacity
              className="flex-row items-center justify-center p-4"
              onPress={handleLogout}
            >
              <Text style={{ color: "red", fontWeight: "bold" }}>
                LogOut
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
