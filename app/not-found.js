"use client";

import Link from 'next/link';
import React, { useRef } from 'react';

const NotFound = () => {

    const ref = useRef(null);

    React.useEffect(() => {
        import("@lottiefiles/lottie-player");
    });

    return (
        <div className='flex w-full h-screen justify-center items-center'>
            {/* <lottie-player id="firstLottie" ref={ref} autoplay loop mode="normal"
                src="https://lottie.host/fe374d94-c838-4e85-9c88-3002dddb2133/j37yMeErPN.json"
                style={{ width: "500px", height: "500px" }}
            ></lottie-player> */}
            <div className="text-center">
                <p className="text-base font-semibold text-orange-600">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href='/dashboard' className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Go back home</Link>
                {/* <a href="#" className="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a> */}
                </div>
            </div>


        </div>
    );
}

export default NotFound