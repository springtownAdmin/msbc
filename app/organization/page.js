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
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import useLoader, { Loader } from "@/hooks/useLoader";
import PermissionBasedComponent from "@/components/common/PermissionBasedComponent";
import wrapPermissionCheck from "@/components/common/wrapPermissionCheck";

const ActionsRenderer = (params) => {

    const item = params.data
    const editPath = `organization/edit/${item.organization_id}`

    return (
        <div className='flex items-center justify-center h-full'>
            <PermissionBasedComponent permissionName="can_edit" moduleUrl='/organization'>
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

const Organization = () => {

    const { getOrganizations } = useAPI();
    const [organizationList, setOrganizationList] = useState([]);
    const { company_name } = useStorage();
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const { showLoader, hideLoader, show } = useLoader();

    const handleRangeStart = (v) => setDateRange({ ...dateRange, start: v });

    const handleRangeEnd = (v) => setDateRange({ ...dateRange, end: v });

    useEffect(() => {

        const getData = async () => {

            showLoader();
            const result = await getOrganizations();
            setOrganizationList(result);
            hideLoader();

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
        <Container id={5} route='/organization'>

            <Loader show={show}>

                <div className='w-full flex my-3 gap-3'>

                    <PermissionBasedComponent permissionName="can_add" moduleUrl='/organization'>
                        <Link href={'organization/add'} className='flex items-center border rounded-md p-2 hover:bg-gray-100 transition-all duration-250'>
                            <CustomTooltip content='Add Organization' position='right'>
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
    );

}

export default wrapPermissionCheck(Organization, 'can_view');