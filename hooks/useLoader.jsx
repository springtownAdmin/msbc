"use client";

import React, { useState } from 'react'
import { Watch } from 'react-loader-spinner';

const useLoader = () => {

    const [ show, setShow ] = useState(false);

    const showLoader = () => setShow(true);

    const hideLoader = () => setShow(false);

    return { show, showLoader, hideLoader, Loader };
  
}

export const Loader = ({ children, show }) => {

    return (
        <>
            {show ? 
                <div className='flex h-full w-full justify-center items-center'>
                    <Watch height={50} width={50} color='#fe6600' />
                </div>
            : children}
        </>
    )

}

export default useLoader