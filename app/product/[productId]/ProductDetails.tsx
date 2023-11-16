"use client"

import SetVariation from '@/app/components/products/SetColor'
import SetQuantity from '@/app/components/products/SetQuantity'
import AddToCartButton from '@/app/components/AddToCartButton'
import ProductImage from '@/app/components/products/ProductImage'
import { Rating } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { MdCheck } from 'react-icons/md'
import { useRouter } from 'next/navigation'

interface ProductDetailsProps {
    product: any
}


export type CartProductType = {
    id: String,
    name: string,
    description: string,
    category: string,
    variation: string,
    selectedVar: SelectedVarType,
    quantity: number,
    weight: number,
    price: number
}

export type SelectedVarType = {
    id: string,
    color: string,
    colorCode: string,
    image: string,
}

const Horizontal = () => {
    return <hr className='w-[30% mt-2 mb-2]' />
}

const ProductDetails:React.FC<ProductDetailsProps> = ({product}) => {
    const {handleAddToCart, cartProducts} = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const productRating = product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length;
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        variation: product.variation,
        selectedVar: {...product.images[0]},
        quantity: 1,
        weight: product.weight,
        price: product.price
    })
    const router = useRouter()

    useEffect(() => {
        setIsProductInCart(false)

        if(cartProducts){
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)
            if(existingIndex !== -1){
                setIsProductInCart(true)
                setCartProduct(cartProducts[existingIndex])
            } else {
                setIsProductInCart(false)
            }
        }
    }, [cartProducts])


    const handleVariationSelect = useCallback((value: SelectedVarType) => {
        setCartProduct((prev) => ({...prev, selectedVar: value}))
    }, [cartProduct.selectedVar])

    const handleQtyIncrease = useCallback(() => {
        if(cartProduct.quantity === 25) return
        setCartProduct((prev) => ({...prev, quantity: prev.quantity + 1}))
    }, [cartProduct.quantity])

    const handleQtyDecrease = useCallback(() => {
        if(cartProduct.quantity === 1) return
        setCartProduct((prev) => ({...prev, quantity: prev.quantity - 1}))
    }, [cartProduct.quantity])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage 
            cartProduct={cartProduct}
            product={product}
            handleVariationSelect={handleVariationSelect}
            />
            <div className='flex flex-col gap-1 text-slate-500 text-sm'>
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className='flex items-center gap-2'>
                    <Rating value={productRating} readOnly/>
                    <div>{product.reviews.length} reviews</div>
                </div>
                <Horizontal/>
                <div className='text-justify'>{product.description}</div>
                <Horizontal/>
                <div>
                    <span className='font-semibold'>CATEGORY:</span> {product.category}
                </div>    
                <div>
                    <span className='font-semibold'>SERIES:</span> {product.variation}
                </div>
                <div className={product.inStock ? 'text-emerald-800 bg-emerald-400 rounded-md w-20 text-center' : 'text-red-800 bg-red-500 rounded-md max-w-[100px] text-center'}>{product.inStock ? 'In Stock' : 'Out of Stock'}</div>    
                <Horizontal/>
                <SetVariation 
                    cartProduct = {cartProduct}
                    images = {product.images}
                    handleVariationSelect={handleVariationSelect}
                />
                <Horizontal/>
                {isProductInCart ? ( 
                    <>
                        <p className='mb-2 text-slate-500 flex items-center gap-1'>
                            <MdCheck size={20} className='inline-block text-emerald-500 mr-2'/>
                            <span>Product added to cart</span>
                        </p>
                        <div className='max-w-[300px] flex flex-col'>
                            <p className='text-xs font-light text-slate-500 italics'>Item is currently in cart</p>
                            <div className='mt-2'>
                                <AddToCartButton label="View Cart" outline onClick={() => {router.push('/cart')}} />
                            </div>
                            <div className='mt-2'>
                                <AddToCartButton label='Add to Cart' onClick={() => handleAddToCart(cartProduct)} />
                            </div>
                        </div>
                    </>
                    ) : (    
                    <>
                        <SetQuantity
                        cartProduct={cartProduct}
                        handleQtyIncrease={handleQtyIncrease}
                        handleQtyDecrease={handleQtyDecrease}
                        />
                        <Horizontal/>
                        <div className='max-w-[300px] pt-4'>
                            <AddToCartButton 
                            label='Add to Cart'
                            onClick={() => handleAddToCart(cartProduct)}
                            />
                        </div>
                    </> 
                    )}
                
            </div>
            
        </div>
    )
}

export default ProductDetails;