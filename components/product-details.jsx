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
import { Textarea } from './ui/textarea';


export const ProductDetails = ({ productData, setProductData }) => {

    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [addProduct, setAddProduct] = useState({ product_id: 0, product_name: '', description: '', quantity: 0 });

    const rowData = useMemo(() => productData.map((v) =>
        ({ productNo: v.product_id, productName: v.product_name, productDescription: v.description, quantity: v.quantity }))
        , [productData]);

    const ActionsRenderer = (params) => {

        const handleEdit = () => {

            setOpen(true);
            setEdit(true);

            const product = {
                product_id: params.data.productNo,
                product_name: params.data.productName,
                description: params.data.productDescription,
                quantity: params.data.quantity
            };

            setAddProduct(product);

        }

        const handleDelete = () => {

            setProductData(productData.filter((x) => x.no !== params.data.productNo))

        }

        return (
            <div className='flex items-center h-full'>
                <div className='cursor-pointer' onClick={handleEdit}>
                    <MdEdit size={20} />
                </div>
            </div>
        );

    };

    const columnDefs = useMemo(() => [
        { field: 'productNo', headerCheckboxSelection: true, checkboxSelection: true, filter: 'agNumberColumnFilter', flex: 1 },
        { field: 'productName', headerName: 'Product Name', filter: 'agTextColumnFilter', flex: 1 },
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
        setEdit(false);
    }

    const handleChange = (e) => {

        setAddProduct({ ...addProduct, [e.target.name]: e.target.value });

    }

    const handleSave = () => {

        const newProduct = {
            product_id: productData.length + 1,
            product_name: addProduct.product_name,
            description: addProduct.description,
            quantity: addProduct.quantity
        }

        setProductData([...productData, newProduct]);
        setAddProduct({ product_id: 0, product_name: '', description: '', quantity: 0 });
        handleClose();

    }

    const handleEdit = () => {

        const updatedProduct = productData.map((x) => {

            if (x.product_id === addProduct.product_id) {

                return addProduct;

            }

            return x;

        })

        setProductData(updatedProduct);
        setAddProduct({ product_id: 0, product_name: '', description: '', quantity: 0 });
        handleClose();

    }

    return (
        <>

            <Dialog open={open} onOpenChange={handleClose}>

                <DialogContent className="sm:max-w-[425px]">

                    <DialogHeader>
                        <DialogTitle>{edit ? 'Edit Product' : 'Add Product'}</DialogTitle>
                        <DialogDescription>
                            {edit ? 'Edit' : 'Add'} necessary product details
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-center gap-3 py-4 w-full overflow-auto">

                        <div className='w-[98%]'>
                            <Label>Product Name</Label>
                            <Input type='text' className='w-[97%] mt-1' name='product_name' value={addProduct.product_name} onChange={handleChange} />
                        </div>

                        <div className='w-[98%]'>
                            <Label>Product Description</Label>
                            <Textarea rows={3} className='w-[97%] mt-1' name='description' value={addProduct.description} onChange={handleChange} />
                        </div>

                        <div className='w-[98%]'>
                            <Label>Quantity</Label>
                            <Input type='text' className='w-[97%] mt-1' name='quantity' value={addProduct.quantity} onChange={handleChange} />
                        </div>

                    </div>

                    <DialogFooter>
                        <Button type="button" variant='secondary' onClick={handleClose}>Cancel</Button>
                        <Button type="button" onClick={edit ? handleEdit : handleSave}>Save</Button>
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
