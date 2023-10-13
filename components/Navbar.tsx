import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { LoginLink, LogoutLink, RegisterLink,getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight, LogOutIcon } from 'lucide-react';


const Navbar = () => {
    const {isAuthenticated} = getKindeServerSession()
    const userIsConnected = isAuthenticated()
    return (
        <nav className='h-14 z-40 sticky inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
            
            <MaxWidthWrapper>
                <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                    <Link href={'/'} className='flex z-40 font-semibold'>quill.</Link>
                    
                    <div className='hidden items-center space-x-4 sm:flex'>
                        <>
                            <Link href={'/pricing'} className={buttonVariants({ className : '', variant:'ghost', size : 'sm'})}>
                                Pricing
                            </Link>
                            {userIsConnected ? (
                                <LogoutLink 
                                className={buttonVariants({ size : 'sm'})}>
                                    <LogOutIcon className='h-5 w-5 mr-1.5' />{" "}Log out
                                </LogoutLink>
                            ) : (
                            <>
                                <LoginLink 
                                className={buttonVariants({ className : '', variant:'ghost', size : 'sm'})}>
                                    Sign in
                                </LoginLink>
                                
                                <RegisterLink 
                                className={buttonVariants({ size : 'sm'})}>
                                    Get started <ArrowRight className='h-5 w-5 ml-1.5' />
                                </RegisterLink>
                            </>
                            )}
                            
                        </>
                    </div>
                    
                </div>
            </MaxWidthWrapper>
            
        </nav>
    )
}

export default Navbar
