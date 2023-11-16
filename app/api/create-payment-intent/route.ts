import Stripe from 'stripe';
import prisma from '@/libs/prismadb';
import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import { getCurrentUser } from '@/actions/getUser';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotalPrice = item.price * item.quantity;
    return acc + itemTotalPrice;
  }, 0);
  return totalPrice;
}

export async function POST(request: Request){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.json({error: 'You must be logged in to make a purchase'}, {status: 401});
    }

    const body = await request.json();
    const { items, payment_intent_id } = body;

    const orderAmount = await calculateOrderAmount(items) * 100;
    const orderData = {
        user: {connect: {id: currentUser.id}},
        amount: orderAmount,
        currency: 'usd',
        status: 'pending',
        deliveryStatus: 'pending',
        paymentIntentId: payment_intent_id,
        products: items
    }

    if(payment_intent_id){
      const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);
      if(current_intent){
        const updated_intent = await stripe.paymentIntents.update(
          payment_intent_id, 
          { amount: orderAmount }
        );
        const [existing_order, updated_order] = await Promise.all([
          prisma.order.findFirst({
            where: {paymentIntentId: payment_intent_id}
          }),
          prisma.order.update({
            where: {paymentIntentId: payment_intent_id}, 
            data: {amount: orderAmount, products: items}
          })
        ])
      if(!existing_order){
        return NextResponse.json({error: 'Payment Intent invalidated'}, {status: 400});
      }
      return NextResponse.json({paymentIntent: updated_intent});
      }
    }else{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: orderAmount,
            currency: 'usd',
            automatic_payment_methods: {enabled: true},
        });
        orderData.paymentIntentId = paymentIntent.id;
        await prisma.order.create({data: orderData});

        return NextResponse.json({ paymentIntent })
    }
}