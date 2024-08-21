"use client";

import { Container } from '@/components/container';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from "@/components/ui/switch"
import { Input } from '@/components/ui/input';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Add = () => {

    const [permissions, setPermissions] = useState({
        branch: { add: false, edit: false, view: false },
        userManagement: { add: false, edit: false, view: false },
        enquiry: { add: false, edit: false, view: false },
        organization: { add: false, edit: false, view: false },
        followUp: { add: false, edit: false, view: false },
    });

    const router = useRouter();

    const handleSwitchChange = (module, permission) => {


        const allPermission = { ...permissions };
        const value = !allPermission[module][permission]


        if (permission === 'view') {


            allPermission[module][permission] = value;
            allPermission[module].add = value ? allPermission[module].add : false;
            allPermission[module].edit = value ? allPermission[module].edit : false;


        } else {

            allPermission[module][permission] = value;

        }

        setPermissions(allPermission);

    };

    const handleCancel = () => {

        router.back();

    }


  return (
    <Container id={3}>

        <Card className="w-full">

            <CardHeader>

                <div className='flex justify-between'>
                    <div className='flex flex-col gap-2'>
                        <CardTitle>User Roles & Permission Details</CardTitle>
                        <CardDescription>Give necessary roles & permissions to user</CardDescription>
                    </div>

                    <div className='flex gap-5 items-center'>
                        <Edit color='orange' />
                        <Input type='text' placeholder='Enter Role Name' />
                    </div>
                </div>

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
                        {Object.keys(permissions).map((module) => (
                            <TableRow key={module}>
                                <TableCell className="font-medium">
                                    {module.charAt(0).toUpperCase() + module.slice(1)}
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
            <Button type='button'>Save</Button>
        </CardFooter>

    </Container>
  )
}

export default Add