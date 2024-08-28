"use client";

import { BACKEND_API } from '@/utils/constants';
import useCustomToast from './useCustomToast';
import useStorage from './useStorage';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addItems } from '@/lib/slices/list';

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

            setItems(result);
            setItem("company_name", company_name);  
            dispatch(addItems({ key: "Menus", data: result.permissions }))
            router.push('/dashboard');          

        } catch (e) {

            showToast(400, e.message);

        }


    }

    const getCompanyName = () => {

        return getItem('company_name')

    }

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

            const resp = await BACKEND_API.post(`/branches`, reqBody);

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

    return { getUser, getUsers, updateUser, createUser, createBranch, getBranches, getBranch, updateBranch, 
        authenticateUser, getOrganizations, createOrganization, getOrganization, updateOrganization,
        createEnquiry, getEnquiries, getEnquiry, updateEnquiry, updateEnquiry, getStatuses, getGroups,
        addFollowUp, getEnquiryFollowUps, getAllFollowUps, createGroup, getModules, getGroup, updateGroup,
        deleteGroup, getOneFollowUp, updateOneFollowUp
    };

}

export default useAPI