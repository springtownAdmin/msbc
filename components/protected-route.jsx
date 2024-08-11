"use client";

import useStorage from '@/hooks/useStorage'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {

    const { getItem } = useStorage();
    const router = useRouter();
    
    useEffect(() => {

        const email = getItem('email');
        if (!email) router.push('/login');

    }, [router]);


    return (
        <>{children}</>
    );

}

export default ProtectedRoute