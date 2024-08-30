"use client";

import React, { useEffect, useState } from 'react';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { breakData, createZodValidation, dateFormatter, getNumber, putValues, toSnakeCase } from '@/utils/constants';
import { CustomFields } from '@/components/custom-fields';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { enquiryData, fieldData } from '@/utils/data';
import { DynamicFields } from '@/components/dynamic-fields';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomGrid } from '@/components/grid';
import { ProductDetails } from '@/components/product-details';
import axios from 'axios';
import { template01 } from '@/helper/templates';
import useAPI from '@/hooks/useAPI';
import { FollowUpDetails } from '@/components/follow-ups';
import useLoader, { Loader } from '@/hooks/useLoader';
import wrapPermissionCheck from '@/components/common/wrapPermissionCheck';
import useStorage from '@/hooks/useStorage';

const Add = () => {

    const { toast } = useToast();
    const router = useRouter();
    const { getOrganizations, createEnquiry, getOrganization, getStatuses, getBranches, getUsers } = useAPI();

    const sections = breakData(enquiryData, [ 'enquiry_by', 'billing_address', 'notes' ])

    const [ customerData, setCustomerData ] = useState(sections[1]);
    const [ enquiryDetails, setEnquiryDetails ] = useState(sections[0]);
    const [ sectionTab, setSectionTab ] = useState('enquiry-details');
    const [ productData, setProductData ] = useState([]);
    const { show, showLoader, hideLoader } = useLoader();
    const { getItem } = useStorage();

    const form = useForm({
        resolver: zodResolver(createZodValidation(enquiryData)),
        defaultValues: putValues(enquiryData, 'no-default')
    });

    const onSelectCustomer = async (customer_id) => {

        const currentCustomer = await getOrganization(customer_id);
        const keys = [ 'contact_name', 'email', 'mobile_no', 'phone_no', 'pin_code', 
            'address', 'shipping_address', 'billing_address' ];

        form.setValue('customer', `${currentCustomer.organization_id}`);

        keys.forEach((x) => {

            form.setValue(x, currentCustomer[x]);

        })


    }

    const onSelectStatus = (status_id) => form.setValue('status', `${status_id}`);

    const onSelectBranch = (branch_id) => form.setValue('branch', `${branch_id}`);

    const onSelectSalesRep = (user_id) => form.setValue('sales_representative', `${user_id}`);


    const controls = {
        enquiry: [
            {
                name: 'Status',
                onSelect: onSelectStatus
            },
            {
                name: 'Branch',
                onSelect: onSelectBranch
            },
            {
                name: 'Sales Representative',
                onSelect: onSelectSalesRep
            }
        ],
        customer: [
            {
                name: 'Customer',
                onSelect: onSelectCustomer
            }
        ]
    }

    useEffect(() => {

        const fillData = async () => {

            showLoader();
            const listOrganization = await getOrganizations();
            const listStatus = await getStatuses();
            const listBranches = await getBranches();
            const listUsers = await getUsers();

            const allMenus = getItem("Menus");

            const selectedCustomer = listOrganization.map((x) => ({ id: x.organization_id, value: `${x.organization_id}`, label: x.name }));
            const status_result = listStatus.map((x) => ({ id: x.id, value: `${x.id}`, label: x.status_name }));
            const branch_result = listBranches.map((x) => ({ id: x.branch_id, value: `${x.branch_id}`, label: x.branch_name }));
            const user_result = listUsers.map((x) => ({ id: x.user_id, value: `${x.user_id}`, label: x.first_name }));
            const result = customerData.map((x) => (x.name === 'Customer' ? { ...x , list: selectedCustomer } : x));

            const result2 = enquiryDetails.map((x) => {

                if(x.name === 'Status') return { ...x, list: status_result };

                if(x.name === 'Branch') return { ...x, list: branch_result };

                if(x.name === 'Sales Representative' ) return { ...x, list: user_result }

                return x;

            })
            
            setCustomerData(result);       
            setEnquiryDetails(result2);
            hideLoader();

            // if (listOrganization.length) {

            //     const selectedCustomer = listOrganization.map((x) => ({ id: x.organization_id, value: `${x.organization_id}`, label: x.name }));
            //     const status_result = listStatus.map((x) => ({ id: x.id, value: `${x.id}`, label: x.status_name }));
            //     const branch_result = listBranches.map((x) => ({ id: x.branch_id, value: `${x.branch_id}`, label: x.branch_name }));
            //     const user_result = listUsers.map((x) => ({ id: x.user_id, value: `${x.user_id}`, label: x.first_name }));
            //     const result = customerData.map((x) => (x.name === 'Customer' ? { ...x , list: selectedCustomer } : x));
            //     const result2 = enquiryDetails.map((x) => {

            //         if(x.name === 'Status') return { ...x, list: status_result };

            //         if(x.name === 'Branch') return { ...x, list: branch_result };

            //         if(x.name === 'Sales Representative' ) return { ...x, list: user_result }

            //         return x;

            //     })
                
            //     console.log(result2)
            //     setCustomerData(result);       
            //     setEnquiryDetails(result2);         

            // }

        }

        fillData();

    }, []);

    const onSubmit = async (values) => {

        // console.log(values);
        await createEnquiry({
            ...values,
            customer: parseInt(values.customer),
            type: values.type[0],
            enquiry_by: values.enquiry_by[0],
            status: parseInt(values.status),
            branch: parseInt(values.branch),
            enquiry_by: parseInt(values.enquiry_by[0]),
            sales_representative: parseInt(values.sales_representative),
            products: productData
        });

        router.back();
        
    }

    const handleCancel = () => {

        router.back();

    }

    const handlePrint = async () => {

        try {

            const reqBody = { filepath: 'images/msbc-logo.png' }
            const res = await axios.post('/api/get-base64', reqBody);
            const htmlContent = template01(res.data.response);

            // console.log(htmlContent)

            const response = await fetch('/api/print', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ htmlContent: htmlContent }),
                
            });
        
            if (response.ok) {
            
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.setAttribute('download', 'customer-enquiry.pdf');
                document.body.appendChild(a);
                a.click();
                a.parentNode.removeChild(a);
                // setPdfUrl(url);
                // a.download();
        
            } else {
        
                toast.error('Error generating PDF');
            
            }


        } catch (e) {

            toast({ title: 'Something went wrong!', variant: 'destructive' });

        }

    }

    const handleAddCustomer = () => {
        router.push('/organization/add');
    }

    const handleTabChange = (value) => setSectionTab(value);

    return (

        <>

            <Container id={4}>

                <Loader show={show}>

                    <Tabs value={sectionTab} onValueChange={handleTabChange} className='w-full'>
                        
                        <TabsList>
                            <TabsTrigger value="enquiry-details" >Enquiry Details</TabsTrigger>
                            <TabsTrigger value="document-management" >Document Management</TabsTrigger>
                            <TabsTrigger value="product-details" >Product Details</TabsTrigger>
                            <TabsTrigger value="follow-up" disabled>Follow Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="enquiry-details" className="w-full">

                            <Form {...form}>

                                <form  onSubmit={form.handleSubmit(onSubmit)}>

                                    <div className='flex flex-wrap gap-3 w-full'>

                                        <Card className="w-full">

                                            <CardHeader>

                                                <CardTitle>Enquiry Details</CardTitle>
                                                <CardDescription>Fill out all necessary enquiry details</CardDescription>

                                            </CardHeader>

                                            <CardContent>

                                                <CustomGrid row={3}>
                                                    <DynamicFields data={enquiryDetails} form={form} module_name='enquiry-details' controls={controls.enquiry} />
                                                </CustomGrid>

                                            </CardContent>

                                        </Card>

                                        <Card className="w-full">

                                            <CardHeader>

                                                <div className='flex justify-between w-full'>
                                                    <div>
                                                        <CardTitle>Customer Details</CardTitle>
                                                        <CardDescription>Fill out all necessary customer details</CardDescription>
                                                    </div>

                                                    <div>
                                                        <Button type='button' variant='secondary' onClick={handleAddCustomer}>Add Customer</Button>
                                                    </div>
                                                </div>

                                            </CardHeader>

                                            <CardContent>

                                                <CustomGrid row={3}>
                                                    <DynamicFields data={customerData} form={form} module_name='customer-details' controls={controls.customer} />
                                                </CustomGrid>

                                            </CardContent>

                                        </Card>

                                        <Card className="w-full">

                                            <CardHeader>
                                                <CardTitle>Project Details</CardTitle>
                                                <CardDescription>Fill out all necessary project details</CardDescription>
                                            </CardHeader>

                                            <CardContent>

                                                <CustomGrid row={3}>
                                                    <DynamicFields data={sections[2]} form={form} module_name='project-details' />
                                                </CustomGrid>

                                            </CardContent>

                                        </Card>

                                        <div className='flex justify-end gap-3 w-full'>
                                            <Button variant="secondary" type='button' onClick={handleCancel}>Cancel</Button>
                                            <Button variant="secondary" type='button' onClick={handlePrint}>Print</Button>
                                            <Button>Save</Button>
                                        </div>

                                    </div>

                                </form>

                            </Form>

                        </TabsContent>

                        <TabsContent value="document-management" className="w-full">

                            <Card className="w-full">
                
                                <CardHeader>
                                    <CardTitle>Document Management</CardTitle>
                                    <CardDescription>Attach necessary documents required</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <CustomFields form={form} type='file' />
                                </CardContent>

                            </Card>

                        </TabsContent>

                        <TabsContent value="product-details" className="w-full">

                            <Card className="w-full">
                                
                                <CardHeader>
                                    <CardTitle>Product Details</CardTitle>
                                    <CardDescription>Fill out all necessary product details</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    
                                    <ProductDetails productData={productData} setProductData={setProductData} />

                                </CardContent>

                            </Card>

                        </TabsContent>

                        <TabsContent value="follow-up" className="w-full">

                            <Card className="w-full">

                                <CardHeader>
                                    <CardTitle>Follow Up</CardTitle>
                                    <CardDescription>List of all the follow up</CardDescription>
                                </CardHeader>

                                <CardContent>

                                    <FollowUpDetails />

                                </CardContent>

                            </Card>

                        </TabsContent>
                    
                    </Tabs>

                </Loader>

            </Container>

        </>

    );

}

export default wrapPermissionCheck(Add, 'can_add');