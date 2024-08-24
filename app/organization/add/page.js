"use client";

import { Container } from '@/components/container';
import { DynamicFields } from '@/components/dynamic-fields';
import { CustomGrid } from '@/components/grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useAPI from '@/hooks/useAPI';
import { createZodValidation, putValues } from '@/utils/constants';
import { organizationData } from '@/utils/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';

const Add = () => {

    const router = useRouter();
    const { createOrganization } = useAPI();

    const form = useForm({
        resolver: zodResolver(createZodValidation(organizationData)),
        defaultValues: putValues(organizationData, 'no-default')
    });

    const onSubmit = async (values) => {

        await createOrganization(values);
        router.back();

    }

    const handleCancel = () => {

        router.back();

    }


    return (
        <>
            <Container id={5}>

                <Tabs defaultValue="organization-details" className='w-full'>

                    <TabsList>
                        <TabsTrigger value="organization-details">Organization Details</TabsTrigger>
                    </TabsList>

                    <TabsContent value="organization-details" className="w-full">

                        <div className='w-full'>
                            
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    
                                    <Card className="w-full">

                                        <CardHeader>

                                            <CardTitle>Organization Details</CardTitle>
                                            <CardDescription>Fill out all necessary organization details</CardDescription>

                                        </CardHeader>

                                        <CardContent>

                                            <CustomGrid row={3}>
                                                <DynamicFields data={organizationData} form={form} module_name='organization-details' />
                                            </CustomGrid>

                                        </CardContent>

                                    </Card>

                                    <div className='flex justify-end gap-3 w-full mt-3'>
                                        <Button variant="secondary" type='button' onClick={handleCancel}>Cancel</Button>
                                        <Button type="submit">Save</Button>
                                    </div>

                                </form>
                            </Form>

                        </div>
                        
                    </TabsContent>

                </Tabs>
                
            </Container>
        </>
    )
}

export default Add