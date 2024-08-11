"use client";

import { BACKEND_API } from '@/utils/constants';
import useCustomToast from './useCustomToast';
import useStorage from './useStorage';
import { useRouter } from 'next/navigation';

const useAPI = () => {
  

    const { showToast } = useCustomToast();
    const { setItem } = useStorage();
    const router = useRouter();

    const authenticateUser = async (reqBody) => {

        try {

            const company_name = 'HolBox001';
            setItem('company_name', company_name);
            
            const resp = await BACKEND_API.post(`/login?company_name=${company_name}`, reqBody);
            const result = resp.data;

            if (result.status_code >= 200 && result.status_code < 300) {

                setItem('email', reqBody.username);
                setItem('role', result.role);

                router.push('/');

            }

            showToast(result.status_code, result.message);
            

        } catch (e) {

            showToast(400, e.message);

        }


    }

    const getCompanyName = () => {

        if (typeof window !== undefined || typeof window !== null) {

            return window.localStorage.getItem('company_name');

        }

        return ''

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
            const resp = await BACKEND_API.post(`/users`, { ...reqBody, company_name });

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
            const resp = await BACKEND_API.get(`/get_enquiry/${id}?company_name=${company_name}`, reqBody);

            showToast(resp.data.status_code, resp.data.message);
    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const updateEnquiry = async (reqBody) => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.post(`/update_enquiry?company_name=${company_name}`, reqBody);

            showToast(resp.data.status_code, resp.data.message);
    
        } catch (e) {

            showToast(400, e.message);

        }

    }

    const getEnquiries = async () => {

        try {

            const company_name = getCompanyName();
            const resp = await BACKEND_API.get(`/get_enquiry?company_name=${company_name}`);

            showToast(resp.data.status_code, resp.data.message);
    
        } catch (e) {

            showToast(400, e.message);

        }

    }


    return { getUser, getUsers, updateUser, createUser, createBranch, getBranches, getBranch, updateBranch, 
        authenticateUser, getOrganizations, createOrganization, getOrganization, updateOrganization,
        createEnquiry, getEnquiries, getEnquiry, updateEnquiry, updateEnquiry
    };

}

export default useAPI