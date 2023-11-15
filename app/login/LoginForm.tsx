'use client'

import { useState } from 'react'
import Heading from '../components/products/Heading'
import Input from '../components/inputs/input'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import AddToCartButton from '../components/AddToCartButton'
import Link from 'next/link'
import { AiOutlineGoogle } from 'react-icons/ai'


export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: { errors },} = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:'',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        console.log(data)
    }
  return (
    <>
    <Heading title="Mr. Fish Comics Sign-in" />
    <AddToCartButton label="Sign-in with Google" onClick={() => {}} icon={AiOutlineGoogle} outline/>
    <hr className='bg-slate-300 w-full h-px' />
    <Input id="email" label="E-mail" disabled={isLoading} register={register} errors={errors} required />
    <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password"/>
    <AddToCartButton label={isLoading ? "Loading..." : "Sign-in"} onClick={handleSubmit(onSubmit)} />
    <p className='text-sm'>Need an account? <Link className='underline' href="/register">Sign-up</Link></p>
    </>
  )
}
