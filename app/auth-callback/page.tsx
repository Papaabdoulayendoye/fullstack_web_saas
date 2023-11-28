"use client"
import React from "react";
import { Loader, Loader2 } from "lucide-react";
import { useSearchParams, redirect, useRouter } from 'next/navigation';
import { trpc } from '../_trpc/client';
const AuthCallback = () => {
    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')
    const router = useRouter()
    
    const {data, isLoading} = trpc.authCallback.useQuery(undefined,{
        onSuccess : ({success}) => {
            if (success) {
                router.push(origin ? `/${origin}`: '/dashboard')
            }
        }
    })
    
    return( 
        <div className='flex flex-col items-center justify-center mt-10'>
            <h1 className=' text-4xl text-black'>You 'll be redirect soon...</h1>
            <Loader2 className=' h-[40px] w-[40px]' />
        </div>
    )
};

export default AuthCallback;
