"use client"

import React, { useRef } from 'react';

export const LongLoader = () => {

    const ref = useRef(null);

    React.useEffect(() => {
        import("@lottiefiles/lottie-player");
    });


    return (
        <div className={"loader"}>
            <lottie-player id="firstLottie" ref={ref} autoplay loop mode="normal"
                src="https://lottie.host/a88e02ca-b413-439a-82f0-bb75f8342b04/ywDYndn3Ky.json"
                style={{ width: "400px", height: "400px" }}
            ></lottie-player>
            <span className="font-medium italic text-center text-lg">Just a moment, <br /> we're getting things ready for you !</span>
        </div>
    );
 
}