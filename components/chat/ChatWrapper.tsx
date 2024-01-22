"use client"
import React from 'react'
import Messages from './Messages'
import ChatInput from './ChatInput'
import { trpc } from '@/app/_trpc/client'
import { ChevronLeft, Loader2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'

type ChatWrapperProps = {
  fileId : string
}


const ChatWrapper = ({fileId}:ChatWrapperProps ) => {
  const {data, isLoading} = trpc.getFileUploadStatus.useQuery({fileId},{
    refetchInterval : (data) => {
      return data?.status === 'SUCCESS' || data?.status === "FAILED" ? false : 500
    }
  })
  
  if (isLoading){ 
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex flex-1 flex-col mb-28 justify-center items-center'>
          <div className='flex flex-col items-center gap-2'>
            <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
            <h3 className=' text-lg font-semibold'>Loading...</h3>
            <p className='text-sm text-zinc-500'>we're preparing your PDF.</p>
          </div>
        </div>
      </div>
  )
}

  if (data?.status === "PROCESSING") {
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex flex-1 flex-col mb-28 justify-center items-center'>
          <div className='flex flex-col items-center gap-2'>
            <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
            <h3 className=' text-lg font-semibold'>Loading...</h3>
            <p className='text-sm text-zinc-500'>This won't take long.</p>
          </div>
        </div>
        <ChatInput isDisable/>
      </div>
  )
  }
  if (data?.status === "FAILED") {
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex flex-1 flex-col mb-28 justify-center items-center'>
          <div className='flex flex-col items-center gap-2'>
            <XCircle className='h-8 w-8 text-red-500' />
            <h3 className=' text-lg font-semibold'>To many pages in PDF.</h3>
            <p className='text-sm text-zinc-500'>Your <span className='font-medium'>Free</span>{" "}plan supports up to 5 pages par PDF.</p>
            <Link href={'/dashboard'} className={buttonVariants({
              variant: "secondary",
              className : 'mt-4'
            })}><ChevronLeft />Back</Link>
          </div>
        </div>
        <ChatInput isDisable/>
      </div>
  )
  }

  

  return (
    <div className='relative bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between'>
      <div className='flex-1 justify-between flex-col mb-28'>
        <Messages />
      </div>
      <ChatInput />
    </div>
  )
}

export default ChatWrapper