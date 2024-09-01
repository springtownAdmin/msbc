"use client";

import React, { useEffect, useRef, useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, FileOutput } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toSnakeCase } from '@/utils/constants';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { File, Trash2 } from 'lucide-react';
import pdfIcon from '@/public/images/pdf-icon.png';
import csvIcon from '@/public/images/csv-icon.png';
import Image from 'next/image';
import { LuFile } from 'react-icons/lu';
import { MdDownload } from "react-icons/md";
import axios from 'axios';

export const CustomFields = (props) => {

    const { type = 'text', label = '', name = '', placeholder = '', className = '' } = props;
    const { disabled = false, form = null } = props;
    const { onSelect = null } = props;
    const v = form.watch(name) || [];
    const [values, setValues] = useState(type === 'multi-select' ? v.length ? v.join(', ').trim() : '' : '');
    const uploadRef = useRef();
    const [selectedFileForUpload, setselectedFileForUpload] = useState(null);
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    const handleUpload = async () => {
        uploadRef.current.click();

        if (!selectedFileForUpload) return;
        const formData = new FormData();
        formData.append('file', selectedFileForUpload);
        const fileName = selectedFileForUpload.name;

        try {
        await axios.post(`http://13.127.133.23:8000/enquiry/ENQ24082204/upload?company_name=HolBox02&file_name=${fileName}`, formData, {
            params: { file_name: fileName, file_path: path },
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        handleFiles();
        } catch (error) {
        console.error(error);
        }
    }
   
  
    const handleFiles = async (e) => {

        // const newFiles = Array.from(e.target.files);
        // const updatedFiles = [ ...files, ...newFiles ];
        // const updatedPreview = updatedFiles.map((x) => x.type.startsWith('image/') ? URL.createObjectURL(x) : x.type === 'application/pdf' ? 'pdf' : x.type === 'text/csv' ? 'csv' : 'file');
        // setPreviews(updatedPreview);
        // setFiles(updatedFiles);
        // uploadRef.current.click();
        try {
            const response = await axios.get(`http://13.127.133.23:8000/enquiry/ENQ24082204/files?company_name=HolBox02`);
            setFiles(response.data.files);
            console.log(files);
            
          } catch (error) {
            console.error(error);
          }
    }

    

    const handleRemoveFile = async (fileName, filePath) => {

        // const allFiles = [ ...files ];
        // const newFiles = allFiles.filter((_,idx) => idx !== id);
        // const newPreviews = previews.filter((_,idx) => idx !== id);
        // setFiles(newFiles);
        // setPreviews(newPreviews);

        try {
            await axios.delete('http://localhost:8000/delete/', { params: { file_name: fileName, file_path: filePath } });
            handleFiles();
          } catch (error) {
            console.error(error);
          }

    }

    const handleDownload = async (fileName, filePath) => {

        // const currentFile = files[id];

        // const a = document.createElement('a');
        // a.href = URL.createObjectURL(currentFile);
        // a.download = currentFile.name;
        // a.click();

        // URL.revokeObjectURL(currentFile);

        try {
            const response = await axios.get('http://localhost:8000/download/', { params: { file_name: fileName, file_path: filePath } });
            window.open(response.data.file_url);
          } catch (error) {
            console.error(error);
          }

    }
    // useEffect(() => {
    //    handleFiles();
    //   }, [files.length == 0]);

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

    // if (type === 'file') {

    //     return (

    //         <div className={`${files.length ? 'border' : 'border-2 border-dashed cursor-pointer'} rounded-sm h-[300px] w-full`}>

    //             <input ref={uploadRef} type='file' onChange={handleFiles} className='hidden' multiple />

    //             {files.length ? 

    //                 <div className='m-2 h-full'>
    //                     <div className='flex w-full justify-end mb-2'><Button variant='secondary' type='button' onClick={() => handleUpload()}>Upload more</Button></div>
    //                     <div className='overflow-auto h-[80%] w-full'>


    //                         <div className='flex gap-3 flex-wrap'>

    //                         {files.map((x, i) => (
                            
    //                             // <div key={i} className='p-2 border border-slate-100 flex justify-between items-center rounded-sm mb-2'>
    //                             // <div className='flex gap-3 items-center'>
    //                             //     <File size={18} />
    //                             //     <div>{x.name}</div>
    //                             // </div>
    //                             // <Trash2 className='hover:text-red-500 cursor-pointer' size={18} onClick={() => handleRemoveFile(i)} />
    //                             // </div>

    //                             <div className='w-[200px] border border-gray-300 rounded-sm' key={i}>
    //                                 <div className='rounded-sm hover:brightness-50 h-[150px] w-[200px] transition-all duration-150'>
    //                                     {previews[i] === 'pdf' ?
    //                                         <div className='h-full w-full flex justify-center items-center hover:bg-gray-200 transition-all duration-150'>
    //                                             <Image src={pdfIcon} alt={`${x.name}-${i}`} width={50} height={80} />
    //                                         </div>
    //                                     : previews[i] === 'csv' ?
    //                                         <div className='h-full w-full flex justify-center items-center hover:bg-gray-200 transition-all duration-150'>
    //                                             <Image src={csvIcon} alt={`${x.name}-${i}`} width={50} height={80} />
    //                                         </div>
    //                                     : previews[i] === 'file' ?
    //                                         <div className='h-full w-full flex justify-center items-center hover:bg-gray-200 transition-all duration-150'>
    //                                             <LuFile size={30} />
    //                                         </div>
    //                                     : <img src={previews[i]} alt={`${x.name}-${i}`} className='h-full w-full' />}
    //                                 </div>
    //                                 <div className='flex justify-between items-center p-2 bg-white w-full'>
    //                                     <div className='text-sm w-full truncate font-medium'>{x.name}</div>
    //                                     <div className='flex gap-2 items-center'>
    //                                         <div><MdDownload className='hover:text-blue-700 cursor-pointer' size={18} onClick={() => handleDownload(x.file_name, x.file_path)} /></div>
    //                                         <div><Trash2 className='hover:text-red-500 cursor-pointer' size={18} onClick={() => handleRemoveFile(x.file_name, x.file_path)} /></div>
    //                                     </div>
    //                                 </div>
    //                             </div>

    //                         ))}
    //                         </div>

    //                     </div>
    //                 </div>

    //             : 
    //                 // <div className='flex justify-center items-center h-full w-full text-gray-400' onClick={() => handleUpload('')}>
    //                 //     Upload documents here...
    //                 // </div> 
    //                 null
    //             }

    //         </div>

    //     )

    // };

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