"use client";

import { AI_SUMMARY_API, BACKEND_API, MenuData } from '@/utils/constants';
import useCustomToast from './useCustomToast';
import useStorage from './useStorage';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addItems } from '@/lib/slices/list';
import { setPermissions } from '@/lib/slices/permissionSlice';
import { MdDashboard } from 'react-icons/md';
import { BsPersonFillExclamation } from 'react-icons/bs';

const useAPI = () => {

    const { showToast } = useCustomToast();
    const { setItems, setItem, getItem } = useStorage();
    const router = useRouter();
    const dispatch = useDispatch();

    const authenticateUser = async (reqBody, company_name) => {

        try {
            
            const resp = await BACKEND_API.post(`/login?company_name=${company_name}`, reqBody);
            const result = resp.data;

            if (result.message !== undefined) {
                showToast(result.status_code, result.message);
                return;
            }

            const menusPermissions = result.permissions.map((x) => (
                { 
                    menuId: x.module_id,
                    menuName: x.module,
                    moduleUrl: MenuData[x.module].link,
                    can_view: x.can_view,
                    can_edit: x.can_edit,
                    can_add: x.can_add
                }
            ));

            let setAllMenus = [];

            setAllMenus.push({
                id: 1,
                name: 'Dashboard',
                Icon: MdDashboard,
                link: '/dashboard'
            });
              
            result.permissions.forEach((y) => {

                const item = {
                    id: setAllMenus.length + 1,
                    name: y.module,
                    Icon: MenuData[y.module].Icon,
                    link: MenuData[y.module].link
                }
          
                setAllMenus.push(item);
        
                if (item.name === 'Enquiry Management') {
        
                setAllMenus.push({
                    id: setAllMenus.length + 1,
                    name: 'Follow Up',
                    Icon: BsPersonFillExclamation,
                    link: '/follow-up'
                })
        
                }

            })

            let routes = {};
            setAllMenus.forEach((x) => {
                routes[x.link] = x.id
            })

            setItems(result);
            // setItem("Menus", setAllMenus);
            // setItem("Routes", routes);
            dispatch(setPermissions(result.permissions));
            setItem("company_name", company_name);  
            // dispatch(addItems({ key: "Menus", data: result.permissions }));
            // dispatch(setPermissions(menusPermissions));
            router.push('/dashboard');          

        } catch (e) {

            showToast(400, e.message);

        }


    }

    const getCompanyName = () => {

        return getItem('company_name')

    }

    const setSideBarMenuPermissions = async () => {
        // We're using this Hook in our container module which loads latest state. 
        // We update state in our localstorage to make sure we're fetching latest state updated. 
        try {
        
          const company_name = getItem('company_name');
          const userId = getItem('user_id');
          const result = await BACKEND_API.get(`/user/${userId}/permissions?company_name=${company_name}`);
          dispatch(setPermissions(result.data.permissions));
          return result.data.permissions;
        } catch (error) {
          console.error('Failed to fetch permissions:', error);
        }
    };

    const getUser = async (id = 1) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/users/${id}?company_name=${company_name}`);

            return resp.data;

        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getUsers = async () => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/users?company_name=${company_name}`);
    
            return resp.data;

        } catch (e) {

            showToast(400, e.message);

        }

    }

    const updateUser = async (id = 1, reqBody) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/users/${id}?company_name=${company_name}`, { ...reqBody, company_name });

            showToast(resp.data.status_code, resp.data.message);
    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const createUser = async (reqBody) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/users?company_name=${company_name}`, { ...reqBody, company_name });

            showToast(resp.data.status_code, resp.data.message);
    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const createBranch = async (reqBody) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/branches`, { ...reqBody, company_name });

            showToast(resp.data.status_code, resp.data.message);
    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getBranches = async () => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/branches?company_name=${company_name}`);

            return resp.data;
    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getBranch = async (id = 1) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/branches?company_name=${company_name}&branch_code=${id}`);

            if (resp.data.message ?? false) showToast(resp.data.status_code, resp.data.message);

            return resp.data;
    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const updateBranch = async (reqBody) => {

        try {

            // const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/branches/update`, reqBody);

            showToast(resp.data.status_code, resp.data.message);

    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getOrganizations = async () => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/organization/?company_name=${company_name}`);

            return resp.data;
    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const createOrganization = async (reqBody) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/organization?company_name=${company_name}`, reqBody);

            showToast(resp.data.status_code, resp.data.message);
    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getOrganization = async (id) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/organization/${id}?company_name=${company_name}`);

            return resp.data;
    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const updateOrganization = async (id, reqBody) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/organization/${id}?company_name=${company_name}`, reqBody);

            showToast(resp.data.status_code, resp.data.message);
    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const createEnquiry = async (reqBody) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/add_enquiry?company_name=${company_name}`, reqBody);

            showToast(resp.data.status_code, resp.data.message);
    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getEnquiry = async (id) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/get_enquiry/${id}?company_name=${company_name}`);

            return resp.data;
    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const updateEnquiry = async (id, reqBody) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/update_enquiry/${id}?company_name=${company_name}`, reqBody);

            showToast(resp.data.status_code, resp.data.message);
    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getEnquiries = async () => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/get_enquiry?company_name=${company_name}`);

            return resp.data;
    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getStatuses = async () => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/status?company_name=${company_name}`);

            return resp.data;

        } catch (e) {
            
            showToast(400, e.message);

        }

    }

    const getGroups = async () => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/groups?company_name=${company_name}`);

            return resp.data.groups;


        } catch (e) {

            showToast(400, e.message);

        }

    }

    const createGroup = async (reqBody) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/groups?company_name=${company_name}`, reqBody);

            // return resp.data.groups;
            showToast(resp.data.status_code, resp.data.message);


        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getModules = async () => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/modules?company_name=${company_name}`);

            return resp.data.modules;


        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getGroup = async (id) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/groups/${id}/permissions?company_name=${company_name}`);

            if (resp.data.status_code > 300 && resp.data.status_code <= 500) {

                return 

            }
            return resp.data;

        } catch (e) {

            showToast(400, e.message);

        }

    }

    const updateGroup = async (id, reqBody) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/groups/${id}/permissions?company_name=${company_name}`, reqBody);

            showToast(resp.data.status_code, resp.data.message);


        } catch (e) {

            showToast(400, e.message);

        }

    }

    const deleteGroup = async (id) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/groups/${id}?company_name=${company_name}`);
            showToast(resp.data.status_code, resp.data.message);

        } catch (e) {

            showToast(400, e.message);

        }

    }

    const addFollowUp = async (reqBody) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/add_follow_up?company_name=${company_name}`, reqBody);

            showToast(resp.data.status_code, resp.data.message);


        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getEnquiryFollowUps = async (id) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/follow_ups/${id}?company_name=${company_name}`);

            return resp.data;


        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getAllFollowUps = async () => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/followups?company_name=${company_name}`);

            return resp.data;


        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getOneFollowUp = async (id) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/follow_up_by_id/${id}?company_name=${company_name}`);

            return resp.data;

        } catch (e) {

            showToast(400, e.message);

        }

    }

    const updateOneFollowUp = async (reqBody, id) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/edit_follow_up/${id}?company_name=${company_name}`, reqBody);

            showToast(resp.data.status_code, resp.data.message);

        } catch (e) {

            showToast(400, e.message);

        }

    }

    const addField = async (reqBody) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/add-field?company_name=${company_name}`, reqBody);

            showToast(resp.data.status_code, resp.data.message);

        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getFields = async ({ table_name }) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/fields?table_name=${table_name}&company_name=${company_name}`);

            return resp.data.fields;

        } catch (e) {

            showToast(400, e.message);

        }

    }

    const updateFieldLabel = async (reqBody) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/update-field-label?company_name=${company_name}`, reqBody);

            showToast(resp.data.status_code, resp.data.message);

        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getUpcomingReminders = async () => {

        try {

            const company_name = getCompanyName();
            const userId = getItem('user_id');
            const resp = await BACKEND_API.get(`/upcoming_reminders/${userId}?company_name=${company_name}`);

            return resp.data;

        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getEnquiriesChart = async () => {

        try {

            const company_name = getCompanyName();
            const userId = getItem('user_id');
            const resp = await BACKEND_API.get(`/enquiry_status_counts/${userId}?company_name=${company_name}`);

            return resp.data;

        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getFollowUpSummary = async (reqBody) => {

        try {

            const resp = await AI_SUMMARY_API.post(`/get-summary`, reqBody);

            return resp.data;

        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getEmailContent = async (reqBody) => {

        try {

            const resp = await AI_SUMMARY_API.post(`/generate_email`, reqBody);

            return resp.data;

        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getFilesFromS3 = async ({ enquiry_no }) => {

        try {

            const company_name = getCompanyName();

            const resp = await BACKEND_API.get(`/enquiry/${enquiry_no}/files?company_name=${company_name}`);

            return resp.data;

        } catch (e) {
            
            showToast(400, e.message);

        }

    }

    const addFilesToS3 = async ({ selectedFileForUpload, enquiry_no, callback }) => {

        const formData = new FormData();
        formData.append("file", selectedFileForUpload);
        const fileName = selectedFileForUpload.name;

        try {

            await BACKEND_API.post(`/enquiry/${enquiry_no}/upload`, formData, {
                params: { company_name: getItem('company_name'), file_name: fileName },
                headers: { "Content-Type": "multipart/form-data" },
            });

            callback();

        } catch (e) {

            showToast(400, e.message);

        }

    }

    const removeFilesFromS3 = async ({ enquiry_no, fileName, filePath, callback }) => {

        try {

            const company_name = getCompanyName();
            await BACKEND_API.post(`enquiry/${enquiry_no}/delete?company_name=${company_name}&file_name=${fileName}&file_path=${filePath}`);

            callback();

        } catch (e) {

            showToast(400, e.message);

        }

    }

    const downloadFileFromS3 = async ({ enquiry_no, fileName, filePath }) => {

        try {

            const company_name = getCompanyName();
            const response = await BACKEND_API.get(`enquiry/${enquiry_no}/download`, {
                params: { file_name: fileName, file_path: filePath, company_name: company_name },
            });

            window.open(response.data.file_url);

        } catch (e) {

            showToast(400, e.message);

        }

    }


    return { getUser, getUsers, updateUser, createUser, createBranch, getBranches, getBranch, updateBranch, 
        authenticateUser, getOrganizations, createOrganization, getOrganization, updateOrganization,
        createEnquiry, getEnquiries, getEnquiry, updateEnquiry, updateEnquiry, getStatuses, getGroups,
        addFollowUp, getEnquiryFollowUps, getAllFollowUps, createGroup, getModules, getGroup, updateGroup,
        deleteGroup, getOneFollowUp, updateOneFollowUp, addField, getFields, updateFieldLabel, setSideBarMenuPermissions,
        getUpcomingReminders, getEnquiriesChart, getFollowUpSummary, getEmailContent, getFilesFromS3, addFilesToS3,
        removeFilesFromS3, downloadFileFromS3
    };

}

export default useAPI