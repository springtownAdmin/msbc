"use client";

import React, { useMemo, useState } from 'react'
import { CustomTooltip } from './custom-tooltip';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { MdEdit } from 'react-icons/md';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { Select } from './ui/select';

const ActionsRenderer = (params) => {

    return (
        <div className='flex items-center justify-center gap-8 h-full'>
            <div>
                <MdEdit size={20}/>
            </div>

            <div>
                <Trash2 size={20}/>
            </div>
        </div>
    );
  
};

export const FollowUpDetails = () => {

    const [open, setOpen] = useState(false);

    const rowData = [

        {
            date: new Date(),
            chaseOn: new Date(),
            chasedBy: 'User',
            description: 'Have to remind him after 2 days',
            contactPerson: 'User',
            followUpType: 'Lead In',
            phone: '0987654321',
            mobile: '0987654321',
            email: 'abc@example.com'
        },

        {
            date: new Date(),
            chaseOn: new Date(),
            chasedBy: 'Admin',
            description: 'Have to remind him after 1 days',
            contactPerson: 'Admin',
            followUpType: 'Enquired',
            phone: '0987654321',
            mobile: '0987654321',
            email: 'admin@example.com'
        },

    ]

    const columnDefs = useMemo(() => [
        { field: 'date', headerCheckboxSelection: true, checkboxSelection: true, filter: 'agDateColumnFilter' },
        { field: 'chaseOn', headerName: 'Chase On', filter: 'agDateColumnFilter' },
        { field: 'chasedBy', headerName: 'Chased By', filter: 'agTextColumnFilter' },
        { field: 'description', headerName: 'Description', filter: 'agTextColumnFilter' },
        { field: 'contactPerson', headerName: 'Contact Person', filter: 'agTextColumnFilter' },
        { field: 'followUpType', headerName: 'Follow Up Type', filter: 'agTextColumnFilter' },
        { field: 'phone', headerName: 'Phone', filter: 'agTextColumnFilter' },
        { field: 'mobile', headerName: 'Mobile', filter: 'agTextColumnFilter' },
        { field: 'email', headerName: 'Email', filter: 'agTextColumnFilter' },
        { field: 'actions', headerName: 'Actions', cellRenderer: ActionsRenderer }
    ], []);
    
    const defaultColDef = useMemo(() => {
        return {
            floatingFilter: true,
            sortable: true,
            resizable: true,
        };
    }, []);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    

    return (
        <>

            <Dialog open={open} onOpenChange={handleClose}>

                <DialogContent className="sm:max-w-[425px]">

                    <DialogHeader>
                        <DialogTitle>Add Follow Up</DialogTitle>
                        <DialogDescription>
                            Add necessary follow-up details
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-center gap-3 py-4 w-full overflow-auto">
                        
                        <div className='w-[98%]'>
                            <Label>Enquiry No.</Label>
                            <Input type='text' className='w-[97%] mt-1' value="ENQ-AHMD-0001" onChange={(e) =>  {}} />
                        </div>

                        <div className='w-[98%]'>
                            <Label>By</Label>
                            <Input type='select' rows={3} className='w-[97%] mt-1' value="" onChange={(e) =>  {}} />
                        </div>

                        <div className='w-[98%]'>
                            <Label>Date</Label>
                            <Input type='date' className='w-[97%] mt-1' value="" onChange={(e) =>  {}} />
                        </div>

                        <div className='w-[98%]'>
                            <Label>Type</Label>
                            <Input type='text' className='w-[97%] mt-1' value="" onChange={(e) =>  {}} />
                        </div>

                    </div>

                    <DialogFooter>
                        <Button type="button" variant='secondary' onClick={handleClose}>Cancel</Button>
                        <Button type="button" onClick={() => {}}>Save</Button>
                    </DialogFooter>

                </DialogContent>

            </Dialog>

            <div className='w-full flex my-3'>
                <div className='flex items-center border rounded-md p-2 hover:bg-gray-100 transition-all duration-250' onClick={handleOpen}>
                    <CustomTooltip content='Add Product' position='right'>
                        <AiOutlineFileAdd size={22} />
                    </CustomTooltip>
                </div>
            </div>

            <div className={"ag-theme-quartz w-full"} style={{ height: 500 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowSelection="multiple"
                    suppressRowClickSelection={true}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 25, 50]}
                />
            </div>

        </>
    );

}
