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
import { BsStars } from "react-icons/bs";
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const MarkdownComponent = ({ markdown }) => {

    const htmlContent = md.render(markdown);

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;

};

export const FollowUpDetails = ({ enquiryNo = '', enquiry_id = 0 }) => {

    const [open, setOpen] = useState(false);
    const [followUps, setFollowUps] = useState(followUpData);
    const [getAllFollowUps, setAllFollowUps] = useState([]);
    const { show, showLoader, hideLoader } = useLoader();

    const { getUsers, addFollowUp, getEnquiryFollowUps, getOneFollowUp, updateOneFollowUp, getFollowUpSummary } = useAPI();
    const followValues = putValues(followUps);
    const [followUpSummary, setFollowUpSummary] = useState('');
    const [summaryLoader, setSummaryLoader] = useState(false);

    const [formType, setFormType] = useState('Add');
    const [followUpId, setFollowUpId] = useState(0);
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

        const reminderToList = data.map((x) => ({ id: x.user_id, value: `${x.user_id}`, label: `${x.first_name} ${x.last_name}` }))

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
        setFormType('Add');

        form.setValue('chased_by', '');
        form.setValue('chase_on', new Date());
        form.setValue('type', '');
        form.setValue('description', '');
        form.setValue('reminder_to', '');
        form.setValue('completed', false);

    }

    const onSubmit = async () => {

        const values = form.getValues();

        console.log(new Date(values.chase_on))
        console.log(values.chase_on)

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

        showLoader();
        await addFollowUp(updatedData);
        await fillData();
        handleClose();
        hideLoader();

    }

    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
    };

    const handleEdit = async (params) => {

        const result = params.data;
        const singleFollowUp = await getOneFollowUp(result.id);
        const data = await getUsers();
        const reminderToList = data.map((x) => ({ id: x.user_id, value: `${x.user_id}`, label: `${x.first_name} ${x.last_name}` }))

        const getChasedById = reminderToList.filter((x) => x.label === singleFollowUp.chased_by);
        form.setValue('chased_by', getChasedById[0].value);
        form.setValue('chase_on', new Date(singleFollowUp.chase_on));
        form.setValue('type', singleFollowUp.follow_up_type);
        form.setValue('description', singleFollowUp.description);
        form.setValue('reminder_to', `${singleFollowUp.reminder_to ?? ''}`);
        form.setValue('completed', singleFollowUp.completed);

        setFormType('Edit');
        setFollowUpId(result.id)
        setOpen(true)

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

        console.log(reqBody);

        await updateOneFollowUp(reqBody, followUpId);
        await fillData();
        form.setValue('chased_by', '');
        form.setValue('chase_on', new Date());
        form.setValue('type', '');
        form.setValue('description', '');
        form.setValue('reminder_to', '');
        form.setValue('completed', false);

        setFormType('Add');
        setOpen(false)

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
        { field: 'actions', headerName: 'Actions', cellRenderer: ActionsRenderer, pinned: 'right', width: 100 }
    ], []);

    const [openSummary, setOpenSummary] = useState(false);

    const handleOpenSummary = async () => {
        setOpenSummary(true);
        setSummaryLoader(true);
        const collectFollowUps = getAllFollowUps.map((x) => ({ chase_on: x.chaseOn, chased_by: x.chasedBy, description: x.description }));
        const reqBody = { enquiry_no: enquiryNo, follow_ups: collectFollowUps };

        console.log(reqBody);
        const summary = await getFollowUpSummary(reqBody);
        setFollowUpSummary(summary?.response);
        setSummaryLoader(false);
    }

    const handleCloseSummary = () => setOpenSummary(false);

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
                                {formType === 'Add' ?
                                    <Button type='button' onClick={onSubmit}>Save</Button> :
                                    <Button type='button' onClick={onEdit}>Save</Button>
                                }
                                {/* <Button type='button' onClick={formType === 'Add' ? onSubmit : onEdit}>Save</Button> */}
                            </DialogFooter>

                        </DialogContent>

                    </form>
                </Form>

            </Dialog>

            <Dialog open={openSummary} onOpenChange={handleCloseSummary}>
                <DialogContent className="sm:max-w-[700px] w-[60%]">

                    <DialogHeader>
                        <DialogTitle> <div className='flex items-center gap-3 w-[150px]'><BsStars /> AI Summary</div></DialogTitle>
                        <DialogDescription>
                            Summary for the enquiry - {enquiryNo}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-center gap-2 w-full h-[400px] border rounded-sm overflow-auto">

                        {summaryLoader ? <div className='image-placeholder placeholder rounded-sm h-full w-full'></div> :

                            <pre className='font-sans text-sm p-2' style={{ overflow: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                <MarkdownComponent markdown={followUpSummary} />
                            </pre>
                        }

                    </div>

                    <DialogFooter>
                        <Button type="button" variant='secondary' onClick={handleCloseSummary}>Cancel</Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>

            <div className='w-full justify-between flex my-3'>
                <div className='flex items-center border rounded-md p-2 hover:bg-gray-100 transition-all duration-250' onClick={handleOpen}>
                    <CustomTooltip content='Add Follow Up' position='right'>
                        <AiOutlineFileAdd size={22} />
                    </CustomTooltip>
                </div>

                <div>
                    <Button className='flex gap-2' type='button' onClick={handleOpenSummary}>
                        <BsStars />
                        Generate Summary
                    </Button>
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
