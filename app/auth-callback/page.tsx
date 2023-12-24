"use client"
import React from "react";
import { Loader2 } from "lucide-react";
import { useSearchParams, useRouter, redirect } from 'next/navigation';
import { trpc } from '../_trpc/client';
const AuthCallback = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    trpc.authCallback.useQuery(undefined, {
        onSuccess({ success }) {
            if (success) {
                router.push(origin ? `/${origin}` : '/dashboard')
            }
        },
        onError(err) {
            if(err?.data?.code) router.push('/api/auth/login')
        },
    })
    
    return( 
        <div className='w-full flex justify-center mt-24'>
            <div className='flex flex-col items-center gap-2'>
                <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                <h3 className='font-semibold text-xl'>Setting up your account...</h3>
                <p className=' text-sm text-slate-800'>You will be redirected automatically.</p>
            </div>
        </div>
    )
};

export default AuthCallback;
