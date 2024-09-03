import React, { useEffect, useRef, useState } from 'react'
import { Button } from "./ui/button";
import pdfIcon from "@/public/images/pdf-icon.png";
import csvIcon from "@/public/images/csv-icon.png";
import Image from "next/image";
import { LuFile } from "react-icons/lu";
import { MdDownload } from "react-icons/md";
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { BACKEND_API } from '@/utils/constants';
import useStorage from '@/hooks/useStorage';
import useAPI from '@/hooks/useAPI';
import useLoader, { Loader } from '@/hooks/useLoader';

function FileUploadSection({ enquiry_no = '' }) {

    const uploadRef = useRef();
    const [ files, setFiles ] = useState([]);
    const { getFilesFromS3, addFilesToS3, removeFilesFromS3, downloadFileFromS3 } = useAPI();
    const { show, showLoader, hideLoader } = useLoader();

    const fetchFilesFromS3 = async () => {

        setFiles([]);

        showLoader()
        const result = await getFilesFromS3({ enquiry_no });

        if (result?.files && result?.files?.length !== 0) {

            setFiles(result.files);

        }
        hideLoader();

    };

    const handleFileChange = async (event) => {

        const selectedFileForUpload = event.target.files[0];

        if (!selectedFileForUpload) {
            console.log("No file selected");
            return;
        }

        await addFilesToS3({ selectedFileForUpload: selectedFileForUpload, enquiry_no, callback: fetchFilesFromS3 });

    };

    useEffect(() => {

        fetchFilesFromS3();

    }, []); // Run only on mount

    const handleRemoveFile = async (fileName, filePath) => {

        await removeFilesFromS3({ fileName, filePath, enquiry_no, callback: fetchFilesFromS3 });

    };

    const handleDownload = async (fileName, filePath) => {

        await downloadFileFromS3({ enquiry_no, fileName, filePath })

    };

    return (
        <div
          className={`${
            files.length ? "border" : "border-2 border-dashed cursor-pointer"
          } rounded-sm h-[300px] w-full`}
        >
          <input
            ref={uploadRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
  
          <div className="m-2 h-full">
            <div className="flex w-full justify-end mb-2">
              <Button
                variant="secondary"
                type="button"
                onClick={() => uploadRef.current.click()}
              >
                Upload
              </Button>
            </div>
            <div className="overflow-auto h-[80%] w-full">
              
              <div className='h-full flex text-center items-center'>

                <Loader show={show}>

                    {enquiry_no && files.length ? (<div className="flex gap-3 flex-wrap">
                            {files.map((file, i) => (
                                <div className='w-[200px] border border-gray-300 rounded-sm' key={i}>
                                <div className='rounded-sm hover:brightness-50 h-[150px] w-[200px] transition-all duration-150'>
                                    {file.file_name.endsWith('.pdf') ?
                                        <div className='h-full w-full flex justify-center items-center hover:bg-gray-200 transition-all duration-150'>
                                            <Image src={pdfIcon} alt={`${file.name}-${i}`} width={50} height={80} />
                                        </div>
                                    : file.file_name.endsWith('.xlsx') || file.file_name.endsWith('.xls') || file.file_name.endsWith('.csv') ?
                                        <div className='h-full w-full flex justify-center items-center hover:bg-gray-200 transition-all duration-150'>
                                            <Image src={csvIcon} alt={`${file.name}-${i}`} width={50} height={80} />
                                        </div>
                                    : file.file_name.endsWith('.png') || file.file_name.endsWith('.jpg') || file.file_name.endsWith('.jpeg') ?
                                    <img src={file.file_url} alt={file.file_name} className='h-full w-full p-1' />
                                        
                                    : <div className='h-full w-full flex justify-center items-center hover:bg-gray-200 transition-all duration-150'>
                                    <LuFile size={30} />
                                </div>}
                                </div>
                                <div className='flex justify-between p-1 items-center bg-white w-full'>
                                    <div className='text-sm w-full truncate font-medium text-start'>{file.file_name}</div>
                                    <div className='flex gap-2 items-center'>
                                        <div><MdDownload className='hover:text-blue-700 cursor-pointer' size={18} onClick={() => handleDownload(file.file_name, file.file_path)} /></div>
                                        <div><Trash2 className='hover:text-red-500 cursor-pointer' size={18} onClick={() => handleRemoveFile(file.file_name, file.file_path)} /></div>
                                    </div>
                                </div>
                            </div>
                            ))}
                    </div>) : (
                        <div className='w-full flex h-[60%] justify-center items-center'>No files available.</div>
                    )}
                    
                </Loader>
                
              </div>
            </div>
          </div>
        </div>
      );
}

export default FileUploadSection;