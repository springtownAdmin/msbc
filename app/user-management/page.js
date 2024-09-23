"use client";

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AiOutlineFileAdd } from "react-icons/ai";
import { getColumnHeader, getRowData } from '@/utils/constants';
import Link from 'next/link';
import { MdEdit } from "react-icons/md";
import { CustomTooltip } from '@/components/custom-tooltip';
import React, { useEffect, useMemo, useState } from 'react'
import { Container } from '@/components/container';
import { userData } from '@/utils/data';
import useAPI from '@/hooks/useAPI';
import useStorage from '@/hooks/useStorage';
import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MdDelete } from "react-icons/md";
import useLoader, { Loader } from '@/hooks/useLoader';
import PermissionBasedComponent from '@/components/common/PermissionBasedComponent';
import wrapPermissionCheck from '@/components/common/wrapPermissionCheck';

const ActionsRenderer = (params) => {

  const item = params.data
  const editPath = `user-management/edit/${item.user_id}`

  return (
    <div className='flex h-full'>
      <PermissionBasedComponent permissionName="can_edit" moduleUrl="/user-management">
        <div className='cursor-pointer hover:text-red-500'>
          <CustomTooltip content='Edit'>
            <Link href={editPath}>
              <MdEdit size={20} />
            </Link>
          </CustomTooltip>
        </div>
      </PermissionBasedComponent>
    </div>
  );

};

const UserManagement = () => {

  //   const { data } = useSelector((state) => state.list);
  //   const usersList = data.users;

  const [usersList, setUsersList] = useState([]);
  const { getUsers, getGroups, deleteGroup } = useAPI();
  const { getItem } = useStorage();
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [rolesList, setRolesList] = useState([]);
  const { showLoader, hideLoader, show } = useLoader();
  const [currentTab, setCurrentTab] = useState('users');

  const handleTab = (value) => setCurrentTab(value);

  const handleRangeStart = (v) => setDateRange({ ...dateRange, start: v });

  const handleRangeEnd = (v) => setDateRange({ ...dateRange, end: v });

  const getAllUsers = async () => {

    showLoader();
    const result = await getUsers();
    const resultGroups = await getGroups();
    setUsersList(result);
    setRolesList(resultGroups.map((x) => ({ id: x.group_id, role: x.group_name, description: x.description })));
    hideLoader();

  }

  useEffect(() => {

    getAllUsers();

  }, []);


  const handleDelete = async (deleteId) => {

    await deleteGroup(deleteId);
    getItem('company_name') !== null && getAllUsers();

  }

  const ActionsRendererRoles = (params) => {

    const item = params.data
    const editPath = `user-management/roles/edit/${item.id}`

    return (
      <div className='flex gap-5 h-full'>
        <PermissionBasedComponent permissionName='can_edit' moduleUrl='/user-management'>

          <CustomTooltip content='Edit'>
            <Link href={editPath}>
              <MdEdit size={20} />
            </Link>
          </CustomTooltip>

          <CustomTooltip content='Remove'>
            <MdDelete size={20} onClick={() => handleDelete(item.id)} />
          </CustomTooltip>

        </PermissionBasedComponent>
      </div>
    );

  };

  const rowData = useMemo(() => getRowData(usersList), [usersList]);

  const columnDefs = useMemo(() => getColumnHeader(userData.filter((x) => x.name !== 'Password'), ActionsRenderer), []);

  const rowDataRoles = useMemo(() => getRowData(rolesList), [rolesList]);

  const columnRole = useMemo(() => [

    { field: 'role', headerCheckboxSelection: true, checkboxSelection: true, filter: 'agTextColumnFilter' },
    { field: 'description', headerName: 'Description', filter: 'agTextColumnFilter' },
    { field: 'actions', headerName: 'Actions', cellRenderer: ActionsRendererRoles }

  ], []);

  const defaultColDef = useMemo(() => {
    return {
      floatingFilter: true,
      sortable: true,
      resizable: true,
    };
  }, []);

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <>

      <Container id={3} route='/user-management'>

        <Loader show={show}>

          <Tabs value={currentTab} onValueChange={handleTab} className="w-full">

            <TabsList>
              <TabsTrigger value='users'>Users</TabsTrigger>
              <TabsTrigger value='roles'>Roles</TabsTrigger>
            </TabsList>

            <TabsContent value='users'>

              <div className='w-full flex my-3 gap-3'>

                <PermissionBasedComponent permissionName='can_add' moduleUrl='/user-management'>
                  <Link href={'user-management/add'} className='flex items-center border rounded-md p-2 hover:bg-gray-100 transition-all duration-250'>
                    <CustomTooltip content='Add User' position='right'>
                      <AiOutlineFileAdd size={22} />
                    </CustomTooltip>
                  </Link>
                </PermissionBasedComponent>

                <div>
                  <DatePicker placeholder='Start Date' className='w-[200px]' date={dateRange.start} onSelect={handleRangeStart} />
                </div>

                <div>
                  <DatePicker placeholder='End Date' className='w-[200px]' date={dateRange.end} onSelect={handleRangeEnd} />
                </div>

                <div>
                  <Button type='button'>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>

              </div>

              <div className={"ag-theme-quartz w-full"} style={{ height: 500 }}>
                <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                  onGridReady={onGridReady}
                  defaultColDef={defaultColDef}
                  rowSelection="multiple"
                  suppressRowClickSelection={true}
                  pagination={true}
                  paginationPageSize={10}
                  paginationPageSizeSelector={[10, 25, 50]}
                />
              </div>

            </TabsContent>

            <TabsContent value='roles'>

              <div className='w-full flex my-3 gap-3'>
                <PermissionBasedComponent permissionName='can_edit' moduleUrl='/user-management'>
                  <Link href={'user-management/roles/add'} className='flex items-center border rounded-md p-2 hover:bg-gray-100 transition-all duration-250'>
                    <CustomTooltip content='Add Role' position='right'>
                      <AiOutlineFileAdd size={22} />
                    </CustomTooltip>
                  </Link>
                </PermissionBasedComponent>

              </div>

              <div className={"ag-theme-quartz w-full"} style={{ height: 500 }}>
                <AgGridReact
                  rowData={rowDataRoles}
                  columnDefs={columnRole}
                  onGridReady={onGridReady}
                  defaultColDef={defaultColDef}
                  rowSelection="multiple"
                  suppressRowClickSelection={true}
                  pagination={true}
                  paginationPageSize={10}
                  paginationPageSizeSelector={[10, 25, 50]}
                />
              </div>

            </TabsContent>

          </Tabs>

        </Loader>

      </Container>

    </>
  );

}

export default wrapPermissionCheck(UserManagement, 'can_view');