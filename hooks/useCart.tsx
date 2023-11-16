import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

type CartContextType = {
    cartTotalQty: number,
    cartTotalAmount: number,
    cartProducts: CartProductType[] | null,
    paymentIntent: string | null,
    handleAddToCart: (product: CartProductType) => void,
    handleRemoveFromCart: (product: CartProductType) => void,
    handleCartQtyIncrease: (product: CartProductType) => void,
    handleCartQtyDecrease: (product: CartProductType) => void,
    handleRemoveAllFromCart: () => void,
    handleSetPaymentIntent: (value: string | null) => void
}

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null);
    useEffect(() => {
        const cartItems: any = localStorage.getItem('mrFishCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)
        const mrFishPaymentIntent: any = localStorage.getItem('mrFishPaymentIntent')
        const paymentIntent: string | null = JSON.parse(mrFishPaymentIntent)
        setCartProducts(cProducts)
        setPaymentIntent(paymentIntent)
    }, [])


    useEffect(() => {
        const getTotals = () => {
            if(cartProducts){
            const {total, qty} = cartProducts?.reduce(
                (acc, item) => {
                    const itemTotal = item.price * item.quantity;
                    acc.total += itemTotal;
                    acc.qty += item.quantity;
                return acc;
            }, {
                total: 0,
                qty:0,
                weight: 0
            }
            )
            setCartTotalQty(qty)
            setCartTotalAmount(total)
        }
    }
    getTotals()
    }, [cartProducts])

    const handleAddToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;
            if(prev){
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            toast.success('Product added to cart')
            localStorage.setItem('mrFishCartItems', JSON.stringify(updatedCart))
            return updatedCart
        })
    }, [])


    const handleRemoveFromCart = useCallback((product: CartProductType) => {
        if(cartProducts){
            const filterCart = cartProducts.filter((item) => item.id !== product.id)
            localStorage.setItem('mrFishCartItems', JSON.stringify(filterCart))
            setCartProducts(filterCart)
            toast.success('Product removed from cart')
        }
    }, [cartProducts])

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 25){
            return toast.error('Maximum quantity reached')
        }
        if(cartProducts){
            updatedCart = [...cartProducts]
            const index = cartProducts.findIndex((item) => item.id === product.id)
            if(index > -1){
                updatedCart[index].quantity = ++updatedCart[index].quantity
            }
            setCartProducts(updatedCart)
            localStorage.setItem('mrFishCartItems', JSON.stringify(updatedCart))
            toast.success('Product quantity increased')
        }
    }, [cartProducts])

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 1){
            return toast.error('Minimum quantity reached')
        }
        if(cartProducts){
            updatedCart = [...cartProducts]
            const index = cartProducts.findIndex((item) => item.id === product.id)
            if(index > -1){
                updatedCart[index].quantity = --updatedCart[index].quantity
            }
            setCartProducts(updatedCart)
            localStorage.setItem('mrFishCartItems', JSON.stringify(updatedCart))
            toast.success('Product quantity decreased')
        }
    }, [cartProducts])

    const handleRemoveAllFromCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.removeItem('mrFishCartItems')
        toast.success('Cart cleared')
    }, [cartProducts])

    const handleSetPaymentIntent = useCallback((value: string | null) => {
        setPaymentIntent(value)
        localStorage.setItem('mrFishPaymentIntent', JSON.stringify(value))
    }, [paymentIntent])

    const value = {
        cartTotalQty, 
        cartTotalAmount, 
        cartProducts, 
        paymentIntent, 
        handleAddToCart, 
        handleRemoveFromCart, 
        handleCartQtyIncrease, 
        handleCartQtyDecrease, 
        handleRemoveAllFromCart,
        handleSetPaymentIntent
    }

    return  <CartContext.Provider value={value} {...props}/>
}

export const useCart = () => {
    const context = useContext(CartContext)
    if(context === null){
        throw new Error('useCart must be used within a CartContextProvider')
    }
    return context
}