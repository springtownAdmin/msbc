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
import { branchData } from '@/utils/data';
import useAPI from '@/hooks/useAPI';
import useStorage from '@/hooks/useStorage';
import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import useLoader, { Loader } from '@/hooks/useLoader';
import wrapPermissionCheck from '@/components/common/wrapPermissionCheck';
import PermissionBasedComponent from '@/components/common/PermissionBasedComponent';

const ActionsRenderer = (params) => {

  const item = params.data
  const editPath = `branch/edit/${item.branch_code}`

  return (
    
      <div className='flex items-center justify-center h-full'>
        <PermissionBasedComponent permissionName='can_edit' moduleUrl='/branch'>
          <CustomTooltip content='Edit'>
              <Link href={editPath}>
                  <MdEdit size={20}/>
              </Link>
          </CustomTooltip>
          </PermissionBasedComponent>
      </div>
      
  );

};

const Branch = () => {

  const { getBranches } = useAPI();
  const [ branchList, setBranchList ] = useState([]);
  const [ dateRange, setDateRange ] = useState({ start: null, end: null });
  const { company_name } = useStorage();

  const handleRangeStart = (v) => setDateRange({ ...dateRange, start: v });

  const handleRangeEnd = (v) => setDateRange({ ...dateRange, end: v });
  const { showLoader, hideLoader, show } = useLoader();

  useEffect(() => {

    const getData = async () => {

        showLoader();
        const result = await getBranches();
        setBranchList(result);
        hideLoader();

    }

    company_name !== null && getData();

  }, []);

  const rowData = useMemo(() => getRowData(branchList), [branchList]);

  const columnDefs = useMemo(() => getColumnHeader(branchData.filter((_, i) => i !== 0), ActionsRenderer), []);

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

          <Loader show={show}>

            <div className='w-full flex my-3 gap-3'>
               <PermissionBasedComponent permissionName='can_add' moduleUrl='/branch'>
                <Link href={'branch/add'} className='flex items-center border rounded-md p-2 hover:bg-gray-100 transition-all duration-250'>
                      <CustomTooltip content='Add Branch' position='right'>
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

          </Loader>       

      </Container>

    </>
  );

}

export default wrapPermissionCheck(Branch,'can_view')