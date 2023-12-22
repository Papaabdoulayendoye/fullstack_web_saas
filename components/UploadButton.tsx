"use client"

import { useState } from 'react'
import { Dialog,DialogContent,DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
const UploadButton = () => {
    const [isOpen,setIsOpen] = useState<boolean>(false)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Upload PDF</Button>
            </DialogTrigger>

            <DialogContent>
                <h1>Exemple content</h1>
            </DialogContent>
        </Dialog>
    )
}
export default UploadButton