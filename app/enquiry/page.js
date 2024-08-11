"use client";

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AiOutlineFileAdd } from "react-icons/ai";
import { getColumnHeader, getRowData } from '@/utils/constants';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { CustomTooltip } from '@/components/custom-tooltip';
import React, { useMemo } from 'react'
import { Container } from '@/components/container';
import { enquiryData } from '@/utils/data';
import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const ActionsRenderer = (params) => {

  const item = params.data
  const editPath = `enquiry/edit/${item.enquiryNumber}`

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

const Enquiry = () => {

  const { data } = useSelector((state) => state.list);
  const enquiryList = data.enquiry

  const rowData = useMemo(() => getRowData(enquiryList), [enquiryList]);

  const columnDefs = useMemo(() => getColumnHeader(enquiryData, ActionsRenderer), []);

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

        <Container id={4}>
            
            <div className='w-full flex my-3 gap-3'>
                <Link href={'enquiry/add'} className='flex items-center border rounded-md p-2 hover:bg-gray-100 transition-all duration-250'>
                    <CustomTooltip content='Add Enquiry' position='right'>
                        <AiOutlineFileAdd size={22} />
                    </CustomTooltip>
                </Link>

                <div>
                    <DatePicker placeholder='Start Date' className='w-[200px]' />
                </div>

                <div>
                    <DatePicker placeholder='End Date' className='w-[200px]' />
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
        
    </>
  );

}

export default Enquiry