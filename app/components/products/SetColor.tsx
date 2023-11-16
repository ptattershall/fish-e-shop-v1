"use client"

import { SelectedVarType, CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetVariationProps {
    images: SelectedVarType[],
    cartProduct: CartProductType,
    handleVariationSelect: (value: SelectedVarType) => void
}

const SetVariation: React.FC<SetVariationProps> = ({
    images,
    cartProduct,
    handleVariationSelect
}) => {
  return (
    <div>
        <div className='flex gap-4 items-center'>
            <span className='font-semibold'>VARIATIONS:</span>
            <div className="flex gap-1">
                {images.map((image) => {
                return (
                    <div 
                    key={image.color}
                    onClick={() => handleVariationSelect(image)}
                    className={
                        `h-7 w-7 rounded-full border-emerald-300 flex items-center justify-center 
                        ${cartProduct.selectedVar.color === image.color ? 'border-[1.5px]' : 'border-none'}`
                        }>
                        <div style={{background: image.colorCode}} className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"></div>
                    </div>
                );
                })}
            </div>
        </div>
    </div>
  );
}

export default SetVariation;