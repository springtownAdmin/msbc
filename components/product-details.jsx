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

export const ProductDetails = () => {

    const [open, setOpen] = useState(false);

    const rowData = [

        {
            productNo: 1,
            productType: 'Windows',
            productDescription: '12" x 10" mm large windows',
            quantity: 2
        },

        {
            productNo: 2,
            productType: 'French Door',
            productDescription: '12" x 10" mm large windows',
            quantity: 1
        },

    ]

    const columnDefs = useMemo(() => [
        { field: 'productNo', headerCheckboxSelection: true, checkboxSelection: true, filter: 'agNumberColumnFilter', flex: 1 },
        { field: 'productType', headerName: 'Product Type', filter: 'agTextColumnFilter', flex: 1 },
        { field: 'productDescription', headerName: 'Product Description', filter: 'agTextColumnFilter', flex: 2 },
        { field: 'quantity', headerName: 'Quantity', filter: 'agNumberColumnFilter', flex: 1 },
        { field: 'actions', headerName: 'Actions', cellRenderer: ActionsRenderer, flex: 1 }
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
                        <DialogTitle>Add Product</DialogTitle>
                        <DialogDescription>
                            Add necessary product details
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-center gap-3 py-4 w-full overflow-auto">
                        
                        <div className='w-[98%]'>
                            <Label>Product Type</Label>
                            <Input type='text' className='w-[97%] mt-1' value="" onChange={(e) =>  {}} />
                        </div>

                        <div className='w-[98%]'>
                            <Label>Product Description</Label>
                            <Input type='textarea' rows={3} className='w-[97%] mt-1' value="" onChange={(e) =>  {}} />
                        </div>

                        <div className='w-[98%]'>
                            <Label>Quantity</Label>
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
                <div className='flex items-center border rounded-md p-2 hover:bg-orange-50 transition-all duration-250' onClick={handleOpen}>
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
