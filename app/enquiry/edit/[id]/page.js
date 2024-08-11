"use client"

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { enquiryformSchema } from '@/helper/schema';
import { dateFormatter } from '@/utils/constants';
import { CustomFields } from '@/components/custom-fields';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Edit = ({ params }) => {

  const id = params.id;

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.list);
  const enquiry_list = data.enquiry;
  // const formList = useSelector((state) => state.enquiry_list);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {

    if (enquiry_list.length === 0) {

      router.push('/enquiry');
      return;

    }

  }, [params, router, enquiry_list]);

  if (enquiry_list.length === 0) return null;

  const formState = enquiry_list.find((item) => item.enquiry_no === id);
  const formIndex = enquiry_list.findIndex((item) => item.enquiry_no === id);

  const [showProductDetails, setShowProductDetails] = useState(false);

  const form = useForm({

    resolver: zodResolver(enquiryformSchema),
    defaultValues: {
      ...formState,
      enquiry_date: dateFormatter(formState.enquiry_date),
    }

  })

  function onSubmit(values) {

    console.log(values);

    toast({ title: "Enquiry updated successfully !", className: 'bg-green-100 border-green-300 text-green-600' });

    const newValues = { ...values, enquiry_date: dateFormatter(values.enquiry_date) }

    // dispatch(updateEnquiry({ index: formIndex, enquiry: newValues }));
    // dispatch(clearForm());
    router.push('/enquiry');

    console.log(formList)

  }

  const handleProduct = () => {

    setShowProductDetails(true);

  }

  const handleCancel = () => {

    router.push('/enquiry');

  }

  const typeOptions = ['Trade', 'Contract', 'Phone Marketing', 'Retail', 'Villas', 'Projects'];
  const branchOptions = ['Head Office'];
  const statusOptions = ['Lead In', 'Quote In Progress', 'Waiting Information - Cost.', 'Lost', 'Quote Ready', 'Waiting Information - Supl.'];
  const byOptions = ['Admin', 'User', 'Sales'];
  const estimatorOptions = [...byOptions];
  const salesRepresentativeOptions = [...byOptions];
  const enquiryByOptions = ['PHONE', 'E-MAIL', 'MARKETING'];
  const customerOptions = ['HolboxAI', 'MSBC'];
  const countryOptions = ['India', 'US', 'UK'];

  return (

    <>

      <Container id={4}>

        <Form {...form}>

          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-wrap gap-3 w-full'>

            <Card className="w-full">

              <CardHeader>
                <CardTitle>Enquiry Details</CardTitle>
                <CardDescription>Fill out all necessary enquiry details</CardDescription>
              </CardHeader>

              <CardContent>

                <div className="flex gap-5 flex-wrap w-full">

                  <CustomFields form={form} type='text' name="enquiry_no" label="Enquiry No" placeholder="New Enquiry" disabled={true} />
                  <CustomFields form={form} type='date' name="enquiry_date" label="Enquiry Date" placeholder="Pick a date" />
                  <CustomFields form={form} type='multi-select' name="type" label="Type" placeholder="Choose type" list={typeOptions} />
                  <CustomFields form={form} type='select' name="branch" label="Branch" placeholder="Choose branch" list={branchOptions} />
                  <CustomFields form={form} type='select' name="status" label="Status" placeholder="Choose status" list={statusOptions} />
                  <CustomFields form={form} type='select' name="by" label="By" placeholder="Choose by" list={byOptions} />
                  <CustomFields form={form} type='select' name="estimator" label="Estimator" placeholder="Choose estimator" disabled={true} list={estimatorOptions} />
                  <CustomFields form={form} type='select' name="sales_representative" label="Sales Representative" placeholder="Choose sales representative" list={salesRepresentativeOptions} />
                  <CustomFields form={form} type='checkbox' name="enquiry_by" label="Enquiry By" placeholder="Choose enquiry by" list={enquiryByOptions} />

                </div>

              </CardContent>

            </Card>

            <Card className="w-full">

              <CardHeader className='flex flex-row justify-between'>

                <div className='flex flex-col gap-2'>
                  <CardTitle>Customer Details</CardTitle>
                  <CardDescription>Fill out all necessary customer details</CardDescription>
                </div>

                {/* <div>
                    <Button variant="outline" type='button' size="sm" className="w-fit ml-auto">Add Customer</Button>
                  </div> */}

              </CardHeader>

              <CardContent>

                <div className="flex gap-5 flex-wrap w-full">

                  {/* <CustomFields form={form} type='select' name="customer" label="Customer" placeholder="Choose customer" list={customerOptions} /> */}
                  <CustomFields form={form} type='text' name="customer" label="Customer" placeholder="Enter customer name" />
                  <CustomFields form={form} type='text' name="contact_name" label="Contact Name" placeholder="Enter contact person name" />
                  <CustomFields form={form} type='text' name="customer_email" label="Customer Email" placeholder="Enter customer email" />
                  <CustomFields form={form} type='number' name="mobile_no" label="Mobile No" placeholder="098 765 4321" />
                  <CustomFields form={form} type='number' name="phone_no" label="Phone No" placeholder="098 765 4321" />
                  <CustomFields form={form} type='select' name="country" label="Country" placeholder="Choose country" list={countryOptions} />
                  <CustomFields form={form} type='number' name="post_code" label="Post Code" placeholder="Enter post code" />
                  <CustomFields form={form} type='textarea' name="address" label="Address" placeholder="Type here..." />
                  <CustomFields form={form} type='textarea' name="delivery_address" label="Delivery Address" placeholder="Type here..." />
                  <CustomFields form={form} type='textarea' name="billing_address" label="Billing Address" placeholder="Type here..." />

                </div>

              </CardContent>

            </Card>

            <Card className="w-full">

              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>Fill out all necessary project details</CardDescription>
              </CardHeader>

              <CardContent>

                <div className="flex gap-5 flex-wrap w-full">

                  <CustomFields form={form} type='text' name="project_name" label="Project Name" placeholder="Enter project name" />
                  <CustomFields form={form} type='text' name="architect_name" label="Architect Name" placeholder="Enter architect name" disabled={true} />
                  <CustomFields form={form} type='text' name="site_reference" label="Site Reference" placeholder="Enter site reference" />
                  <CustomFields form={form} type='number' name="tentative_project_value" label="Tentative Project Value" placeholder="Enter tentative project value" />
                  <CustomFields form={form} type='textarea' name="notes" label="Notes" placeholder="Type here..." />

                </div>

              </CardContent>

            </Card>

            {/* <Card className="w-full">
    
                <CardHeader>
                  <CardTitle>Document Management</CardTitle>
                  <CardDescription>Attach necessary documents required</CardDescription>
                </CardHeader>
    
                <CardContent>
                  <CustomFields form={form} type='file' />
                </CardContent>
    
              </Card>

              {showProductDetails && <Card className="w-full">

                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>Fill out all necessary product details</CardDescription>
                </CardHeader>

                <CardContent>

                  <div className="flex gap-5 flex-wrap w-full">

                    <CustomFields form={form} type='text' name="project_name" label="Project Name" placeholder="Enter project name" />

                  </div>
                    
                </CardContent>

              </Card>} */}

            <div className='flex justify-end gap-3 w-full'>
              <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
              <Button type="submit">Update</Button>
            </div>

          </form>

        </Form>

      </Container>

    </>

  );

}

export default Edit