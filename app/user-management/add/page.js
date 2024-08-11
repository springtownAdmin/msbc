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
import { userData } from '@/utils/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';

const Add = () => {

    const router = useRouter();

    const { createUser } = useAPI();

    const form = useForm({
        resolver: zodResolver(createZodValidation(userData)),
        defaultValues: putValues(userData)
    });
    
    const onSubmit = async (values) => {

        createUser(values);

        router.back();
    
    }
    
    const handleCancel = () => {

        router.back();

    }

    return (
      <>

        <Container id={3}>
    
          <Tabs defaultValue="user-details" className='w-full'>
            
            <TabsList>
              <TabsTrigger value="user-details">User Details</TabsTrigger>
            </TabsList>
    
            <TabsContent value="user-details" className="w-full">
              
              <div className='w-full'>
    
                <Form {...form}>
    
                  <form onSubmit={form.handleSubmit(onSubmit)}>
    
                    <Card className="w-full mb-3">
    
                        <CardHeader>
    
                              <CardTitle>User Details</CardTitle>
                              <CardDescription>Fill out all the necessary user details</CardDescription>
    
                        </CardHeader>
    
                        <CardContent>
    
                          <div className='w-full'>
    
                            <CustomGrid row={3} className='w-full'>
                                 
                                <DynamicFields form={form} data={userData} module_name='user-management-details' />    
    
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