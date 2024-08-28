"use client";

import { Container } from '@/components/container';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from "@/components/ui/switch"
import { Input } from '@/components/ui/input';
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
import useLoader from '@/hooks/useLoader';
import { Loader } from '@/hooks/useLoader';

const EditRole = ({ params }) => {

    const [permissions, setPermissions] = useState(null);
    const [editPerimssions, setEditPermissions] = useState([]);

    const id = params.id;

    const { showLoader, hideLoader, show } = useLoader();

    const { updateGroup, getModules, getGroup } = useAPI();

    const form = useForm({
        resolver: zodResolver(createZodValidation(rolesData)),
        defaultValues: putValues(rolesData)
    })

    const router = useRouter();

    useEffect(() => {

        const fillData = async () => {

            showLoader();

            const getAllModules = await getModules();
            const result = await getGroup(id);
            const getPermissions = result.permissions;

            console.log(getPermissions)

            const structureModule = getAllModules.map((x) => ({ id: x[0], name: x[1] }));
            form.setValue("role_name", result.group_name);
            form.setValue("description", result.group_description);

            let newObj = {};
            const modules = {};

            structureModule.forEach((x) => { modules[x.name] = x.id });

            structureModule.forEach((x) => {

                if (getPermissions.length === 0) {

                    newObj[x.name] = { add: false, edit: false, view: false, id: x.id }

                } else {

                    getPermissions.forEach((y) => {

                        newObj[y.module] = { add: y.can_add, edit: y.can_edit, view: y.can_view, id: modules[y.module] }

                    })


                }

            })

            setPermissions(newObj);

            hideLoader();

        }

        fillData();

    }, []);

    const handleSwitchChange = (module, permission) => {

        const allPermission = { ...permissions };
        let currentModule = allPermission[module];

        const value = !currentModule[permission]

        if (permission === 'view') {

            currentModule[permission] = value;
            currentModule.add = value ? currentModule.add : false;
            currentModule.edit = value ? currentModule.edit : false;

            const { add, edit, view, id } = currentModule;
            const currentPermission = { menu_id: id, add, edit, view, delete: false };
            setEditPermissions([ ...editPerimssions, currentPermission ])

        } else {

            currentModule[permission] = value;
            const { add, edit, view, id } = currentModule;
            const currentPermission = { menu_id: id, add, edit, view, delete: false };
            setEditPermissions([ ...editPerimssions, currentPermission ])

        }

        setPermissions(allPermission);

    };

    const handleCancel = () => {

        router.back();

    }

    const onSubmit = async (values) => {

        // console.log(values);
        const reqBody = {
            group_name: values.role_name,
            description: values.description,
            permissions: editPerimssions
        }

        await updateGroup(id, reqBody);
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

export default EditRole