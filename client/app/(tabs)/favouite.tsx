import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useWishlist } from '@/context/WishListContext'
import { useRoute } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import ProductCart from '@/components/ProductCart'

export default function Favouite() {
  const {wishlist}=useWishlist()
  const router=useRoute()
  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='Wishlist' showBack showCart/>

      {wishlist.length>0?(
        <ScrollView className='flex-1 px-4 mt-4' showsVerticalScrollIndicator={false}>
            <View className='flex-row flex-wrap justify-between'>
              {wishlist.map((product)=>(
                  <ProductCart key={product._id} product={product}/>
              ))}
            </View>
        </ScrollView>
      ):(
  <View className="flex-1 items-center justify-center">
          <Text className="text-secondary text-lg">Your Wishlist is Empty</Text>
          <TouchableOpacity onPress={() => router.push("/")} className="mt-4">
            <Text className="text-primary font-bold">Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}