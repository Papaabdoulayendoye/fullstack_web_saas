"use client"
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Document, Page,pdfjs } from 'react-pdf';
import {useResizeDetector} from 'react-resize-detector'
import { toast } from './ui/use-toast';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

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

    const [numPages,setnumPages] = useState<number>()
    const [currPage,setcurrPage] = useState<number>(1)
    const PrevPage = () => {
        setcurrPage((prev) => {
            if (prev > 1){
                return prev - 1 
            }
            return  prev
            }
        )}
    const NextPage = () => {
        setcurrPage((prev) => {
            if (prev < numPages!){
                return prev + 1 
            }
            return  prev
            }
        )}
    return (
        <div className='w-full bg-white rounded-md shadow flex flex-col items-center'>
            <div className='h-14 w-full border-b border-zinc-200 flex items-center justify-between mb-2'>
                <div className='flex items-center gap-1.5'>
                    <Button aria-label='previous page' variant='ghost' onClick={PrevPage}>
                        <ChevronDown className='h-4 w-4' />
                    </Button>
                    <div className='flex items-center gap-1.5 '>
                        <Input className='w-12 h-8'value={currPage}/>
                        <p className='text-zinc-700 text-md space-x-1'>
                            <span className=''>/</span>
                            <span className=''>{numPages ?? 'x'}</span>
                        </p>
                    </div>
                    <Button aria-label='next page' variant='ghost' onClick={NextPage}>
                        <ChevronUp className='h-4 w-4' />
                    </Button>
                </div>
            </div>
            <div className='flex-1 w-full max-h-screen'>
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
                    <Page pageNumber={currPage} width={width ? width : 1 } />
                    </Document>
                </div>
            </div>
        </div>
    )
}

export default PdfRenderer