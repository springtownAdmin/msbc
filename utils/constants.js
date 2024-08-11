import { MdDashboard } from "react-icons/md";
import { LuInfo } from "react-icons/lu";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaBuildingUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { z } from "zod";
import axios from "axios";

let counter = 0;

export const Menus = [

    {
        id: 1,
        name: 'Dashboard',
        Icon: MdDashboard,
        link: '/dashboard'
    },

    {
      id: 2,
      name: 'Branch',
      Icon: BsFillBuildingsFill,
      link: '/branch'
    },

    {
      id: 3,
      name: 'User Management',
      Icon: FaUsers,
      link: '/user-management'
    },

    {
      id: 4,
      name: 'Enquiry',
      Icon: LuInfo,
      link: '/enquiry'
    },

    {
      id: 5,
      name: 'Organization',
      Icon: FaBuildingUser,
      link: '/organization'
    },

]

export const Menus2 = [

  {
    id: 1,
    name: 'Dashboard',
    Icon: MdDashboard,
    link: '/dashboard'
  },

  {
    id: 2,
    name: 'Enquiry',
    Icon: LuInfo,
    link: '/enquiry'
  },

]

export const data = [

    {
      amount: 316,
      status: "lead in",
      projectName: "Project 01",
      enquiryNumber: 2000278,
      date: "2023-09-18",
      enquiryType: "Trade",
      siteReference: "-",
      customerName: "Holbox ",
      contactName: "Kamran",
      salesRepresentative: "Customer",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 306,
      status: "lead in",
      projectName: "Project 02",
      enquiryNumber: 2000277,
      date: "2023-08-17",
      enquiryType: "Contract",
      siteReference: "-",
      customerName: "MSBC",
      contactName: "Kamran",
      salesRepresentative: "admin",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 26,
      status: "quote in progress",
      projectName: "Project 03",
      enquiryNumber: 2000276,
      date: "2023-07-16",
      enquiryType: "Projects",
      siteReference: "-",
      customerName: "MSBC",
      contactName: "Kamran",
      salesRepresentative: "admin",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 242,
      status: "lead in",
      projectName: "Project 04",
      enquiryNumber: 2000275,
      date: "2023-06-15",
      enquiryType: "Contract",
      siteReference: "-",
      customerName: "MSBC",
      contactName: "Kamran",
      salesRepresentative: "admin",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 837,
      status: "quote in progress",
      projectName: "Project 05",
      enquiryNumber: 2000274,
      date: "2023-05-14",
      enquiryType: "Trade",
      siteReference: "-",
      customerName: "Holbox ",
      contactName: "Kamran",
      salesRepresentative: "Customer",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 874,
      status: "lead in",
      projectName: "Project 06",
      enquiryNumber: 2000273,
      date: "2023-04-13",
      enquiryType: "Trade",
      siteReference: "-",
      customerName: "MSBC",
      contactName: "Kamran",
      salesRepresentative: "admin",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 721,
      status: "lost",
      projectName: "Project 07",
      enquiryNumber: 2000272,
      date: "2023-03-12",
      enquiryType: "Trade",
      siteReference: "-",
      customerName: "MSBC",
      contactName: "Kamran",
      salesRepresentative: "Sales2",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 500,
      status: "lead in",
      projectName: "Project 11",
      enquiryNumber: 2000351,
      date: "2023-11-08",
      enquiryType: "Trade",
      siteReference: "-",
      customerName: "MSBC",
      contactName: "Mark",
      salesRepresentative: "Sales3",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 450,
      status: "quote in progress",
      projectName: "Project 12",
      enquiryNumber: 2000352,
      date: "2023-10-07",
      enquiryType: "Contract",
      siteReference: "-",
      customerName: "Holbox ",
      contactName: "Paul",
      salesRepresentative: "Sales1",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 600,
      status: "lead in",
      projectName: "Project 13",
      enquiryNumber: 2000353,
      date: "2023-09-06",
      enquiryType: "Projects",
      siteReference: "-",
      customerName: "Holbox ",
      contactName: "Luke",
      salesRepresentative: "Sales4",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 320,
      status: "quote ready",
      projectName: "Project 14",
      enquiryNumber: 2000354,
      date: "2023-08-05",
      enquiryType: "Trade",
      siteReference: "-",
      customerName: "MSBC",
      contactName: "Harry",
      salesRepresentative: "Sales2",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 125,
      status: "lost",
      projectName: "Project 15",
      enquiryNumber: 2000355,
      date: "2023-07-04",
      enquiryType: "Contract",
      siteReference: "-",
      customerName: "MSBC Developer",
      contactName: "Larry",
      salesRepresentative: "Sales1",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 275,
      status: "lead in",
      projectName: "Project 16",
      enquiryNumber: 2000356,
      date: "2023-06-03",
      enquiryType: "Phone Marketing",
      siteReference: "-",
      customerName: "MSBC Developer",
      contactName: "Chris",
      salesRepresentative: "Sales3",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 500,
      status: "lead in",
      projectName: "Project 17",
      enquiryNumber: 2000357,
      date: "2023-05-02",
      enquiryType: "Villas",
      siteReference: "-",
      customerName: "Holbox ",
      contactName: "Kevin",
      salesRepresentative: "Sales4",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 375,
      status: "quote ready",
      projectName: "Project 18",
      enquiryNumber: 2000358,
      date: "2023-04-01",
      enquiryType: "Trade",
      siteReference: "-",
      customerName: "Holbox ",
      contactName: "Oliver",
      salesRepresentative: "Sales1",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 290,
      status: "lost",
      projectName: "Project 19",
      enquiryNumber: 2000359,
      date: "2023-03-31",
      enquiryType: "Contract",
      siteReference: "-",
      customerName: "MSBC Developer",
      contactName: "James",
      salesRepresentative: "Sales2",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
  
    {
      amount: 420,
      status: "lead in",
      projectName: "Project 20",
      enquiryNumber: 2000360,
      date: "2023-02-28",
      enquiryType: "Phone Marketing",
      siteReference: "-",
      customerName: "MSBC",
      contactName: "William",
      salesRepresentative: "Sales3",
      enquiryBy: "admin",
      notes: " -Design Attached",
      branch: "Head Office",
      targetDate: "2023-10-26",
      phoneNo: "0987654321",
      mobileNo: "0987654321"
    },
];

export const dateFormatter = (date) => {
    return new Date(date).toISOString();
}

export const toSnakeCase = (str = '') => {

  const snakeCaseRegex = /^[a-z]+(_[a-z]+)*$/;
  const isAlreadySnakeCase = snakeCaseRegex.test(str);

  const snakeCase = str.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '_');

  return isAlreadySnakeCase ? str : snakeCase;

}

