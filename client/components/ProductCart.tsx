import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import { ProductCardProps } from "@/constants/types";
import { useWishlist } from "@/context/WishListContext";

export default function ProductCart({ product }: ProductCardProps) {
  const router = useRouter();
  const {toggleWishlist,isInWishlist}=useWishlist()
  const isLiked = isInWishlist(product._id);
  // console.log(isLiked);
  console.log(
  "PRODUCT:",
  product.name,
  "ID:",
  product._id,
  "LIKED:",
  isLiked
);
  
  return (
      <TouchableOpacity className="w-[48%] mb-4 bg-white rounded-lg overflow-hidden" 
      onPress={() => router.push(`/product/${product._id}`)}
      >

        <View className="relative h-56 w-full bg-gray-100">
          <Image
            source={{ uri: product.images[0] }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Favouite Icon */}
          <TouchableOpacity
            className="absolute top-2 right-2 z-10  p-2 bg-white rounded-full shadow-sm"
            onPress={() => {
              console.log("CLICKED:", product.name, product._id);
              toggleWishlist(product)
            }}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={20}
              color={isLiked ? COLORS.accent : COLORS.primary}
            />
          </TouchableOpacity>
          {/* is Featured */}
          {product.isFeatured && (
            <View className="absolute top-2 left-2 bg-black px-2 py-1 rounded">
              <Text className="text-white text-xs font-bold uppercase">
                Featured
              </Text>
            </View>
          )}
        </View>

        {/* Product Info  */}
        <View className="p-3">
          <View className="flex-row items-center mb-1">
            <Ionicons name="star" size={24} color={"#FFD700"}/>
            <Text className="text-secondary text-xs ml-1">4.6</Text>
          </View>
          <Text className="text-primary font-medium text-sm mb-1" numberOfLines={1}>{product.name}</Text>
          <View className="flex-row items-center">
            <Text className="text-primary font-bold text-base">${product.price.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
  );
}
