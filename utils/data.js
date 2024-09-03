import { dateFormatter } from "./constants";

export const enquiryData = [

    {
        id: 1,
        label: 'Enquiry No',
        name: 'Enquiry No',
        type: 'text',
        value: 'New Enquiry',
        required: true,
        is_visible: true,
        read_only: true
    },
  
    {
        id: 2,
        label: 'Enquiry Date',
        name: 'Enquiry Date',
        type: 'date',
        value: dateFormatter(new Date()),
        required: true,
        is_visible: true,
        read_only: false
    },
  
    {
        id: 3,
        label: 'Type',
        name: 'Type',
        type: 'select',
        list: [ 'Trade', 'Contract', 'Phone Marketing', 'Retail', 'Villas', 'Projects' ],
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },
  
    {
        id: 4,
        label: 'Branch',
        name: 'Branch',
        type: 'select',
        value: '',
        // list: [ 'Head Office' ],
        list: [],
        required: true,
        is_visible: true,
        read_only: false
    },
  
    {
        id: 5,
        label: 'Status',
        name: 'Status',
        type: 'select',
        value: '',
        // list: [ 'Lead In', 'Quote In Progress', 'Waiting Information - Cost.', 'Lost', 'Quote Ready', 'Waiting Information - Supl.' ],
        list: [],
        required: true,
        is_visible: true,
        read_only: false
    },
  
    // {
    //     id: 6,
    //     label: 'By',
    //     name: 'By',
    //     type: 'select',
    //     value: 'User',
    //     list: [ 'Admin', 'User', 'Sales' ],
    //     required: false,
    //     is_visible: true,
    //     read_only: false
    // },
  
    {
        id: 6,
        label: 'Estimator',
        name: 'Estimator',
        type: 'select',
        value: '',
        list: [ 'Admin', 'User', 'Sales' ],
        required: false,
        is_visible: true,
        read_only: true
    },
  
    {
        id: 7,
        label: 'Sales Representative',
        name: 'Sales Representative',
        type: 'select',
        value: '',
        list: [],
        required: true,
        is_visible: true,
        read_only: false
    },
  
    {
        id: 8,
        label: 'Enquiry By',
        name: 'Enquiry By',
        type: 'select',
        list: [ 
            { id: '1', value: '1', label: 'PHONE' },
            { id: '2', value: '2', label: 'E-MAIL' },
            { id: '3', value: '3', label: 'MARKETING' },
        ],
        value: [],
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 9,
        label: 'Customer',
        name: 'Customer',
        type: 'select',
        list: [],
        value: '',
        required: false,
        is_visible: true,
        read_only: false
    },

    {
        id: 10,
        label: 'Contact Name',
        name: 'Contact Name',
        type: 'text',
        value: '',
        required: false,
        is_visible: true,
        read_only: true
    },

    {
        id: 11,
        label: 'Customer Email',
        name: 'Email',
        type: 'text',
        value: '',
        required: false,
        is_visible: true,
        read_only: true
    },

    {
        id: 12,
        label: 'Mobile No',
        name: 'Mobile No',
        type: 'number',
        value: '',
        required: false,
        is_visible: true,
        read_only: true
    },

    {
        id: 13,
        label: 'Phone No',
        name: 'Phone No',
        type: 'number',
        value: '',
        required: false,
        is_visible: true,
        read_only: true
    },

    {
        id: 14,
        label: 'Country',
        name: 'Country',
        type: 'select',
        list: ['India', 'US', 'UK'],
        value: '',
        required: false,
        is_visible: true,
        read_only: false
    },

    {
        id: 15,
        label: 'Post Code',
        name: 'Pin Code',
        type: 'number',
        value: '',
        validation: { min: 6, max: 6 },
        required: false,
        is_visible: true,
        read_only: true
    },

    {
        id: 16,
        label: 'Address',
        name: 'Address',
        type: 'textarea',
        value: '',
        required: false,
        is_visible: true,
        read_only: true
    },

    {
        id: 17,
        label: 'Delivery Address',
        name: 'Shipping Address',
        type: 'textarea',
        value: '',
        required: false,
        is_visible: true,
        read_only: true
    },

    {
        id: 18,
        label: 'Billing Address',
        name: 'Billing Address',
        type: 'textarea',
        value: '',
        required: false,
        is_visible: true,
        read_only: true
    },

    {
        id: 19,
        label: 'Project Name',
        name: 'Project Name',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 20,
        label: 'Architect Name',
        name: 'Architect Name',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 21,
        label: 'Site Reference',
        name: 'Site Reference',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 22,
        label: 'Tentative Project Value',
        name: 'Tentative Project Value',
        type: 'number',
        value: '',
        validation: { min: 1, max: 5 },
        required: false,
        is_visible: true,
        read_only: false
    },

    {
        id: 23,
        label: 'Notes',
        name: 'Notes',
        type: 'textarea',
        value: '',
        required: false,
        is_visible: true,
        read_only: false
    },
  
];

