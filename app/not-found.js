"use client";

import React, { useRef } from 'react';

const NotFound = () => {

    const ref = useRef(null);

    React.useEffect(() => {
        import("@lottiefiles/lottie-player");
    });

    return (
        <div className='flex w-full h-screen justify-center items-center'>
            <lottie-player id="firstLottie" ref={ref} autoplay loop mode="normal"
                src="https://lottie.host/fe374d94-c838-4e85-9c88-3002dddb2133/j37yMeErPN.json"
                style={{ width: "500px", height: "500px" }}
            ></lottie-player>
        </div>
    );
}

export default NotFound