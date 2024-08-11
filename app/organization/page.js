"use client";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Container } from '@/components/container';
import { CustomTooltip } from '@/components/custom-tooltip';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useMemo, useState } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai';
import Link from 'next/link';
import { organizationData } from '@/utils/data';
import { getColumnHeader, getRowData } from '@/utils/constants';
import useAPI from '@/hooks/useAPI';
import useStorage from '@/hooks/useStorage';
import { MdEdit } from 'react-icons/md';

const ActionsRenderer = (params) => {

    const item = params.data
    const editPath = `organization/edit/${item.organization_id}`
  
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

const Organization = () => {

    const { getOrganizations } = useAPI();
    const [ organizationList, setOrganizationList ] = useState([]);
    const { company_name } = useStorage();

    useEffect(() => {

        const getData = async () => {

            const result = await getOrganizations();
            setOrganizationList(result);

        }

        company_name !== null && getData();

    }, []);
  
    const rowData = useMemo(() => getRowData(organizationList), [organizationList]);
  
    const columnDefs = useMemo(() => getColumnHeader(organizationData, ActionsRenderer), []);
  
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
    <Container id={5}>

        <div className='w-full flex my-3'>
            <Link href={'organization/add'} className='flex items-center border rounded-md p-2 hover:bg-gray-100 transition-all duration-250'>
                <CustomTooltip content='Add Organization' position='right'>
                    <AiOutlineFileAdd size={22} />
                </CustomTooltip>
            </Link>
        </div>

        <div className={"ag-theme-quartz w-full"} style={{ height: 500 }}>
            <AgGridReact
                rowData={rowData}
                // onGridReady={onGridReady}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 25, 50]}
            />
        </div>

    </Container>
  );

}

export default Organization