"use client";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { CustomTooltip } from '@/components/custom-tooltip';
import { AgGridReact } from 'ag-grid-react';
import { Search, Trash2 } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import { LuFileEdit } from "react-icons/lu";
import { MdEdit } from 'react-icons/md';
import { Container } from "@/components/container";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";

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

const FollowUp = () => {

    const [open, setOpen] = useState(false);
    const [ dateRange, setDateRange ] = useState({ start: null, end: null });

    const handleRangeStart = (v) => setDateRange({ ...dateRange, start: v });

    const handleRangeEnd = (v) => setDateRange({ ...dateRange, end: v });

    const rowData = [

        {
            enquiryNo: 'ENQ-AHMD-0001',
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
            enquiryNo: 'ENQ-AHMD-0002',
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
        
        { field: 'enquiryNo', headerCheckboxSelection: true, checkboxSelection: true, filter: 'agTextColumnFilter' },
        { field: 'date', headerName: 'Date', filter: 'agDateColumnFilter' },
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
    <Container id={6}>

        <div className='w-full flex my-3 gap-3'>
            <div>
                <DatePicker placeholder='Start Date' className='w-[200px]' date={dateRange.start} onSelect={handleRangeStart} />
            </div>

            <div>
                <DatePicker placeholder='End Date' className='w-[200px]' date={dateRange.end} onSelect={handleRangeEnd} />
            </div>

            <div>
                <Button type='button'>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                </Button>
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
    </Container>
  )
}

export default FollowUp