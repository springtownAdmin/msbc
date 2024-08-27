"use client";

import useStorage from '@/hooks/useStorage';
import { MenuData } from '@/utils/constants';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export const CheckPermission = ({ children }) => {

    const router = useRouter();
    const pathname = usePathname();

    const { getItem } = useStorage();

    useEffect(() => {

        const permissions = getItem('permissions');

        let obj = {};
        // let paths = [ '/dashboard', '/' ];
        let patterns = [ /^\/dashboard$/, /^\/$/ ];

        permissions.forEach((x) => {

            obj[x.module] = { add: x.can_add, edit: x.can_edit, view: x.can_view };

            const baseLink = MenuData[x.module]?.link;

            if (x.can_view && baseLink) {
                patterns.push(new RegExp(`^${baseLink}$`));
            }

            if (x.can_add && baseLink) {
                patterns.push(new RegExp(`^${baseLink}/add$`));
            }

            if (x.can_edit && baseLink) {
                // console.log(x);
                patterns.push(new RegExp(`^${baseLink}/edit(/\\d+)?$`)); // handles dynamic ids after /edit
            }

            if (x.module === 'User Management') {
                patterns.push(new RegExp(`^${baseLink}/roles/add$`));
                patterns.push(new RegExp(`^${baseLink}/roles/edit(/\\d+)?$`)); // handles dynamic ids after /edit
            }

            if (x.module === 'Enquiry Management') {
                patterns.push(/^\/follow-up$/);
            }


        });

        // const isAuthorized = paths.includes(pathname);
        const isAuthorized = patterns.some((pattern) => pattern.test(pathname));

        if (!isAuthorized) router.replace('/not-found');


    }, [pathname, router]);

    return (
        <>
            {children}
        </>
    )

}