export const branchData = [

    {
        id: 1,
        name: 'Company Name',
        label: 'Company Name',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },
  
    {
        id: 2,
        label: 'Branch Code',
        name: 'Branch Code',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },
  
    {
        id: 3,
        label: 'Branch Name',
        name: 'Branch Name',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
        
    },

    {
        id: 4,
        label: 'Email',
        name: 'Email',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 5,
        label: 'Country',
        name: 'Country',
        type: 'select',
        list: [ 'Mumbai - India', 'Paris - France', 'Stockholm - Sweden', 'Ireland',
                'Osaka - Japan', 'Seoul - South Korea', 'Tokyo - Japan', 'Singapore',
                'Sydney - Australia', 'Central - Canada', 'São Paulo - Brazil',
                'Northern Virginia - USA', 'Ohio - USA', 'Northern California - USA',
                'Oregon - USA', 'Bahrain' ],
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 6,
        label: 'Mobile No.',
        name: 'Mobile No.',
        type: 'number',
        value: null,
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 7,
        label: 'Head Office',
        name: 'Is HeadOffice',
        type: 'checkbox',
        value: false,
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 8,
        label: 'Address',
        name: 'Address',
        type: 'textarea',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    }

]

export const companyData = [
  
    {
        id: 1,
        label: 'Branch Code',
        name: 'Branch Code',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },
  
    {
        id: 2,
        label: 'Branch Name',
        name: 'Branch Name',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
        
    },

    {
        id: 3,
        label: 'Email',
        name: 'Email',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 4,
        label: 'Country',
        name: 'Country',
        type: 'select',
        list: [ 'Mumbai - India', 'Paris - France', 'Stockholm - Sweden', 'Ireland',
                'Osaka - Japan', 'Seoul - South Korea', 'Tokyo - Japan', 'Singapore',
                'Sydney - Australia', 'Central - Canada', 'São Paulo - Brazil',
                'Northern Virginia - USA', 'Ohio - USA', 'Northern California - USA',
                'Oregon - USA', 'Bahrain' ],
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 5,
        label: 'Mobile No.',
        name: 'Mobile No.',
        type: 'number',
        value: null,
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 6,
        label: 'Head Office',
        name: 'Is HeadOffice',
        type: 'checkbox',
        value: false,
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 7,
        label: 'Address',
        name: 'Address',
        type: 'textarea',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    }

]

