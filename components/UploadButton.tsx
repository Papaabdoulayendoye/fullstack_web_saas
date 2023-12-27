"use client"

import { useState } from 'react'
import { Dialog,DialogContent,DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import Dropzone from "react-dropzone";
import { Cloud, File } from 'lucide-react';
import { Progress } from "@/components/ui/progress"
import { useUploadThing } from '@/lib/uploadthing';
import { useToast } from './ui/use-toast';


const UpLoadDropzone = () => {
    const [isUpLoading,setisUpLoading] = useState<boolean>(true)
    const [UploadProgress, setUploadProgress] = useState<number>(0)
    const {toast} = useToast()
    const {isUploading,startUpload} = useUploadThing("pdfUploader")

    const startUploadProgress = () => {
        setUploadProgress(0)
        const interval =setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 95) {
                    clearInterval(interval)
                    return prev
                }
                return prev + 5
            })
        })
    }
    return (
        <Dropzone multiple={false} onDrop={ async (acceptedFiles) => {
            setisUpLoading(true)
            const ProgressInterval = startUploadProgress()

            await new Promise(resolve => setTimeout(resolve,3500))
            
            const res = await startUpload(acceptedFiles)
            if (!res) {
                return toast({
                    title : 'Something went wrong',
                    description : 'Please try again later',
                    variant : 'destructive'
                })
            }
            const [fileResponse] = res
            const key = fileResponse?.key
            if (!key) {
                return toast({
                    title : 'Something went wrong',
                    description : 'Please try again later',
                    variant : 'destructive'
                })
            }
            clearInterval(ProgressInterval!)
            setUploadProgress(100)
            return toast({
                title : 'Your has been uploaded successfully',
                description : 'Your has been uploaded successfully',
            })
            
        }}>
            {({getRootProps,getInputProps,acceptedFiles}) => (
                <div {...getRootProps()} className='border h-64 border-dashed border-gray-300 rounded-lg'>
                    <div className='flex items-center justify-center h-full w-full'>
                        <label 
                        htmlFor="dropzone_file"
                        className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
                        >
                            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                <Cloud className='h-6 w-6 mb-2 text-zinc-500' />
                                <p className='mb-2 text-sm text-zinc-700'>
                                    <span className='font-semibold'>
                                        Click to upload
                                    </span>{' '}
                                </p>
                                <p className='text-xs text-zinc-500'>PDF (up to 4MB)</p>
                            </div>

                            {acceptedFiles && acceptedFiles[0] ? (
                                <div className=' max-w-xs bg-white flex items-center outline rounded-md overflow-hidden outline-[1px] outline-zinc-200 divide-zinc-200 divide-x'>
                                    <div className='px-3 py-2 h-full grid place-items-center'>
                                        <File className='h-4 w-4 text-blue-500' />
                                    </div>
                                    <div className=' truncate px-3 py-2 h-full text-sm'>
                                        {acceptedFiles[0].name}
                                    </div>
                                </div>
                            ) : null}
                            {isUpLoading ? (
                                <div className='w-full mt-4 max-w-xs mx-auto'>
                                    <Progress value={UploadProgress} className='h-1 w-full bg-zinc-200' />
                                </div>
                            ): null}
                        </label>
                    </div>
                </div>
            )}
        </Dropzone>
    )
}

const UploadButton = () => {
    const [isOpen,setIsOpen] = useState<boolean>(false)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Upload PDF</Button>
            </DialogTrigger>
            <DialogContent>
                <UpLoadDropzone />
            </DialogContent>
        </Dialog>
    )
}
export default UploadButton