"use client";

import React, { useRef, useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toSnakeCase } from '@/utils/constants';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { File, Trash2 } from 'lucide-react';

export const CustomFields = (props) => {

    const { type = 'text', label = '', name = '', placeholder = '', className = '' } = props;
    const { disabled = false, form = null } = props;
    const { onSelect = null } = props;
    const v = form.watch(name) || [];
    const [values, setValues] = useState(type === 'multi-select' ? v.length ? v.join(', ').trim() : '' : '');
    const uploadRef = useRef();
    const [files, setFiles] = useState([]);

    const handleUpload = () => {
        uploadRef.current.click();
    }
  
    const handleFiles = (e) => {

        const newFiles = Array.from(e.target.files);
        const updatedFiles = [ ...files, ...newFiles ];
        setFiles(updatedFiles);
    
    }

    const handleRemoveFile = (id) => {

        const allFiles = [ ...files ];
        const newFiles = allFiles.filter((_,idx) => idx !== id);
        setFiles(newFiles);

    }

    if (type === 'text') {

        return (
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className={className}>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input placeholder={placeholder} disabled={disabled} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )

    };

    if (type === 'date') {

        return (
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className={className}>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Popover>
                                
                                <PopoverTrigger asChild>
                                    <Button variant={"outline"} disabled={disabled} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                        {field.value ? (format(field.value, "PPP")) : (<span>{placeholder}</span>)}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={new Date(field.value)}
                                        onSelect={(date) => field.onChange(date.toISOString())}
                                        disabled={(date) => (date > new Date() || date < new Date("1900-01-01"))}
                                        initialFocus
                                    />
                                </PopoverContent>

                            </Popover>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )

    };

    if (type === 'select') {

        const { list } = props;
        const newList = list.length ? typeof list[0] === 'string' ?  list.map((item, i) => ({ id: `item-${i}`, label: item, value: item })) : list : [];

        return (
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className={className}>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                        <Select onValueChange={onSelect === null ? field.onChange : onSelect} defaultValue={field.value} value={field.value} disabled={disabled}>

                            <FormControl>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={placeholder} disabled={disabled} />
                                </SelectTrigger>
                            </FormControl>

                            <SelectContent position='bottom'>
                                {newList.map((x) => (
                                    <SelectItem key={x.id} value={x.value}>{x.label}</SelectItem>
                                ))}
                            </SelectContent>

                        </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )

    };

    if (type === 'multi-select') {

        const { list } = props;
        // const newList = list.map((item, i) => ({ id: `item-${i}`, label: item, value: item }));
        const selectedValues = form.watch(name) || [];

        const handleChange = (value) => {

            const newSelectedValues = selectedValues.includes(value)
                ? selectedValues.filter((v) => v !== value)
                : [...selectedValues, value];

            form.setValue(name, newSelectedValues);
            setValues(newSelectedValues.join(', ').trim())
            console.log(newSelectedValues.join(', '))

        }

        const handleClick = () => {

            form.setValue(name, selectedValues.length === list.length ? [] : list);
            setValues(selectedValues.length === list.length ? '' : list.join(', ').trim());

        }

        return (

            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className={className}>

                        <FormLabel>{label}</FormLabel>

                            <FormControl>

                                <Popover>

                                    <PopoverTrigger asChild>
                                        <Input type="text" value={values} placeholder="Choose Type" readOnly disabled={disabled} />
                                    </PopoverTrigger>

                                    <PopoverContent className="w-[350px] p-1">
                                        
                                        <label className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"><input type='checkbox' onClick={handleClick} /> <span className='text-sm'>Select All</span></label>
                                        <hr className='my-1' />
                                        {list.map((item, i) => (
                                            <label key={`item-${i}`} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                                                <input
                                                    type="checkbox"
                                                    value={item}
                                                    checked={selectedValues.includes(item)}
                                                    onChange={() => handleChange(item)}
                                                    disabled={disabled}
                                                    className="form-checkbox"
                                                />
                                                <span className='text-sm'>{item}</span>
                                            </label>
                                        ))}
                                    </PopoverContent>
                                
                                </Popover>
                                
                            </FormControl>

                        <FormMessage />

                    </FormItem>
                )}
            />
        )

    };

    if (type === 'multi-checkbox') {

        const { list, alignment = 'horizontal' } = props;
        const newList = list.length ? typeof list[0] === 'string' ?  list.map((item, i) => ({ id: toSnakeCase(item), label: item })) : list : [];
        // list.map((item, i) => ({ id: toSnakeCase(item), label: item }));


        const defaultValue = (field, item, checked) => {

            // console.log({ field, item, checked })
            // console.log(field.value)

            return checked
                    ? field.onChange(field.value !== undefined ? [ ...field.value, item?.id] : ['', item?.id])
                    : field.onChange(field.value?.filter((value) => value !== item?.id))
        }


        return (
            <FormField
                control={form.control}
                name={name}
                render={() => (
                    <FormItem className={className}>

                        <div className="mb-4">
                            <FormLabel>{label}</FormLabel>
                        </div>

                        <div className={`${alignment === 'horizontal' ? 'flex items-center' : 'flex flex-col'} gap-4`}>

                            {newList.map((item) => (

                                <FormField
                                    key={item?.id}
                                    control={form.control}
                                    name={name}
                                    render={({ field }) => {

                                        return (
                                            <FormItem key={item?.id} className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox checked={field.value?.includes(item?.id)}
                                                        disabled={disabled}
                                                        onCheckedChange={(checked) => defaultValue(field, item, checked)}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {item.label}
                                                </FormLabel>
                                            </FormItem>
                                        );

                                    }}
                                />

                            ))}
                        </div>

                        <FormMessage />
                    </FormItem>
                )}
            />
        )
    };

    if (type === 'number') {

        return (
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className={className}>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input type='text' placeholder={placeholder} disabled={disabled} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        );

    };

    if (type === 'email') {
        return (
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className={className}>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input type='email' placeholder={placeholder} disabled={disabled} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        );
    }

    if (type === 'textarea') {

        const { rows = 6 } = props;

        return (
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className={className}>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Textarea placeholder={placeholder} disabled={disabled} className="resize-none" rows={rows} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        );

    };

    if (type === 'file') {

        return (

            <div className={`${files.length ? 'border' : 'border-2 border-dashed cursor-pointer'} rounded-sm h-[300px] w-full`}>

                <input ref={uploadRef} type='file' onChange={handleFiles} className='hidden' multiple />

                {files.length ? 

                    <div className='m-2 h-full'>
                        <div className='flex w-full justify-end mb-2'><Button variant='secondary' type='button' onClick={handleUpload}>Upload more</Button></div>
                        <div className='overflow-auto h-[80%] w-full'>


                            {files.map((x, i) => (
                            
                                <div key={i} className='p-2 border border-slate-100 flex justify-between items-center rounded-sm mb-2'>
                                <div className='flex gap-3 items-center'>
                                    <File size={18} />
                                    <div>{x.name}</div>
                                </div>
                                <Trash2 className='hover:text-red-500 cursor-pointer' size={18} onClick={() => handleRemoveFile(i)} />
                                </div>

                            ))}

                        </div>
                    </div>

                : 
                    <div className='flex justify-center items-center h-full w-full text-gray-400' onClick={handleUpload}>
                        Upload documents here...
                    </div>
                }

            </div>

        )

    };

    if (type === 'checkbox') {

        return (
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className={`flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 ${className}`}>
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>{label}</FormLabel>
                        </div>
                    </FormItem>
                )}
            />
        )

    }

};