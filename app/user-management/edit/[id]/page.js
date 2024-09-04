"use client";

import { Container } from '@/components/container'
import { DynamicFields } from '@/components/dynamic-fields';
import { CustomGrid } from '@/components/grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from '@/components/ui/use-toast';
import { updateItem } from '@/lib/slices/list';
import { BACKEND_API, createZodValidation } from '@/utils/constants';
import { userData } from '@/utils/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import useAPI from '@/hooks/useAPI';
import useLoader, { Loader } from '@/hooks/useLoader';
import wrapPermissionCheck from '@/components/common/wrapPermissionCheck';

const Edit = ({ params }) => {

  const router = useRouter();
  const { getUser, updateUser, getGroups } = useAPI();
  const [usersData, setUsersData] = useState(userData);
  const { show, hideLoader, showLoader } = useLoader();
  const id = params.id;

  const [user, setUser] = useState(null);

  const form = useForm({
    resolver: zodResolver(createZodValidation(usersData)),
    defaultValues: user
  });

  const onSelectRole = (user_role_id) => form.setValue('user_role', user_role_id);

  const controls = [
    {
      name: 'User Role',
      onSelect: onSelectRole
    }
  ]

  useEffect(() => {

    const getData = async () => {

      showLoader();
      const result = await getUser(id);
      const groups = await getGroups();
      const roleList = groups.map((x) => ({ id: x.group_id, value: `${x.group_id}`, label: x.group_name }));
      const updatedUsersData = usersData.map((v) => (v.name === 'User Role' ? { ...v, list: roleList } : v));

      setUsersData(updatedUsersData);

      setUser({ ...result, user_role: `${result.user_role}` });
      hideLoader();

    }

    getData();

  }, [params]);

  useEffect(() => {
    if (user) {
      form.reset(user);
    }
  }, [user, form.reset]);

  if (!params) return null;

  const onSubmit = async (values) => {

    await updateUser(id, values);
    router.back();

  }

  const handleCancel = () => {

    router.back();

  }


  return (
    <>

      <Container id={3} route='/user-management'>

        <Loader show={show}>

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

                            <DynamicFields form={form} data={usersData} module_name='user-management-details' controls={controls} />

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

        </Loader>

      </Container>

    </>
  );

}

export default wrapPermissionCheck(Edit, 'can_edit');