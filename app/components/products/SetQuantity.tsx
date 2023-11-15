"use client"

import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetQuantityProps {
    cartCounter?: boolean,
    cartProduct: CartProductType,
    handleQtyIncrease: () => void,
    handleQtyDecrease: () => void
}

const buttonStyle = 'px-2 rounded border-[1.2px] border-slate-300 cursor-pointer'

const SetQuantity: React.FC<SetQuantityProps> = ({
    cartCounter,
    cartProduct,
    handleQtyIncrease,
    handleQtyDecrease
}) => {
    return (
        <div className="flex gap-8 items-center">
            {cartCounter ? null : 
            <div>
                <div className="font-semibold">QUANTITY:</div>
            </div>
            }
            <div className="flex gap-4 items-center text-base">
                <button onClick={handleQtyDecrease} className={buttonStyle}>-</button>
                <div>{cartProduct.quantity}</div>
                <button onClick={handleQtyIncrease} className={buttonStyle}>+</button>
            </div>
        </div>
    );
}

export default SetQuantity;