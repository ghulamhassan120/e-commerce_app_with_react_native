import { dummyWishlist } from "@/assets/assets";
import { Product, WishlistContextType } from "@/constants/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const WishlistContext=createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({children}:{children:ReactNode}){
    const [wishlist, setWishlist] = useState<Product[]>([])
    const [loading, setloading] = useState(false)

    const fetchWishlist=async()=>{
        setloading(true)
        setWishlist(dummyWishlist)
        setloading(false)
    }

   const toggleWishlist = (product: Product) => {
  setWishlist((prev) => {

    const exists = prev.some((p) => p._id === product._id);

    const updatedWishlist = exists
      ? prev.filter((p) => p._id !== product._id)
      : [...prev, product];


    return updatedWishlist;
  });
};
    const isInWishlist=(productId:string)=>{
        return wishlist.some((p)=>p._id===productId)
    }

    useEffect(()=>{
        fetchWishlist()
    },[])
    return(
        <WishlistContext.Provider value={{wishlist,loading,toggleWishlist,isInWishlist}}>
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist(){
    const context= useContext(WishlistContext)
    if (context===undefined) {
        throw new Error("useWishlist must be used within a wishlistProvider")
    }
    return context
}