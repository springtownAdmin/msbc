"use client";

import React from 'react'

export const CustomGrid = ({ children, row = 1, className = '' }) => {

    let newClass = '';

    if (row === 1) {
        newClass = `grid grid-cols-1 gap-1 ${className}`
    } else if (row === 2) {
        newClass = `grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 ${className}`
    } else if (row === 3) {
        newClass = `grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 md:gap-3 ${className}`
    } else {
        newClass = `grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-3 md:grid-cols-${row} md:gap-${row} ${className}`
    }

    return (
        <div className={newClass}>
            {children}
        </div>
    );

}