'use client'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md'
import Heading from '../components/products/Heading'
import AddToCartButton from '../components/AddToCartButton'
import ItemContent from './ItemContent'
import formatPrice from '@/utils/formatPrice'

const CartClient = () => {
    const {cartProducts, handleRemoveAllFromCart, cartTotalAmount} = useCart()
    
    if((!cartProducts) || (cartProducts.length === 0)){
        return (
            <div className='flex justify-center items-center h-[50vh] flex-col'>
                <div className='text-2xl'>No items in cart</div>
                <div>
                    <Link href={"/"} className='text-slate-500 flex items-center gap-1 mt-2'>
                        <MdArrowBack/>
                        <span>Back to Shop</span>
                    </Link>
                </div>
            </div>
        )
    } else { 
        return (
        <div>
            <Heading title='Shopping Cart' center/>
            <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8'>
                <div className='col-span-2 justify-self-start'>PRODUCT</div>
                <div className='justify-self-center'>PRICE</div>
                <div className='justify-self-center'>QUANTITY</div>
                <div className='justify-self-end'>TOTAL</div>
            </div>
            <div>
                {cartProducts && cartProducts.map((item) => {
                    return <ItemContent key={item.id.toString()} item={item} />
                })}
            </div>
            <div className='border-t-[1.5pc] border-slate-200 py-4 flex justify-between gap-4'>
                <div className='w-[90px]'>
                    <AddToCartButton label='Clear Cart' onClick={() => {handleRemoveAllFromCart()}} small outline />
                </div>
                <div className='text-sm flex flex-col gap-1 items-start'>
                    <p className='text-slate-500 text-xs items-center italics'>*tax and shipping calculated at checkout*</p>
                    <div className='flex justify-between w-full text-base font-semibold'>
                        <span>Total</span>
                        <span>{formatPrice(cartTotalAmount)}</span>
                    </div>
                    <AddToCartButton label='Checkout' onClick={() => {}}/>
                    <Link href={"/"} className='text-slate-500 flex items-center gap-1 mt-2'>
                        <MdArrowBack/>
                        <span>Back to Shop</span>
                    </Link>
                </div>
            </div>
        </div>
        )
    }
}

export default CartClient