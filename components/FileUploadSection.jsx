import React, { useEffect, useRef, useState } from 'react'
import { Button } from "./ui/button";
import pdfIcon from "@/public/images/pdf-icon.png";
import csvIcon from "@/public/images/csv-icon.png";
import Image from "next/image";
import { LuFile } from "react-icons/lu";
import { MdDownload } from "react-icons/md";
import axios from 'axios';
import { Trash2 } from 'lucide-react';

function FileUploadSection() {
    const uploadRef = useRef();
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    const handleFileChange = async (event) => {
        const selectedFileForUpload = event.target.files[0];

        if (!selectedFileForUpload) {
            console.log("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFileForUpload);
        const fileName = selectedFileForUpload.name;

        try {
            await axios.post(
                `http://13.127.133.23:8000/enquiry/ENQ24083001/upload`,
                formData,
                {
                    params: { company_name: "HolBox01", file_name: fileName },
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            fetchFilesFromS3();
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    const fetchFilesFromS3 = async () => {
        setFiles([]);
        try {
            const response = await axios.get(
                `http://13.127.133.23:8000/enquiry/ENQ24083001/files?company_name=HolBox01`
            );
            console.log(response.data);
            if (response.data.files && response.data.files.length !== 0) {
                const updatedPreview = response.data.files.map((file) => {
                    if (!file || !file.type) {
                        console.error('Invalid file object:', file);
                        return 'file';
                    }
                    return file.type.startsWith('image/')
                        ? URL.createObjectURL(file) // Assuming file is a Blob for images
                        : file.type === 'application/pdf'
                        ? 'pdf'
                        : file.type === 'text/csv'
                        ? 'csv'
                        : 'file';
                });
                setPreviews(updatedPreview);
                setFiles(response.data.files);
            } else {
                console.log('No files available.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchFilesFromS3();
    }, []); // Run only on mount

    const handleRemoveFile = async (fileName, filePath) => {
        try {
            await axios.post(`http://13.127.133.23:8000/enquiry/ENQ24083001/delete?company_name=HolBox01&file_name=${fileName}`, {
                params: { file_name: fileName, file_path: filePath, company_name:'HolBox01' },
            });
            fetchFilesFromS3();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDownload = async (fileName, filePath) => {
        
        try {
            const response = await axios.get("http://13.127.133.23:8000/enquiry/ENQ24083001/download", {
                params: { file_name: fileName, file_path: filePath, company_name:'HolBox01' },
            });
            window.open(response.data.file_url);
        } catch (error) {
            console.error(error);
        }
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
              
              <div>
              {files.length ? (<div className="flex gap-3 flex-wrap">
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
                              <img src={file.file_url} alt={file.file_name} className='h-full w-full object-contain' />
                                  
                              : <div className='h-full w-full flex justify-center items-center hover:bg-gray-200 transition-all duration-150'>
                              <LuFile size={30} />
                          </div>}
                          </div>
                          <div className='flex justify-between items-center p-2 bg-white w-full'>
                              <div className='text-sm w-full truncate font-medium'>{file.name}</div>
                              <div className='flex gap-2 items-center'>
                                  <div><MdDownload className='hover:text-blue-700 cursor-pointer' size={18} onClick={() => handleDownload(file.file_name, file.file_path)} /></div>
                                  <div><Trash2 className='hover:text-red-500 cursor-pointer' size={18} onClick={() => handleRemoveFile(file.file_name, file.file_path)} /></div>
                              </div>
                          </div>
                      </div>
                      ))}
              </div>) : (
                  <div>No files available.</div>
              )}
                
              </div>
            </div>
          </div>
        </div>
      );
}

export default FileUploadSection;