'use client'

import { use, useEffect, useState } from 'react'
import Heading from '../components/products/Heading'
import Input from '../components/inputs/input'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import AddToCartButton from '../components/AddToCartButton'
import Link from 'next/link'
import { AiOutlineGoogle } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { SafeUser } from '@/libs/types'

interface LoginFormProps {
  currentUser: SafeUser | null
}

const LoginForm: React.FC<LoginFormProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: { errors },} = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:'',
        }
    })

    const router = useRouter()

    useEffect(() => {
      if(currentUser){
        setTimeout(() => {
        router.push('/')
        router.refresh()
      }, 2000);
      }
    }, [currentUser])

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      setIsLoading(true)
      signIn('credentials', {
          ...data,
          redirect: false,
      }).then((callback) => {
        setIsLoading(false)
        if(callback?.ok){
          router.push('/')
          router.refresh()
          toast.success("Logged in!")
        }
        if(callback?.error){
          toast.error(callback.error)
        }
      })
    };

    if(currentUser){
      return <p className='text-center'>You are logged in... Redirecting...</p>;
    }

  return (
    <>
    <Heading title="Mr. Fish Comics Log-in" />
    <AddToCartButton label="Log-in with Google" onClick={() => {signIn('google')}} icon={AiOutlineGoogle} outline/>
    <hr className='bg-slate-300 w-full h-px' />
    <Input id="email" label="E-mail" disabled={isLoading} register={register} errors={errors} required />
    <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password"/>
    <AddToCartButton label={isLoading ? "Loading..." : "Log-in"} onClick={handleSubmit(onSubmit)} />
    <p className='text-sm'>Need an account? <Link className='underline' href="/register">Sign-up</Link></p>
    </>
  )
}

export default LoginForm