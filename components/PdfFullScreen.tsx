"use client"
import { useState } from 'react'
import { Dialog,DialogContent,DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Expand, Loader2 } from 'lucide-react'
import SimpleBar from 'simplebar-react'
import { Document, Page } from 'react-pdf'
import { toast } from './ui/use-toast'
import { useResizeDetector } from 'react-resize-detector'

type PdfRendererProps = {
    url : string;
}
const PdfFullScreen = ({url} : PdfRendererProps  ) => {
    const [numPages,setnumPages] = useState<number>()
    const [isOpen, setisOpen] = useState<boolean>(false)
    const {width,ref} = useResizeDetector()
    return (
        <Dialog 
        open={isOpen}
        onOpenChange={(v) => {
            if (!v) {
                setisOpen(v)
            }
        }}
        >
            <DialogTrigger asChild onClick={() => setisOpen(true)}>
                <Button variant={'ghost'} onClick={() => {}} aria-label='Full Screen' className='gap-1.5'>
                    <Expand className='h-4 w-4' />
                </Button>
            </DialogTrigger>
            <DialogContent className='w-full max-w-7xl'>
                <SimpleBar className='max-h-[calc(100vh - 10rem)] !mt-15' autoHide={false}>
                    <div ref={ref}>
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
                        {new Array(numPages).fill(0).map((_,i) => { 
                            return (
                                <Page pageNumber={i + 1} key={i} width={width ? width : 1 }/>
                        )})}
                        </Document>
                    </div>
                </SimpleBar>
            </DialogContent>
        </Dialog>
    )
}

export default PdfFullScreen