export const userData = [

    {
        id: 1,
        name: 'First Name',
        label: 'First Name',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 2,
        name: 'Last Name',
        label: 'Last Name',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 3,
        name: 'Email',
        label: 'Email',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 4,
        name: 'Password',
        label: 'Password',
        type: 'password',
        value: '',
        required: false,
        is_visible: true,
        read_only: false
    },

    {
        id: 5,
        name: 'Phone',
        label: 'Phone',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 6,
        name: 'User Role',
        label: 'User Role',
        type: 'select',
        list: [],
        value: '',
        required: false,
        is_visible: true,
        read_only: false
    },

    {
        id: 7,
        name: 'Address',
        label: 'Address',
        type: 'textarea',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

]

export const onBoardingUserData = [

    {
        id: 1,
        name: 'First Name',
        label: 'First Name',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 2,
        name: 'Last Name',
        label: 'Last Name',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 3,
        name: 'Email',
        label: 'Email',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 4,
        name: 'Password',
        label: 'Password',
        type: 'text',
        value: '',
        required: false,
        is_visible: true,
        read_only: false
    },

    {
        id: 5,
        name: 'Phone',
        label: 'Phone',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 6,
        name: 'User Role',
        label: 'User Role',
        type: 'select',
        list: [ 'Admin' ],
        value: 'Admin',
        required: false,
        is_visible: true,
        read_only: true
    },

    {
        id: 7,
        name: 'Address',
        label: 'Address',
        type: 'textarea',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

]

export const followUpData = [

    {
        id: 1,
        name: 'Enquiry No',
        label: 'Enquiry No',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: true
    },

    {
        id: 2,
        name: 'Chased By',
        label: 'Chased By',
        type: 'select',
        list: [],
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 3,
        name: 'Chase On',
        label: 'Chase On',
        type: 'datetime',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 4,
        name: 'Type',
        label: 'Type',
        type: 'select',
        list: [ 'Phone', 'Email', 'Marketing' ],
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 5,
        name: 'Description',
        label: 'Description',
        type: 'textarea',
        value: '',
        required: false,
        is_visible: true,
        read_only: false
    },

    {
        id: 6,
        name: 'Reminder to',
        label: 'Reminder to',
        type: 'select',
        list: [],
        value: '',
        required: false,
        is_visible: true,
        read_only: false
    },

    {
        id: 7,
        name: 'Completed',
        label: 'Completed',
        type: 'checkbox',
        value: false,
        required: false,
        is_visible: true,
        read_only: false
    }

]

export const organizationData = [

    {
        id: 1,
        name: 'Name',
        label: 'Organization Name',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 2,
        name: 'Contact Name',
        label: 'Contact Person Name',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 3,
        name: 'Email',
        label: 'Email',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 4,
        name: 'Phone No.',
        label: 'Phone No.',
        type: 'number',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 5,
        name: 'Mobile No.',
        label: 'Mobile No.',
        type: 'number',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 6,
        name: 'Pin Code',
        label: 'Pin Code',
        type: 'number',
        validation: { min: 6, max: 6 },
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 7,
        name: 'Notes',
        label: 'Notes',
        type: 'textarea',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 8,
        name: 'Address',
        label: 'Address',
        type: 'textarea',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 9,
        name: 'Shipping Address',
        label: 'Delivery Address',
        type: 'textarea',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 10,
        name: 'Billing Address',
        label: 'Billing Address',
        type: 'textarea',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

]

export const fieldData = [

    {
        id: 1,
        name: 'Field Name',
        label: 'Field Name',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 2,
        name: 'Label Name',
        label: 'Label Name',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 3,
        name: 'Field Type',
        label: 'Field Type',
        type: 'select',
        list: [ 'Date', 'String', 'Number', 'Checkbox', 'Select', 'Multi-Select', 'Textarea' ],
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

]

export const productData = [

    {
        id: 1,
        name: 'Product Type',
        label: 'Product Type',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },
    {
        id: 2,
        name: 'Product Description',
        label: 'Product Description',
        type: 'textarea',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },
    {
        id: 3,
        name: 'Quantity',
        label: 'Quantity',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

]

export const rolesData = [

    {
        id: 1,
        name: 'Role Name',
        label: 'Role Name',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 2,
        name: 'Description',
        label: 'Description',
        type: 'textarea',
        value: '',
        required: false,
        is_visible: true,
        read_only: false
    },

]

export const emailData = [

    {
        id: 1,
        name: 'Enquiry No',
        label: 'Enquiry No',
        type: 'text',
        value: '',
        required: true,
        is_visible: true,
        read_only: true
    },

    {
        id: 2,
        name: 'Receiver',
        label: 'Receiver',
        type: 'text',
        list: [],
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

    {
        id: 3,
        name: 'Email Prompt',
        label: 'Email Prompt',
        type: 'textarea',
        value: '',
        required: true,
        is_visible: true,
        read_only: false
    },

]

