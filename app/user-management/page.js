"use client";

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BACKEND_API, getColumnHeader, getRowData } from '@/utils/constants';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { CustomTooltip } from '@/components/custom-tooltip';
import React, { useEffect, useMemo, useState } from 'react'
import { Container } from '@/components/container';
import { userData } from '@/utils/data';
import useAPI from '@/hooks/useAPI';
import useStorage from '@/hooks/useStorage';

const ActionsRenderer = (params) => {

  const item = params.data
  const editPath = `user-management/edit/${item.user_id}`

  return (
      <div className='flex items-center justify-center h-full'>
          <CustomTooltip content='Edit'>
              <Link href={editPath}>
                  <MdEdit size={20}/>
              </Link>
          </CustomTooltip>
      </div>
  );

};

const UserManagement = () => {

//   const { data } = useSelector((state) => state.list);
//   const usersList = data.users;

  const [usersList, setUsersList] = useState([]);
  const { getUsers } = useAPI();
  const { getItem } = useStorage();

  useEffect(() => {

    const getAllUsers = async () => {


        const result = await getUsers();
        setUsersList(result);


    }

    getItem('company_name') !== null && getAllUsers();

  },[])

  const rowData = useMemo(() => getRowData(usersList), [usersList]);

  const columnDefs = useMemo(() => getColumnHeader(userData.filter((x) => x.name !== 'Password'), ActionsRenderer), []);

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

      <Container id={3}>
          
          <div className='w-full flex my-3'>
              <Link href={'user-management/add'} className='flex items-center border rounded-md p-2 hover:bg-gray-100 transition-all duration-250'>
                  <CustomTooltip content='Add User' position='right'>
                      <AiOutlineFileAdd size={22} />
                  </CustomTooltip>
              </Link>
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

      </Container>

    </>
  );

}

export default UserManagement