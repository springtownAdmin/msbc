"use client";

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AiOutlineFileAdd } from "react-icons/ai";
import { breakData, getColumnHeader, getRowData, removeFieldsFromList } from '@/utils/constants';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { CustomTooltip } from '@/components/custom-tooltip';
import React, { useEffect, useMemo, useState } from 'react'
import { Container } from '@/components/container';
import { branchData } from '@/utils/data';
import useAPI from '@/hooks/useAPI';
import useStorage from '@/hooks/useStorage';

const ActionsRenderer = (params) => {

  const item = params.data
  const editPath = `branch/edit/${item.branch_code}`

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

const Branch = () => {

  const { getBranches } = useAPI();
  const [ branchList, setBranchList ] = useState([]);
  const { company_name } = useStorage();

  useEffect(() => {

    const getData = async () => {

        const result = await getBranches();
        setBranchList(result);

    }

    company_name !== null && getData();

  }, []);


//   const branchList = data.branch;

  const rowData = useMemo(() => getRowData(branchList), [branchList]);

  const columnDefs = useMemo(() => getColumnHeader(branchData.filter((_, i) => i !== 0), ActionsRenderer), []);

  // const sections = breakData(branchData, ['branch_name', 'Country'])
  // console.log(sections);

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

      <Container id={2}>
          
          <div className='w-full flex my-3'>
              <Link href={'branch/add'} className='flex items-center border rounded-md p-2 hover:bg-gray-100 transition-all duration-250'>
                  <CustomTooltip content='Add Branch' position='right'>
                      <AiOutlineFileAdd size={22} />
                  </CustomTooltip>
              </Link>
          </div>

          <div className={"ag-theme-quartz w-full"} style={{ height: 500 }}>
              <AgGridReact
                  rowData={rowData}
                  onGridReady={onGridReady}
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

    </>
  );

}

export default Branch