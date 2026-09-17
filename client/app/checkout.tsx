import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Address } from "@/constants/types";
import { useCart } from "@/context/cartContext";
import { dummyAddress } from "@/assets/assets";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

export default function Checkout() {
  const { cartTotal } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setpageLoading] = useState(true);

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setpaymentMethod] = useState<"cash" | "stripe">("cash");

  const shipping = 2.0;
  const tax = 0;
  const total = cartTotal + shipping + tax;

  const fetchAddress = async () => {
    const addrList = dummyAddress;
    if (addrList.length > 0) {
      // Find default or First
      const def = addrList.find((a: any) => a.isDefault || addrList[0]);
      setSelectedAddress(def as Address);
    }
    setpageLoading(false);
  };

  const handlePlaceHolder = async () => {
    if (!selectedAddress) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please add a shipping Address",
      });
      return;
    }

    if (paymentMethod === "stripe") {
      return Toast.show({
        type: "error",
        text1: "Info",
        text2: "Stripe not implement yet",
      });
    }

    // Cash On Delivery
    router.push("/orders");
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  if (pageLoading) {
    return (
      <SafeAreaView className="flex-1 bg-surface justify-center items-center">
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <Header title="Checkout" showBack />

      <ScrollView className="flex-1 px-4 mt-4">
        {/* Address Section */}
        <Text className="text-lg font-bold text-primary mb-4 mt-3">
          Shipping Address
        </Text>
        {selectedAddress ? (
          <View className="bg-white p-4 rounded-xl mb-6 shadow-sm">
            <View className="flex-row  items-center justify-between mb-2">
              <Text className="text-base font-bold">
                {selectedAddress.type}
              </Text>
              <TouchableOpacity onPress={() => router.push("/addresses")}>
                <Text className="text-sm" style={{ color: "#FF4C38" }}>
                  Change
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="text-secondary leading-5">
              {selectedAddress.street},{selectedAddress.city}
              {"\n"}
              {selectedAddress.state},{selectedAddress.zipCode}
              {"\n"}
              {selectedAddress.country}
            </Text>
          </View>
        ) : (
          <TouchableOpacity className="bg-white p-6 rounded-xl mb-6 items-center justify-center border-dashed border-2 border-gray-100">
            <Text className="text-primary font-bold">Add Address</Text>
          </TouchableOpacity>
        )}

        {/* Payment Section */}
        <Text className="text-lg font-bold text-primary mb-4">Payment Method</Text>
        {/* Cash on Delivery option */}
        <TouchableOpacity onPress={()=>setpaymentMethod('cash')} className={`bg-white p-4 rounded-xl mb-4 shadow-sm flex-row items-center border-2 ${paymentMethod==="stripe"? "border-primary":"border-transparent"}`}>
            <Ionicons name="cash-outline" size={24} color={COLORS.primary} className="mr-3"/>
            <View className="ml-3 flex-1">
                <Text className="text-base font-bold text-primary">Cash on Delivery</Text>
                <Text className="text-xs  text-secondary mt-1">Pay when you receive the order</Text>
            </View>
            {paymentMethod==="cash"&&(
                 <Ionicons name="checkmark" size={24} color={COLORS.primary}/>
            )}
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>setpaymentMethod('stripe')} className={`bg-white p-4 rounded-xl mb-4 shadow-sm flex-row items-center border-2 ${paymentMethod==="stripe"? "border-primary":"border-transparent"}`}>
            <Ionicons name="card-outline" size={24} color={COLORS.primary} className="mr-3"/>
            <View className="ml-3 flex-1">
                <Text className="text-base font-bold text-primary">Pay with Card</Text>
                <Text className="text-xs  text-secondary mt-1">Credit or Debit Card</Text>
            </View>
            {paymentMethod==="stripe"&&(
                 <Ionicons name="checkmark" size={24} color={COLORS.primary}/>
            )}
        </TouchableOpacity>
      </ScrollView>

      {/* Order Summary */}
      <View className="p-4 bg-white shadow-lg border-t border-gray-100">
        <Text className="text-lg font-bold text-primary mb-4"> Order Summary</Text>

        {/* SubTotal */}
        <View className="flex-row justify-between mb-2">
            <Text className="text-secondary">SubTotal</Text>
            <Text className="font-bold">${cartTotal.toFixed(2)}</Text>
        </View>
        {/* Shipping */}
        <View className="flex-row justify-between mb-2">
            <Text className="text-secondary">Shipping</Text>
            <Text className="font-bold">${shipping.toFixed(2)}</Text>
        </View>
        {/* Tax */}
        <View className="flex-row justify-between mb-4">
            <Text className="text-secondary">Tax</Text>
            <Text className="font-bold">${tax.toFixed(2)}</Text>
        </View>
        {/* Total */}
        <View className="flex-row justify-between mb-6">
            <Text className="text-primary text-xl font-bold">Total</Text>
            <Text className="text-primary text-xl font-bold">${total.toFixed(2)}</Text>
        </View>

        {/* Plave Order Button */}
        <TouchableOpacity className={`p-4 rounded-xl items-center ${loading?"bg-gray-400":"bg-primary"}`} onPress={handlePlaceHolder} disabled={loading}>
                {loading?<ActivityIndicator color={'white'}/>:
                <Text className="text-white font-bold text-lg">Place Order</Text>
                }
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
