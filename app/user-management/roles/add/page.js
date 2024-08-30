"use client";

import { Container } from '@/components/container';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useContext, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from "@/components/ui/switch"
import { Input } from '@/components/ui/input';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { DynamicFields } from '@/components/dynamic-fields';
import { CustomGrid } from '@/components/grid';
import { useForm } from 'react-hook-form';
import { rolesData } from '@/utils/data';
import { createZodValidation, putValues } from '@/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import useAPI from '@/hooks/useAPI';
import useLoader, { Loader } from '@/hooks/useLoader';
import wrapPermissionCheck from '@/components/common/wrapPermissionCheck';

const Add = () => {

    const [permissions, setPermissions] = useState(null);
    const [editPerimssions, setEditPermissions] = useState([]);

    const form = useForm({
        resolver: zodResolver(createZodValidation(rolesData)),
        defaultValues: putValues(rolesData)
    })

    const { createGroup, getModules } = useAPI();
    const { show, showLoader, hideLoader } = useLoader();

    const router = useRouter();

    useEffect(() => {

        const fillData = async () => {

            showLoader();

            const getAllModules = await getModules();
            let obj = {};
            let arr = [];
            getAllModules.forEach((x) => {

                obj[x[1]] = { add: false, edit: false, view: false, id: x[0] };
                const currentPermission = { menu_id: x[0], add: false, edit: false, view: false, delete: false };
                arr.push(currentPermission);

            })

            setPermissions(obj);
            setEditPermissions(arr);

            hideLoader();

        }

        fillData();

    }, []);

    const handleSwitchChange = (module, permission) => {


        const allPermission = { ...permissions };
        const allEditPermissions = [ ...editPerimssions ];
        let currentModule = allPermission[module];
        const value = !allPermission[module][permission]

        if (permission === 'view') {


            currentModule[permission] = value;
            currentModule.add = value ? currentModule.add : false;
            currentModule.edit = value ? currentModule.edit : false;

            const { add, edit, view, id } = currentModule;

            const permissionIndex = allEditPermissions.findIndex((x) => x.menu_id === id);

            allEditPermissions[permissionIndex].add = add;
            allEditPermissions[permissionIndex].edit = edit;
            allEditPermissions[permissionIndex].view = view;

        } else {

            currentModule[permission] = value;
            const { add, edit, view, id } = currentModule;

            const permissionIndex = editPerimssions.findIndex((x) => x.menu_id === id);
            allEditPermissions[permissionIndex].add = add;
            allEditPermissions[permissionIndex].edit = edit;
            allEditPermissions[permissionIndex].view = view;

        }

        setPermissions(allPermission);
        setEditPermissions(allEditPermissions);

    };

    const handleCancel = () => {

        router.back();

    }

    const onSubmit = async (values) => {

        // console.log(values);
        const reqBody = {
            group_name: values.role_name,
            group_desc: values.description,
            permissions: editPerimssions 
        }

        await createGroup(reqBody);
        router.back();

    }


  return (
    <Container id={3}>

        <Loader show={show}>

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <Card className="w-full mb-4">
                        
                        <CardHeader>
                            <CardTitle>User Roles Details</CardTitle>
                            <CardDescription>Fill necessary details for user roles</CardDescription>
                        </CardHeader>

                        <CardContent>

                            <CustomGrid row={2}>
                                <DynamicFields form={form} data={rolesData} module_name='user_roles_data' />
                            </CustomGrid>

                        </CardContent>

                    </Card>

                    <Card className="w-full">

                        <CardHeader>

                            <CardTitle>User Permission Details</CardTitle>
                            <CardDescription>Give necessary permissions to user</CardDescription>

                        </CardHeader>

                        <CardContent>

                            <Table>

                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[70%]">Module</TableHead>
                                        <TableHead>Add</TableHead>
                                        <TableHead>Edit</TableHead>
                                        <TableHead>View</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {permissions !== null && Object.keys(permissions).map((module) => (
                                        <TableRow key={module}>
                                            <TableCell className="font-medium">
                                                {/* {module.charAt(0).toUpperCase() + module.slice(1)} */}
                                                {module}
                                            </TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={permissions[module].add}
                                                    onCheckedChange={() => handleSwitchChange(module, 'add')}
                                                    disabled={!permissions[module].view}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={permissions[module].edit}
                                                    onCheckedChange={() => handleSwitchChange(module, 'edit')}
                                                    disabled={!permissions[module].view}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={permissions[module].view}
                                                    onCheckedChange={() => handleSwitchChange(module, 'view')}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>

                        </CardContent>

                    </Card>

                    <CardFooter className='flex gap-3 justify-end mt-4'>
                        <Button type='button' variant='secondary' onClick={handleCancel}>Cancel</Button>
                        <Button>Save</Button>
                    </CardFooter>

                </form>

            </Form>

        </Loader>

    </Container>
  )
}

export default wrapPermissionCheck(Add,'can_add');