import React from 'react'
import {cn} from '../lib/utils'
type Element = {
    className ?: string,
    children : React.ReactNode
}

const MaxWidthWrapper = ({className, children} : Element ) => {
    return (
        <div className={cn('mx-auto w-full max-w-screen-xl px2.5 md:px-20', className)}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper
