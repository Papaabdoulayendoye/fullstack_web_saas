"use client"

import { ChevronDown, ChevronUp, Loader2, RotateCw, Search } from 'lucide-react';
import { Document, Page,pdfjs } from 'react-pdf';
import {useResizeDetector} from 'react-resize-detector'
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SimpleBar from 'simplebar-react'
import PdfFullScreen from './PdfFullScreen';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type PdfRendererProps = {
    url : string;
}

const PdfRenderer = ({url} : PdfRendererProps) => {
    const {width,ref} = useResizeDetector()

    const [Scale,setScale] = useState<number>(1)
    const [Rotation,setRotation] = useState<number>(0)
    const [numPages,setnumPages] = useState<number>()
    const [currPage,setcurrPage] = useState<number>(1)
    const customPageValidation = z.object({
        page : z.string().refine(num => Number(num) > 0 && Number(num) <= numPages!)
    })

    type TcustomPageValidation = z.infer<typeof customPageValidation>

    const {register,handleSubmit,setValue,formState : { errors }} = useForm<TcustomPageValidation>({
        resolver : zodResolver(customPageValidation),
        defaultValues : {
            page : '1'
        }
    })
    const PrevPage = () => {
        setcurrPage((prev) => {
            if (prev > 1){
                return prev - 1 
            }
            return  prev
            }
        )
        setValue("page",String(currPage - 1))
        }
    const NextPage = () => {
        setcurrPage((prev) => {
            if (prev < numPages!){
                return prev + 1 
            }
            return  prev
            }
        )
        setValue("page",String(currPage + 1))
        }
    const handleSubmitPage = ({page}:TcustomPageValidation) => {
        setcurrPage(Number(page))
        setValue("page",page)
    }
    return (
        <div className='w-full bg-white rounded-md shadow flex flex-col items-center'>
            <div className='h-14 w-full border-b border-zinc-200 flex items-center justify-between mb-2'>
                <div className='flex items-center gap-1.5'>
                    <Button aria-label='previous page' variant='ghost' onClick={PrevPage} disabled={currPage === 1}>
                        <ChevronDown className='h-4 w-4' />
                    </Button>
                    <div className='flex items-center gap-1.5 '>
                        <Input 
                            className={cn(`w-12 h-8`,errors.page && "focus-visible:!outline-red-500")} 
                            // value={currPage}
                            {...register('page')}
                            onKeyDown={(e) => {
                                if (e.key ==='Enter') {
                                    handleSubmit(handleSubmitPage)()
                                }
                            }}
                        />
                        <p className='text-zinc-700 text-md space-x-1'>
                            <span className=''>/</span>
                            <span className=''>{numPages ?? 'x'}</span>
                        </p>
                    </div>
                    <Button aria-label='next page' variant='ghost' onClick={NextPage} disabled={currPage === numPages}>
                        <ChevronUp className='h-4 w-4' />
                    </Button>
                    </div>
                    <div className=' space-x-2'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className='gap-1.5' aria-label='zoom' variant='ghost'>
                                    <Search className='h-4 w-4'/>
                                    {Scale * 100}%<ChevronDown className='h-3 w-3 opacity-50' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onSelect={() => setScale(1)}>
                                    100%
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setScale(1.5)}>
                                    150%
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setScale(2)}>
                                    200%
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setScale(2.5)}>
                                    250%
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button 
                        aria-label='rotate 90 degrees' 
                        variant={'ghost'}
                        onClick={() => setRotation(prev => prev + 90)}
                        >
                            <RotateCw className='h-4 w-4'/>
                        </Button>
                        <PdfFullScreen url={url} />
                    </div>
                </div>

            <div className='flex-1 w-full max-h-screen'>
                <SimpleBar autoHide={false} className='max-h-[calc(100vh - 10rem)]'>
                    <div  ref={ref}>
                        <Document 
                        loading={
                            <div className='flex justify-center'>
                                <Loader2 className='w-6 h-6 my-26 animate-spin'/>
                            </div>
                        } 
                        file={url} 
                        className=' max-h-full'
                        onLoadError={() => {
                            toast({
                                title : 'Error loading PDF',
                                description : 'Please try again',
                                variant : 'destructive',
                            })
                        }}
                        onLoadSuccess={({numPages}) => {
                            setnumPages(numPages)
                        }}
                        >
                        <Page pageNumber={currPage} width={width ? width : 1 } scale={Scale} rotate={Rotation} />
                        </Document>
                    </div>
                </SimpleBar>
            </div>
        </div>
    )
}

export default PdfRenderer