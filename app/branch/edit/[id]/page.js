"use client";

import { Container } from '@/components/container'
import { DynamicFields } from '@/components/dynamic-fields';
import { CustomGrid } from '@/components/grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useAPI from '@/hooks/useAPI';
import useLoader, { Loader } from '@/hooks/useLoader';
import { createZodValidation } from '@/utils/constants';
import { branchData } from '@/utils/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import wrapPermissionCheck from '@/components/common/wrapPermissionCheck';

const Edit = ({ params }) => {

  const router = useRouter();
  const [ branch, setBranch ] = useState(null);
  const { getBranch, updateBranch } = useAPI();
  const { show, showLoader, hideLoader } = useLoader();
  const id = params.id;

  useEffect(() => {

    const setData = async () => {

      showLoader();
      const result = await getBranch(id);
      setBranch(result[0]);
      hideLoader();

    }

    setData();

  }, [params]);

  const form = useForm({
    resolver: zodResolver(createZodValidation(branchData)),
    defaultValues: branch
  });

  useEffect(() => {
    if (branch) {
      form.reset(branch);
    }
  }, [branch, form.reset]);

  if (!params) return null;

  function onSubmit(values) {

    updateBranch(values);
    router.push('/branch');
    
  }

  const handleCancel = () => {

    router.push('/branch')

  }


  return (
    <>

      <Container id={2}>

        <Loader show={show}>

          <Tabs defaultValue="branch-details" className='w-full'>
            
            <TabsList>
              <TabsTrigger value="branch-details">Branch Details</TabsTrigger>
              <TabsTrigger value="images" disabled>Images</TabsTrigger>
              <TabsTrigger value="bank-details" disabled>Bank Details</TabsTrigger>
              <TabsTrigger value="advance-payment-details" disabled>Advance Payment Details</TabsTrigger>
            </TabsList>

            <TabsContent value="branch-details" className="w-full">
              
              <div className='w-full'>

                <Form {...form}>

                  <form onSubmit={form.handleSubmit(onSubmit)}>

                    <Card className="w-full mb-3">

                        <CardHeader>

                              <CardTitle>Branch Details</CardTitle>
                              <CardDescription>Fill out all the necessary branch details</CardDescription>

                        </CardHeader>

                        <CardContent>

                          <div className='w-full'>

                            <CustomGrid row={3} className='w-full'>
                                
                                <DynamicFields form={form} module_name='branch-details' data={branchData.filter((_,i) => i !== 0).map(((x, j) => { if(j === 0) return { ...x, read_only: true }; return x; }))} />    

                            </CustomGrid>

                          </div>

                        </CardContent>

                    </Card>

                    {/* <Card className="w-full mb-3">

                        <CardHeader>

                            <div className='flex justify-between w-full'>
                                <div>
                                    <CardTitle>Billing Details</CardTitle>
                                    <CardDescription>Fill out all the necessary billing details</CardDescription>
                                </div>
                            </div>

                        </CardHeader>

                        <CardContent>

                            <CustomGrid row={3} className='w-full'>

                                <CustomFields type='textarea' label='Address' name='billing_address' form={form} />    
                                <CustomFields type='text' label='State' name='billing_state' form={form} />    
                                <CustomFields type='text' label='Country' name='billing_country' form={form} />    
                                <CustomFields type='text' label='Pincode' name='billing_pincode' form={form} />    

                            </CustomGrid>

                        </CardContent>

                    </Card>

                    <Card className="w-full mb-3">

                      <CardHeader>

                          <div className='flex justify-between w-full'>
                              <div>
                                  <CardTitle>Delivery Details</CardTitle>
                                  <CardDescription>Fill out all the necessary delivery details</CardDescription>
                              </div>
                          </div>

                      </CardHeader>

                      <CardContent>

                            <CustomGrid row={3} className='w-full'>

                                <CustomFields type='textarea' label='Address' name='delivery_address' form={form} />    
                                <CustomFields type='text' label='State' name='delivery_state' form={form} />    
                                <CustomFields type='text' label='Country' name='delivery_country' form={form} />    
                                <CustomFields type='text' label='Pincode' name='delivery_pincode' form={form} />

                            </CustomGrid>

                      </CardContent>

                    </Card> */}

                    <div className='flex gap-3 justify-end'>
                        <Button type='button' variant='secondary' onClick={handleCancel}>Cancel</Button>
                        <Button>Save</Button>
                    </div>

                  </form>

                </Form>

              </div>

            </TabsContent>
          
          </Tabs>

        </Loader>

      </Container>
      
    </>
  );

}

export default wrapPermissionCheck(Edit,'can_edit');