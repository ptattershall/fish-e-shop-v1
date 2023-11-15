'use client'
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";

const CartCount = () => {
    const router = useRouter();
    const { cartTotalQty } = useCart();
    return (
        <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
            <div>
                <CiShoppingCart className="w-6 h-6 text-3xl" />
                <span className="absolute top-[-10px] right-[-10px] bg-slate-700 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs">{cartTotalQty}</span>
            </div>
        </div>
    );
}

export default CartCount;