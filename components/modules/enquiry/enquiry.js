"use client";

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AiOutlineFileAdd } from "react-icons/ai";
import { deleteFieldsFromArray, formatDateToYYYYMMDD, getColumnHeader, getRowData } from '@/utils/constants';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { CustomTooltip } from '@/components/custom-tooltip';
import React, { useEffect, useMemo, useState } from 'react'
import { Container } from '@/components/container';
import { enquiryData } from '@/utils/data';
import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import useAPI from '@/hooks/useAPI';
import useStorage from '@/hooks/useStorage';
import useLoader, { Loader } from '@/hooks/useLoader';
import PermissionBasedComponent from '@/components/common/PermissionBasedComponent';

const ActionsRenderer = (params) => {

  const item = params.data
  const editPath = `enquiry/edit/${item.id}`

  return (
    <PermissionBasedComponent moduleUrl='/enquiry' permissionName='can_edit'>
      <div className='flex items-center justify-center h-full'>
          <CustomTooltip content='Edit'>
              <Link href={editPath}>
                  <MdEdit size={20}/>
              </Link>
          </CustomTooltip>
      </div>
    </PermissionBasedComponent>
  );

};

const Enquiry = () => {

//   const { data } = useSelector((state) => state.list);
//   const enquiryList = data.enquiry
  
  const { getEnquiries } = useAPI();
  const [ enquiryList, setEnquiryList ] = useState([]);
  const [ dateRange, setDateRange ] = useState({ start: null, end: null });
  const { company_name } = useStorage();
  const { showLoader, hideLoader, show } = useLoader();

  const handleRangeStart = (v) => setDateRange({ ...dateRange, start: v });

  const handleRangeEnd = (v) => setDateRange({ ...dateRange, end: v });

  useEffect(() => {

    const getData = async () => {

        showLoader();
        const result = await getEnquiries();

        const newResult = result.map((x) => {

            return {
                ...x,
                enquiry_date: formatDateToYYYYMMDD(x.enquiry_date),
                enquiry_by: x.enquiry_by === 1 ? "Phone" : x.enquiry_by === 2 ? "E-Mail" : x.enquiry_by === 3 ? "Marketing" : null
            }

        });


        setEnquiryList(newResult);
        hideLoader();

    }

    company_name !== null && getData();

  }, []);

  const rowData = useMemo(() => getRowData(enquiryList), [enquiryList]);

  const columnDefs = useMemo(() => getColumnHeader(enquiryData, ActionsRenderer, ['By', 'Country', 'Pin Code']), []);

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

            <Loader show={show}>

                <div className='w-full flex my-3 gap-3'>

                    <PermissionBasedComponent permissionName={'can_add'} moduleUrl='/enquiry'>
                        <Link href={'enquiry/add'} className='flex items-center border rounded-md p-2 hover:bg-gray-100 transition-all duration-250'>
                            <CustomTooltip content='Add Enquiry' position='right'>
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

            </Loader>

        </Container>
        
    </>
  );

}

export default Enquiry