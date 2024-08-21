"use client"

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { enquiryformSchema } from '@/helper/schema';
import { breakData, createZodValidation, dateFormatter } from '@/utils/constants';
import { CustomFields } from '@/components/custom-fields';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAPI from '@/hooks/useAPI';
import { enquiryData } from '@/utils/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomGrid } from '@/components/grid';
import { DynamicFields } from '@/components/dynamic-fields';
import { ProductDetails } from '@/components/product-details';
import { FollowUpDetails } from '@/components/follow-ups';
import useLoader from '@/hooks/useLoader';

const Edit = ({ params }) => {

  const router = useRouter();
  const [ enquiry, setEnquiry ] = useState(null);
  const { getEnquiry } = useAPI();
  const { getOrganizations, updateEnquiry, getOrganization, getStatuses, getBranches, getUsers } = useAPI();
  const sections = breakData(enquiryData, [ 'enquiry_by', 'billing_address', 'notes' ]);
  const [ customerData, setCustomerData ] = useState(sections[1]);
  const [ enquiryDetails, setEnquiryDetails ] = useState(sections[0]);

  const [ sectionTab, setSectionTab ] = useState('enquiry-details');

  const [ productData, setProductData ] = useState([]);

  const { showLoader, hideLoader, Loader } = useLoader();

  const id = params.id;

  const onSelectCustomer = async (customer_id) => {

    const currentCustomer = await getOrganization(customer_id);
    const keys = [ 'contact_name', 'email', 'mobile_no', 'phone_no', 'pin_code', 
        'address', 'shipping_address', 'billing_address' ];

    form.setValue('customer', `${currentCustomer.organization_id}`);

    keys.forEach((x) => {

        form.setValue(x, currentCustomer[x]);

    })

  }

  useEffect(() => {

    const setData = async () => {

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
      const customerResult = customerData.map((x) => (x.name === 'Customer' ? { ...x , list: selectedCustomer } : x));

      const newEnquiryResult = enquiryDetails.map((x) => {

        if(x.name === 'Status') return { ...x, list: status_result };

        if(x.name === 'Branch') return { ...x, list: branch_result };

        if(x.name === 'Sales Representative' ) return { ...x, list: user_result }

        return x;

      })

      setEnquiryDetails(newEnquiryResult);
      setCustomerData(customerResult);

      const newResult = { ...result, enquiry_by: [result.enquiry_by], type: [result.type] };
      setEnquiry(newResult);
      await onSelectCustomer(parseInt(result.customer))
      setProductData(enquiry.products);
      hideLoader();


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

  function onSubmit(values) {

    console.log(values);
    updateEnquiry(id, { ...values, type: values.type[0], enquiry_by: values.enquiry_by[0] });
    router.back();


  }

  const handleCancel = () => {

    router.back();

  }

  const onSelectStaus = async (status_id) => form.setValue('status', `${status_id}`);

  const onSelectBranch = async (branch_id) => form.setValue('branch', `${branch_id}`);

  const onSelectSalesRep = async (user_id) => form.setValue('sales_representative', `${user_id}`);

  const controlsEnquiry = [
    {
        name: 'Status',
        onSelect: onSelectStaus
    },
    {
        name: 'Branch',
        onSelect: onSelectBranch
    },
    {
        name: 'Sales Representative',
        onSelect: onSelectSalesRep
    }
  ]

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
            console.log(url)
    
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

          <Loader>

            <Tabs value={sectionTab} onValueChange={handleTabChange} className='w-full'>
                
                <TabsList>
                    <TabsTrigger value="enquiry-details" >Enquiry Details</TabsTrigger>
                    <TabsTrigger value="document-management" >Document Management</TabsTrigger>
                    <TabsTrigger value="product-details" >Product Details</TabsTrigger>
                    <TabsTrigger value="follow-up">Follow Up</TabsTrigger>
                </TabsList>

                <TabsContent value="enquiry-details" className="w-full">

                    <Form {...form}>

                        <form onSubmit={form.handleSubmit(onSubmit)}>

                            <div className='flex flex-wrap gap-3 w-full'>

                                <Card className="w-full">

                                    <CardHeader>

                                        <CardTitle>Enquiry Details</CardTitle>
                                        <CardDescription>Fill out all necessary enquiry details</CardDescription>

                                    </CardHeader>

                                    <CardContent>

                                        <CustomGrid row={3}>
                                            <DynamicFields data={enquiryDetails} form={form} module_name='enquiry-details' controls={controlsEnquiry} />
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
                                            <DynamicFields data={customerData} form={form} module_name='customer-details' controls={[{ name: 'Customer', onSelect: onSelectCustomer }]} />
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
                                    <Button type="submit">Save</Button>
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

export default Edit