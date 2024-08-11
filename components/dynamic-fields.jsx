"use client";

import React from 'react'
import { CustomFields } from './custom-fields';
import { toSnakeCase } from '@/utils/constants';

export const DynamicFields = ({ data, form, module_name = 'unknown', controls = [] }) => {

    const newData = data.filter((x) => x.is_visible === true);

    const names = controls.length ? controls.map((x) => x.name) : [];

    return (
        <>
            {newData.map((v, i) => {


                    if (v.type === 'select' || v.type === 'multi-select' || v.type === 'multi-checkbox') {

                        if (names.includes(v.name)) {

                            const index = names.findIndex((x) => x === v.name);

                            return (
                                <div key={`${module_name}-${i}`}>
                                    <CustomFields form={form} type={v.type} name={toSnakeCase(v.name)} 
                                    label={v.label} placeholder={`Choose ${v.label}`} list={v.list} 
                                    disabled={v.read_only} onSelect={controls[index]?.onSelect} />
                                </div>
                            )

                        }
    
                        return (
                            <div key={`${module_name}-${i}`}>
                                <CustomFields form={form} type={v.type} name={toSnakeCase(v.name)} label={v.label} placeholder={`Choose ${v.label}`} list={v.list} disabled={v.read_only} />
                            </div>
                        )
    
                    }
    
                    return (
                        <div key={`${module_name}-${i}`}>
                            <CustomFields form={form} type={v.type} name={toSnakeCase(v.name)} label={v.label} placeholder={`Enter ${v.label}`} disabled={v.read_only} />
                        </div>
                    )

            })}
        </>
    );

}