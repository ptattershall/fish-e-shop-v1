"use client"

import { CartProductType, SelectedVarType } from "@/app/product/[productId]/ProductDetails"
import Image from "next/image"

interface ProductImageProps {
    cartProduct: CartProductType,
    product: any,
    handleVariationSelect: (value: SelectedVarType) => void
}

const ProductImage: React.FC<ProductImageProps> = ({ 
    cartProduct,
    product,
    handleVariationSelect
}) => {
    return <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        <div 
        className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
            {product.images.map((image: SelectedVarType) => {
                return (
                    <div key={image.color} onClick={() => handleVariationSelect(image)} className={`relative w-[80%] rounded border-emerald-300 aspect-square
                    ${cartProduct.selectedVar.color === image.color ? 'border-[1.5px]' : 'border-none'}`}>
                        <Image src={image.image} alt={image.color} fill sizes='100vw' className="object-contain"/>
                    </div>
                );
            }
            )}
        </div>
        <div className="col-span-5 relative aspect-square">
            <Image src={cartProduct.selectedVar.image} alt={cartProduct.name} fill sizes='100vw' className="object-contain w-full h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]"/>
        </div>
    </div>
}

export default ProductImage;