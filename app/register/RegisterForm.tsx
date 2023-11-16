'use client'

import { use, useEffect, useState } from 'react'
import Heading from '../components/products/Heading'
import Input from '../components/inputs/input'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import AddToCartButton from '../components/AddToCartButton'
import Link from 'next/link'
import { AiOutlineGoogle } from 'react-icons/ai'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SafeUser } from '@/libs/types'

interface RegisterFormProps {
  currentUser: SafeUser | null
}

const RegisterForm: React.FC<RegisterFormProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: { errors },} = useForm<FieldValues>({
        defaultValues:{
            name:'',
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
        axios.post('/api/register', data).then(() => {
            toast.success("New User Created!")
            signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            }).then((callback) => {
              if(callback?.ok){
                router.push('/')
                router.refresh()
                toast.success("Logged in!")
          }
          if(callback?.error){
            toast.error(callback.error)
          }
        })
        }).catch((err) => {
            toast.error("Error creating user")
        }).finally(() => {
            setIsLoading(false)
        })
    }

    if(currentUser){
      return <p className='text-center'>You are logged in... Redirecting...</p>;
    }

  return (
    <>
    <Heading title="Mr. Fish Comics Sign-up" />
    <AddToCartButton label="Sign-up with Google" onClick={() => {signIn('google')}} icon={AiOutlineGoogle} outline/>
    <hr className='bg-slate-300 w-full h-px' />
    <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
    <Input id="email" label="E-mail" disabled={isLoading} register={register} errors={errors} required />
    <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password"/>
    <AddToCartButton label={isLoading ? "Loading..." : "Sign-up"} onClick={handleSubmit(onSubmit)} />
    <p className='text-sm'>Already have an account? <Link className='underline' href="/login">Log-in</Link></p>
    </>
  )
}

export default RegisterForm