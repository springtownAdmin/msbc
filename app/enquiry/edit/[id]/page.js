"use client"

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { enquiryformSchema } from '@/helper/schema';
import { breakData, createZodValidation, dateFormatter, formatDateToYYYYMMDD, putValues } from '@/utils/constants';
import { CustomFields } from '@/components/custom-fields';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAPI from '@/hooks/useAPI';
import { emailData, enquiryData } from '@/utils/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomGrid } from '@/components/grid';
import { DynamicFields } from '@/components/dynamic-fields';
import { ProductDetails } from '@/components/product-details';
import { FollowUpDetails } from '@/components/follow-ups';
import useLoader, { Loader } from '@/hooks/useLoader';
import { Loader2, Printer, Stars } from 'lucide-react';
import axios from 'axios';
import { template01 } from '@/helper/templates';
import useCustomToast from '@/hooks/useCustomToast';
import wrapPermissionCheck from '@/components/common/wrapPermissionCheck';
import FileUploadSection from '@/components/FileUploadSection';
import { MdOutlineEmail } from "react-icons/md";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BsStars } from 'react-icons/bs';
import useStorage from '@/hooks/useStorage';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const MarkdownComponent = ({ markdown }) => {

    const htmlContent = md.render(markdown);

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;

};

const Edit = ({ params }) => {

    const router = useRouter();
    const [enquiry, setEnquiry] = useState(null);
    const [emailEnquiry, setEmailEnquiry] = useState(null);
    const { getEnquiry } = useAPI();
    const { getOrganizations, updateEnquiry, getOrganization, getStatuses, getBranches, getUsers } = useAPI();
    const sections = breakData(enquiryData, ['enquiry_by', 'billing_address', 'notes']);
    const [customerData, setCustomerData] = useState(sections[1]);
    const [enquiryDetails, setEnquiryDetails] = useState(sections[0]);
    const [emailDetails, setEmailDetails] = useState(emailData);

    const [sectionTab, setSectionTab] = useState('enquiry-details');
    const { show, showLoader, hideLoader } = useLoader();

    const [productData, setProductData] = useState([]);
    const [openEmail, setOpenEmail] = useState(false);
    const [openSummary, setOpenSummary] = useState(false);
    const [listStatus, setListStatus] = useState([]);
    const [listCustomer, setListCustomer] = useState([]);
    const [emailSummary, setEmailSummary] = useState('');
    const { getItem } = useStorage();

    const { toast } = useToast();
    const { getEmailContent } = useAPI();
    const { showToast } = useCustomToast();

    const [printLoader, setPrintLoader] = useState(false);

    const id = params.id;

    const onSelectCustomer = async (customer_id) => {

        const currentCustomer = await getOrganization(customer_id);
        const keys = ['contact_name', 'email', 'mobile_no', 'phone_no', 'pin_code',
            'address', 'shipping_address', 'billing_address'];

        form.setValue('customer', `${currentCustomer.organization_id}`);

        keys.forEach((x) => {

            form.setValue(x, currentCustomer[x]);

        })

    }

    const emailForm = useForm({
        resolver: zodResolver(createZodValidation(emailDetails)),
        defaultValues: putValues(emailDetails)
    })

    useEffect(() => {

        const setData = async () => {

            try {

                showLoader();
                const result = await getEnquiry(id);
                const listOrganization = await getOrganizations();
                const listStatus = await getStatuses();
                const listBranches = await getBranches();
                const listUsers = await getUsers();

                const selectedCustomer = listOrganization.map((x) => ({ id: x.organization_id, value: `${x.organization_id}`, label: x.name }));
                const status_result = listStatus.map((x) => ({ id: x.id, value: `${x.id}`, label: x.status_name }));
                const branch_result = listBranches.map((x) => ({ id: x.branch_id, value: `${x.branch_id}`, label: x.branch_name }));
                const user_result = listUsers.map((x) => ({ id: x.user_id, value: `${x.user_id}`, label: x.first_name }));
                const customerResult = customerData.map((x) => (x.name === 'Customer' ? { ...x, list: selectedCustomer } : x));

                setListStatus(status_result)
                setListCustomer(selectedCustomer)
                const newEnquiryResult = enquiryDetails.map((x) => {

                    if (x.name === 'Status') return { ...x, list: status_result };

                    if (x.name === 'Branch') return { ...x, list: branch_result };

                    if (x.name === 'Sales Representative') return { ...x, list: user_result }

                    return x;

                })

                setEnquiryDetails(newEnquiryResult);
                setCustomerData(customerResult);

                const newResult = { ...result, enquiry_by: result.enquiry_by, type: result.type, tentative_project_value: `${result.tentative_project_value}` };
                setEnquiry(newResult);
                await onSelectCustomer(parseInt(result.customer))
                setProductData(result.products);
                emailForm.setValue('enquiry_no', result.enquiry_no)

            } catch (e) {

                showToast(500, e.message);

            } finally {

                hideLoader();

            }

        }

        setData();

    }, [params]);

    const form = useForm({
        resolver: zodResolver(createZodValidation(enquiryData)),
        defaultValues: enquiry
    });

    useEffect(() => {
        if (enquiry) {
            form.reset(enquiry);
        }
    }, [enquiry, form.reset]);

    if (!params) return null;

    const onSubmit = async (values) => {

        const updatedData = {
            ...values,
            type: values.type,
            enquiry_by: values.enquiry_by,
            estimator: '',
            country: '',
            by: '',
            notes: '',
            products: productData
        }

        await updateEnquiry(id, updatedData);
        router.back();


    }

    const handleCancel = () => {

        router.back();

    }

    const onSelectStatus = (status_id) => form.setValue('status', `${status_id}`);

    const onSelectBranch = (branch_id) => form.setValue('branch', `${branch_id}`);

    const onSelectSalesRep = (user_id) => form.setValue('sales_representative', `${user_id}`);

    const onSelectReceiver = (user_id) => form.setValue('receiver', `${user_id}`);

    const userControls = [{ name: 'Receiver', onSelect: onSelectReceiver }];

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

    const handlePrint = async () => {

        try {

            setPrintLoader(true);
            const reqBody = { filepath: 'images/msbc-logo.png' }
            const res = await axios.post('/api/get-base64', reqBody);

            const formDetails = form.getValues();

            const printData = {
                enquiry_no: formDetails.enquiry_no,
                date: formatDateToYYYYMMDD(formDetails.enquiry_date),
                site_reference: formDetails.site_reference,
                enquiry_by: enquiryDetails[5].value,
                t: formDetails.phone,
                m: formDetails.mobile,
                e: formDetails.email,
                customer_name: customerData[0].list.filter(x => x.value === formDetails.customer)[0].label,
                contact_name: formDetails.contact_name,
                address: formDetails.address,
                billing_address: formDetails.billing_address,
                delivery_address: formDetails.shipping_address,
                product_details: formDetails.products,
            }

            const htmlContent = template01(res.data.response, printData);

            console.log(htmlContent)

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
                console.log(url)

            } else {

                toast.error('Error generating PDF');

            }


        } catch (e) {

            toast({ title: 'Something went wrong!', variant: 'destructive' });

        } finally {

            setPrintLoader(false);

        }

    }

    const handleAddCustomer = () => {
        router.push('/organization/add');
    }

    const handleTabChange = (value) => setSectionTab(value);

    const handleEmailClose = () => {

        setOpenEmail(false);
        emailForm.setValue('receiver', '');
        emailForm.setValue('email_prompt', '');

    }

    const handleOpenEmailBox = () => setOpenEmail(true);

    const onSubmitEmailForm = async () => {

        const result = emailForm.getValues();
        const sender = `${getItem('first_name')} ${getItem('last_name')}`;
        const product_list = enquiry.products?.map((x) => ({
            name: x.product_name,
            code: x.product_name,
            quantity: x.quantity,
            description: x.description
        }))

        const reqBody = {
            sender: sender,
            receiver: result.receiver,
            Enq_details: {
                Enq_No: enquiry.enquiry_no,
                Enq_createdBy: sender,
                Enq_createdDate: formatDateToYYYYMMDD(enquiry.enquiry_date),
                Enq_status: listStatus.filter((x) => x.value === enquiry.status)[0].label
            },
            customer_details: {
                customer_name: listCustomer.filter((x) => x.value === enquiry.customer)[0].label,
                customer_email: enquiry.email,
                customer_phone: enquiry.phone,
                customer_address: enquiry.address,
                customer_country: ''
            },
            product_deatils: product_list,
            prompt: result.email_prompt
        }

        setOpenSummary(true);
        const resp = await getEmailContent(reqBody);
        setEmailSummary(resp.response);
        setOpenSummary(false);

    }

    const emptyEmailContent = () => setEmailSummary('');

    return (

        <>

            <Container id={4} route='/enquiry'>

                <Loader show={show}>

                    <Dialog open={openEmail} onOpenChange={handleEmailClose}>

                        <Form {...emailForm} onSubmit={emailForm.handleSubmit(onSubmitEmailForm)} >
                            <form className='w-full'>

                                <DialogContent className="sm:max-w-[700px] w-[60%]">

                                    <DialogHeader className='space-y-0 mb-0'>
                                        <DialogTitle>Email Details</DialogTitle>
                                        {(!openSummary && emailSummary === '') &&
                                            <DialogDescription>
                                                Fill out all the required email details
                                            </DialogDescription>
                                        }
                                    </DialogHeader>

                                    {openSummary ?
                                        <div className='image-placeholder placeholder rounded-sm w-full'></div> :

                                        emailSummary === '' ?

                                            <div className="w-full overflow-auto">

                                                <CustomGrid row={1} className='w-full p-2'>

                                                    <DynamicFields form={emailForm} data={emailData} module_name='email-details' />

                                                </CustomGrid>

                                            </div> :
                                            <div className="flex flex-col items-center gap-3 py-4 w-full h-[500px] overflow-auto border p-2 rounded-md">
                                                <pre className='font-sans text-sm' style={{ overflow: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                                    <MarkdownComponent markdown={emailSummary} />
                                                </pre>
                                            </div>
                                    }

                                    <DialogFooter>
                                        <Button type="button" variant='secondary' onClick={(!openSummary && emailSummary === '') ? handleEmailClose : emptyEmailContent}>Cancel</Button>
                                        {(!openSummary && emailSummary === '') &&
                                            <Button type='button' className='flex gap-2' onClick={onSubmitEmailForm}>
                                                <BsStars /> Generate Content
                                            </Button>}
                                    </DialogFooter>

                                </DialogContent>

                            </form>
                        </Form>

                    </Dialog>

                    <Form {...form}>

                        <form onSubmit={form.handleSubmit(onSubmit)}>

                            <Tabs value={sectionTab} onValueChange={handleTabChange} className='w-full'>

                                <div className='flex justify-between w-full'>

                                    <div>
                                        <TabsList>
                                            <TabsTrigger value="enquiry-details" >Enquiry Details</TabsTrigger>
                                            <TabsTrigger value="document-management" >Document Management</TabsTrigger>
                                            <TabsTrigger value="product-details" >Product Details</TabsTrigger>
                                            <TabsTrigger value="follow-up">Follow Up</TabsTrigger>
                                        </TabsList>
                                    </div>

                                    <div>
                                        {sectionTab === 'enquiry-details' && <Button variant="secondary" type='button' onClick={handleOpenEmailBox}>
                                            <MdOutlineEmail ize={18} className="mr-2 h-4 w-4" />
                                            Email
                                        </Button>}
                                    </div>

                                </div>

                                <TabsContent value="enquiry-details" className="w-full">

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

                                        {/* <div className='flex justify-end gap-3 w-full'>
                                    <Button variant="secondary" type='button' onClick={handleCancel}>Cancel</Button>
                                    <Button variant="secondary" type='button' onClick={handlePrint}>
                                        <Printer size={18} className="mr-2 h-4 w-4" />
                                        Print
                                    </Button>
                                    <Button type="submit">Save</Button>
                                </div> */}

                                    </div>

                                </TabsContent>

                                <TabsContent value="document-management" className="w-full">

                                    <Card className="w-full">

                                        <CardHeader>
                                            <CardTitle>Document Management</CardTitle>
                                            <CardDescription>Attach necessary documents required</CardDescription>
                                        </CardHeader>

                                        <CardContent>
                                            {/* <CustomFields form={form} type='file' /> */}
                                            <FileUploadSection enquiry_no={enquiry?.enquiry_no} />
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
                                            <CardDescription>List of all the follow ups for enquiry - {enquiry?.enquiry_no}</CardDescription>
                                        </CardHeader>

                                        <CardContent>

                                            <FollowUpDetails enquiryNo={enquiry?.enquiry_no} enquiry_id={id} />

                                        </CardContent>

                                    </Card>

                                </TabsContent>

                                <div className='flex justify-end gap-3 w-full mt-4'>
                                    <Button variant="secondary" type='button' onClick={handleCancel}>Cancel</Button>

                                    {printLoader
                                        ?
                                        <Button variant="secondary" disabled >
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Wait
                                        </Button>

                                        :
                                        <Button variant="secondary" type='button' onClick={handlePrint}>
                                            <Printer size={18} className="mr-2 h-4 w-4" />
                                            Print
                                        </Button>
                                    }

                                    <Button type="submit">Save</Button>
                                </div>

                            </Tabs>

                        </form>

                    </Form>

                </Loader>

            </Container>

        </>

    );

}

export default wrapPermissionCheck(Edit, 'can_edit');