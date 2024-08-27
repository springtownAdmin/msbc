"use client";

import React, { useEffect, useMemo, useState } from 'react'
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
import { CustomGrid } from './grid';
import { DynamicFields } from './dynamic-fields';
import { followUpData } from '@/utils/data';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createZodValidation, formatDateToYYYYMMDD, getColumnHeader, getRowData, putValues } from '@/utils/constants';
import { Form } from './ui/form';
import useAPI from '@/hooks/useAPI';
import useLoader, { Loader } from '@/hooks/useLoader';

export const FollowUpDetails = ({ enquiryNo = '', enquiry_id = 0 }) => {

    const [open, setOpen] = useState(false);
    const [followUps, setFollowUps] = useState(followUpData);
    const [getAllFollowUps, setAllFollowUps] = useState([]);
    const { show, showLoader, hideLoader } = useLoader();

    const { getUsers, addFollowUp, getEnquiryFollowUps, getOneFollowUp, updateOneFollowUp } = useAPI();
    const followValues = putValues(followUps);

    const [ formType, setFormType ] = useState('Add');
    const [ followUpId, setFollowUpId ] = useState(0); 
    const newFollowUps = { ...followValues, enquiry_no: enquiryNo };

    const form = useForm({
        resolver: zodResolver(createZodValidation(followUps)),
        defaultValues: newFollowUps
    })

    const fillData = async () => {

        showLoader();
        const data = await getUsers();
        const enquiryFollowUps = await getEnquiryFollowUps(enquiry_id);

        setAllFollowUps(enquiryFollowUps.map(((x) => ({
            id: x.id,
            chaseOn: formatDateToYYYYMMDD(x.chase_on),
            chasedBy: x.chased_by,
            description: x.description,
            followUpType: x.follow_up_type,
            phone: x.phone,
            email: x.email,
            mobile: x.mobile
        }))));

        const reminderToList = data.map((x) => ({ id: x.user_id, value: `${x.user_id}`, label: `${x.first_name} ${x.last_name}`}))

        const newFollowUps = followUps.map((x) => (x.name === 'Reminder to' || x.name === 'Chased By' ? { ...x, list: reminderToList } : x));

        setFollowUps(newFollowUps);
        hideLoader();

    }

    useEffect(() => {

        fillData();

    }, []);

    // const rowData = [

    //     {
    //         date: new Date(),
    //         chaseOn: new Date(),
    //         chasedBy: 'User',
    //         description: 'Have to remind him after 2 days',
    //         contactPerson: 'User',
    //         followUpType: 'Email',
    //         phone: '0987654321',
    //         mobile: '0987654321',
    //         email: 'abc@example.com'
    //     },

    //     {
    //         date: new Date(),
    //         chaseOn: new Date(),
    //         chasedBy: 'Admin',
    //         description: 'Have to remind him after 1 days',
    //         contactPerson: 'Admin',
    //         followUpType: 'Phone',
    //         phone: '0987654321',
    //         mobile: '0987654321',
    //         email: 'admin@example.com'
    //     },

    // ]

    // const columnDefs = useMemo(() => [
    //     { field: 'date', headerCheckboxSelection: true, checkboxSelection: true, filter: 'agDateColumnFilter' },
    //     { field: 'chaseOn', headerName: 'Chase On', filter: 'agDateColumnFilter' },
    //     { field: 'chasedBy', headerName: 'Chased By', filter: 'agTextColumnFilter' },
    //     { field: 'description', headerName: 'Description', filter: 'agTextColumnFilter' },
    //     { field: 'contactPerson', headerName: 'Contact Person', filter: 'agTextColumnFilter' },
    //     { field: 'followUpType', headerName: 'Follow Up Type', filter: 'agTextColumnFilter' },
    //     { field: 'phone', headerName: 'Phone', filter: 'agTextColumnFilter' },
    //     { field: 'mobile', headerName: 'Mobile', filter: 'agTextColumnFilter' },
    //     { field: 'email', headerName: 'Email', filter: 'agTextColumnFilter' },
    //     { field: 'actions', headerName: 'Actions', cellRenderer: ActionsRenderer }
    // ], []);

    const onSelectChasedBy = (id) => form.setValue('chased_by', `${id}`);

    const onSelectReminderTo = (id) => form.setValue('reminder_to', `${id}`);

    const controls = [

        {
            name: 'Chased By',
            onSelect: onSelectChasedBy
        },

        {
            name: 'Reminder to',
            onSelect: onSelectReminderTo
        }

    ]
    
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

    const onSubmit = async () => {

        const values = form.getValues();

        const updatedData = {
            enq_no: values.enquiry_no,
            chased_by: parseInt(values.chased_by),
            chase_on: values.chase_on,
            type: values.type,
            description: values.description,
            completed: values.completed,
            reminder: values.reminder_to === "" ? false : true,
            reminder_to: parseInt(values.reminder_to)
        }

        await addFollowUp(updatedData);
        await fillData();
        handleClose();

    }

    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
    };

    const handleEdit = async (params) => {

        const result = params.data;
        const singleFollowUp = await getOneFollowUp(result.id);
        const data = await getUsers();
        const reminderToList = data.map((x) => ({ id: x.user_id, value: `${x.user_id}`, label: `${x.first_name} ${x.last_name}`}))

        const getChasedById = reminderToList.filter((x) => x.label === singleFollowUp.chased_by);
        form.setValue('chased_by', getChasedById[0].value);
        form.setValue('chase_on', singleFollowUp.chase_on);
        form.setValue('type', singleFollowUp.follow_up_type);
        form.setValue('description', singleFollowUp.description);
        form.setValue('reminder_to', `${singleFollowUp.reminder_to ?? ''}`);
        form.setValue('completed', singleFollowUp.completed);

        setFormType('Edit');
        setFollowUpId(result.id)
        handleOpen();

    }

    const onEdit = async () => {

        const values = form.getValues();

        const reqBody = {
            chase_on: values.chase_on,
            chased_by: values.chased_by,
            description: values.description,
            type: values.type,
            contact_person: values.reminder_to,
            completed: values.completed,
            reminder: values.reminder_to !== '',
            reminder_to: values.reminder_to
        }

        await updateOneFollowUp(reqBody, followUpId);
        await fillData();
        form.setValue('chased_by', '');
        form.setValue('chase_on', new Date());
        form.setValue('type', '');
        form.setValue('description', '');
        form.setValue('reminder_to', '');
        form.setValue('completed', false);

        handleClose()

    }

    const ActionsRenderer = (params) => {

        return (
            <div className='flex items-center h-full'>
                <div className='cursor-pointer' onClick={() => handleEdit(params)}>
                    <MdEdit size={20} />
                </div>
            </div>
        );
      
    };

    const rowData = useMemo(() => getRowData(getAllFollowUps), [getAllFollowUps]);
  
    const columnDefs = useMemo(() => [
        { field: 'chaseOn', headerCheckboxSelection: true, checkboxSelection: true, filter: 'agDateColumnFilter' },
        // { field: 'chaseOn', headerName: 'Chased On', filter: 'agDateColumnFilter' },
        { field: 'chasedBy', headerName: 'Chased By', filter: 'agTextColumnFilter' },
        { field: 'description', headerName: 'Description', filter: 'agTextColumnFilter' },
        { field: 'followUpType', headerName: 'Follow Up type', filter: 'agTextColumnFilter' },
        { field: 'phone', headerName: 'Phone', filter: 'agTextColumnFilter' },
        { field: 'email', headerName: 'Email', filter: 'agTextColumnFilter' },
        { field: 'mobile', headerName: 'Mobile', filter: 'agTextColumnFilter' },
        { field: 'actions', headerName: 'Actions', cellRenderer: ActionsRenderer }
    ], []);

    return (
        <Loader show={show}>

            <Dialog open={open} onOpenChange={handleClose}>

                <Form {...form} onSubmit={form.handleSubmit(onSubmit)} >
                    <form className='w-full'>

                        <DialogContent className="sm:max-w-[425px]">

                            <DialogHeader>
                                <DialogTitle>{formType} Follow Up</DialogTitle>
                                <DialogDescription>
                                    {formType} necessary follow-up details for enquiry
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex flex-col items-center gap-3 py-4 w-full h-[300px] overflow-auto">

                                <CustomGrid row={1} className='w-full p-2'>

                                    <DynamicFields form={form} data={followUps} module_name='follow-up-details' controls={controls} />

                                </CustomGrid>

                            </div>

                            <DialogFooter>
                                <Button type="button" variant='secondary' onClick={handleClose}>Cancel</Button>
                                <Button type='button' onClick={formType === 'Add' ? onSubmit : onEdit}>Save</Button>
                            </DialogFooter>

                        </DialogContent>

                    </form>
                </Form>

            </Dialog>

            <div className='w-full flex my-3'>
                <div className='flex items-center border rounded-md p-2 hover:bg-gray-100 transition-all duration-250' onClick={handleOpen}>
                    <CustomTooltip content='Add Follow Up' position='right'>
                        <AiOutlineFileAdd size={22} />
                    </CustomTooltip>
                </div>
            </div>

            <div className={"ag-theme-quartz w-full"} style={{ height: 500 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                    defaultColDef={defaultColDef}
                    rowSelection="multiple"
                    suppressRowClickSelection={true}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 25, 50]}
                />
            </div>

        </Loader>
    );

}