export const formatDateToYYYYMMDD = (date) => {

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  
}

export const getNumber = () => {

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dd = date.getDate();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${year}${month}${dd}${counter++}`;

}

export const createZodValidation = (data) => {

    const newData = data.map((x) => {

      if(x.required === true) {

        if (x.type === 'text') {

          return z.string().nonempty(`${x.label} is required`);

        } else if (x.type === 'date') {

          return z.string().nonempty(`${x.label} is required`).refine(date => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
          });

        } else if (x.type === 'multi-select' || x.type === 'multi-checkbox') {

          return z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
          })

        } else if (x.type === 'number') {

          const validation = x.validation ?? { min: 10, max: 10 }

          return z.string({ message: `${x.label} is required` }).min(validation.min, { message: `${x.label} must be atleast ${validation.min} digits` }).max(validation.max, { message: `${x.label} must be atmost ${validation.max} digits` })

        } else if (x.type === 'checkbox') {

          return z.boolean().default(false).optional()

        } else {

          return z.string().nonempty(`${x.label} is required`);

        }


      }

      return z.string().optional();

    });

    const getAllKeys = data.map((x) => toSnakeCase(x.name));

    const newObj = {};

    for (let i = 0; i < getAllKeys.length; i++) {
      newObj[getAllKeys[i]] = newData[i];
    }

    return z.object(newObj);

}

export const putValues = (data, type = 'default') => {

  const allLabels = data.map((x) => toSnakeCase(x.name));
  const newObj = {};

  data.forEach((item, i) => {

    if (item.type === 'date') {
      newObj[allLabels[i]] = type === 'default' ? dateFormatter(new Date()) : item.value;
    } else if (item.type === 'multi-checkbox') {
      newObj[allLabels[i]] = type === 'default' ? [] : item.value;
    } else if (item.type === 'checkbox') {
      newObj[allLabels[i]] = type === 'default' ? false : item.value;
    } else {
      newObj[allLabels[i]] = type === 'default' ? '' : item.value;
    }

  });

  return newObj;

}

export const getRowData = (list = []) => {

    if (list.length === 0) return [];

    const keys = Object.keys(list[0]);
    const newArr = [];

    list.forEach((x) => {

      let obj = {};
      keys.forEach((y) => {
        obj[y] = x[y];
      })
      newArr.push(obj);

    })

    // console.log(newArr);
    return newArr;

}

export const getColumnHeader = (data, ActionsRenderer) => {

  const filterOptions = {
    text: 'agTextColumnFilter',
    number: 'agNumberColumnFilter',
    date: 'agDateColumnFilter',
    checkbox: 'agTextColumnFilter',
    select: 'agTextColumnFilter',
    'multi-checkbox': 'agTextColumnFilter',
    'multi-select': 'agTextColumnFilter',
    email: 'agTextColumnFilter',
    textarea: 'agTextColumnFilter'
  }

  const newArr = data.map((x, i) => {

    if (i === 0) return { field: toSnakeCase(x.name), headerName: x.name, headerCheckboxSelection: true, checkboxSelection: true, filter: filterOptions[x.type] }

    return { field: toSnakeCase(x.name), headerName: x.name, filter: filterOptions[x.type] };

  });

  newArr.push({ field: 'actions', headerName: 'Actions', cellRenderer: ActionsRenderer })

  return newArr;

}

export const breakData = (data = [], breakArr = []) => {

  if (data.length === 0) return [];

  if (breakArr.length === 0) return [];

  const keys = data.map(x => toSnakeCase(x.name));

  const newArr = [];
  let newInd = 0;

  breakArr.forEach((x) => {
    
    const indexedKey = keys.findIndex((y) => y === toSnakeCase(x));
    newArr.push(data.slice(newInd, indexedKey + 1));
    newInd = indexedKey + 1;

  })

  return newArr;


}

export const removeFieldsFromList = (fields = [], list = []) => {

  const newList = list.map(item => {
    const newItem = { ...item };
    fields.forEach(field => {
      delete newItem[toSnakeCase(field)];
    });
    return newItem;
  });

  return newList;

}

export const BACKEND_API = axios.create({

    baseURL: process.env.BACKEND_API,

})