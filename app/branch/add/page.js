"use client";

import { Container } from '@/components/container'
import { DynamicFields } from '@/components/dynamic-fields';
import { CustomGrid } from '@/components/grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useAPI from '@/hooks/useAPI';
import { createZodValidation, putValues } from '@/utils/constants';
import { branchData } from '@/utils/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';

const Add = () => {

  const router = useRouter();

  const { createBranch } = useAPI();

  const updatedBranch = branchData.filter((_, i) => i !== 0);

  const form = useForm({
    resolver: zodResolver(createZodValidation(updatedBranch)),
    defaultValues: putValues(updatedBranch)
  });

  function onSubmit(values) {

    // const itemData = { key: 'branch', data: values }
    // dispatch(addItem(itemData));
    // toast({ title: "Branch added successfully !", className: 'bg-green-100 border-green-300 text-green-600' });
    

    if (typeof window !== undefined || typeof window !== null) {

      let company_name = window.localStorage.getItem('company_name');
      values.company_name = company_name;
      createBranch(values);
      router.push('/branch');


    }
    
  }

  const handleCancel = () => {

    router.push('/branch')

  }


  return (
    <>

      <Container id={2}>

        <Tabs defaultValue="branch-details" className='w-full'>
          
          <TabsList>
            <TabsTrigger value="branch-details">Branch Details</TabsTrigger>
            {/* <TabsTrigger value="images" disabled>Images</TabsTrigger>
            <TabsTrigger value="bank-details" disabled>Bank Details</TabsTrigger>
            <TabsTrigger value="advance-payment-details" disabled>Advance Payment Details</TabsTrigger> */}
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
                              
                              <DynamicFields form={form} data={updatedBranch} module_name='branch-details' />    

                          </CustomGrid>

                        </div>

                      </CardContent>

                  </Card>

                  <div className='flex gap-3 justify-end'>
                      <Button type='button' variant='secondary' onClick={handleCancel}>Cancel</Button>
                      <Button>Save</Button>
                  </div>

                </form>

              </Form>

            </div>

          </TabsContent>
        
        </Tabs>

      </Container>

    </>
  );

}

export default Add