import { MdDashboard } from "react-icons/md";
import { LuInfo } from "react-icons/lu";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaBuildingUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { BsPersonFillExclamation } from "react-icons/bs";
import { MdOutlineTextFields } from "react-icons/md";
import { z } from "zod";
import axios from "axios";

let counter = 0;

export const MenuData = {

  'User Management': {
    Icon: FaUsers,
    link: '/user-management',
  },

  'Enquiry Management': {
    Icon: LuInfo,
    link: '/enquiry'
  },

  'Organization Management': {
    Icon: FaBuildingUser,
    link: '/organization'
  },

  'Branch Management': {
    Icon: BsFillBuildingsFill,
    link: '/branch'
  },

  'Follow Up': {
    Icon: BsPersonFillExclamation,
    link: '/follow-up'
  }

}

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

    {
      id: 6,
      name: 'Follow Up',
      Icon: BsPersonFillExclamation,
      link: '/follow-up'
    },

    {
      id: 7,
      name: 'Custom Fields',
      Icon: MdOutlineTextFields,
      link: '/custom-fields'
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

        } else if (x.type === 'date' || x.type === 'datetime') {

          return z.string().nonempty(`${x.label} is required`).refine(date => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
          });

        } else if (x.type === 'multi-select' || x.type === 'multi-checkbox') {

          return z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
          }).optional()

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

    if (item.type === 'date' || item.type === 'datetime') {
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

export const getColumnHeader = (data = [], ActionsRenderer, deletedFields = []) => {

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

  let newArr = [];

  if (deletedFields.length === 0) {

    newArr = data.map((x, i) => {
  
      if (i === 0) return { field: toSnakeCase(x.name), headerName: x.name, headerCheckboxSelection: true, checkboxSelection: true, filter: filterOptions[x.type] }
  
      return { field: toSnakeCase(x.name), headerName: x.name, filter: filterOptions[x.type] };
  
    });

  } else {

    const updateData = data.filter((x) => {

      if (!deletedFields.includes(x.name)) return x;

    });


    newArr = updateData.map((x, i) => {
  
      if (i === 0) return { field: toSnakeCase(x.name), headerName: x.name, headerCheckboxSelection: true, checkboxSelection: true, filter: filterOptions[x.type] }
  
      return { field: toSnakeCase(x.name), headerName: x.name, filter: filterOptions[x.type] };
  
    });

  }

  newArr.push({ field: 'actions', headerName: 'Actions', cellRenderer: ActionsRenderer, pinned: 'right', width: 100 })

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

export const deleteFieldsFromArray = (fields = [], deletedFields = []) => {

  return fields.map(obj => {
    // Create a shallow copy of the object
    let newObj = { ...obj };
    
    // Delete specified fields
    deletedFields.forEach(field => delete newObj[field]);
    
    return newObj;

  });

}

export const BACKEND_API = axios.create({

    baseURL: process.env.BACKEND_API,

})


/**
 * regular expression to check for valid hour format (01-23)
 */
export function isValidHour(value) {
  return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value);
}
 
/**
 * regular expression to check for valid 12 hour format (01-12)
 */
export function isValid12Hour(value) {
  return /^(0[1-9]|1[0-2])$/.test(value);
}
 
/**
 * regular expression to check for valid minute format (00-59)
 */
export function isValidMinuteOrSecond(value) {
  return /^[0-5][0-9]$/.test(value);
}
 
export function getValidNumber(value, { max, min = 0, loop = false }) {
  let numericValue = parseInt(value, 10);
 
  if (!isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max;
      if (numericValue < min) numericValue = min;
    } else {
      if (numericValue > max) numericValue = min;
      if (numericValue < min) numericValue = max;
    }
    return numericValue.toString().padStart(2, "0");
  }
 
  return "00";
}
 
export function getValidHour(value) {
  if (isValidHour(value)) return value;
  return getValidNumber(value, { max: 23 });
}
 
export function getValid12Hour(value) {
  if (isValid12Hour(value)) return value;
  return getValidNumber(value, { min: 1, max: 12 });
}
 
export function getValidMinuteOrSecond(value) {
  if (isValidMinuteOrSecond(value)) return value;
  return getValidNumber(value, { max: 59 });
}
 
export function getValidArrowNumber(value, { min, max, step }) {
  let numericValue = parseInt(value, 10);
  if (!isNaN(numericValue)) {
    numericValue += step;
    return getValidNumber(String(numericValue), { min, max, loop: true });
  }
  return "00";
}
 
export function getValidArrowHour(value, step) {
  return getValidArrowNumber(value, { min: 0, max: 23, step });
}
 
export function getValidArrow12Hour(value, step) {
  return getValidArrowNumber(value, { min: 1, max: 12, step });
}
 
export function getValidArrowMinuteOrSecond(value, step) {
  return getValidArrowNumber(value, { min: 0, max: 59, step });
}
 
export function setMinutes(date, value) {
  const minutes = getValidMinuteOrSecond(value);
  date.setMinutes(parseInt(minutes, 10));
  return date;
}
 
export function setSeconds(date, value) {
  const seconds = getValidMinuteOrSecond(value);
  date.setSeconds(parseInt(seconds, 10));
  return date;
}
 
export function setHours(date, value) {
  const hours = getValidHour(value);
  date.setHours(parseInt(hours, 10));
  return date;
}
 
export function set12Hours(date, value, period) {
  const hours = parseInt(getValid12Hour(value), 10);
  const convertedHours = convert12HourTo24Hour(hours, period);
  date.setHours(convertedHours);
  return date;
}
 
export function setDateByType(date,value,type,period) {
  switch (type) {
    case "minutes":
      return setMinutes(date, value);
    case "seconds":
      return setSeconds(date, value);
    case "hours":
      return setHours(date, value);
    case "12hours": {
      if (!period) return date;
      return set12Hours(date, value, period);
    }
    default:
      return date;
  }
}
 
export function getDateByType(date, type) {
  switch (type) {
    case "minutes":
      return getValidMinuteOrSecond(String(date.getMinutes()));
    case "seconds":
      return getValidMinuteOrSecond(String(date.getSeconds()));
    case "hours":
      return getValidHour(String(date.getHours()));
    case "12hours":
      const hours = display12HourValue(date.getHours());
      return getValid12Hour(String(hours));
    default:
      return "00";
  }
}
 
export function getArrowByType(
  value,
  step,
  type
) {
  switch (type) {
    case "minutes":
      return getValidArrowMinuteOrSecond(value, step);
    case "seconds":
      return getValidArrowMinuteOrSecond(value, step);
    case "hours":
      return getValidArrowHour(value, step);
    case "12hours":
      return getValidArrow12Hour(value, step);
    default:
      return "00";
  }
}
 
/**
 * handles value change of 12-hour input
 * 12:00 PM is 12:00
 * 12:00 AM is 00:00
 */
export function convert12HourTo24Hour(hour, period) {
  if (period === "PM") {
    if (hour <= 11) {
      return hour + 12;
    } else {
      return hour;
    }
  } else if (period === "AM") {
    if (hour === 12) return 0;
    return hour;
  }
  return hour;
}
 
/**
 * time is stored in the 24-hour form,
 * but needs to be displayed to the user
 * in its 12-hour representation
 */
export function display12HourValue(hours) {
  if (hours === 0 || hours === 12) return "12";
  if (hours >= 22) return `${hours - 12}`;
  if (hours % 12 > 9) return `${hours}`;
  return `0${hours % 12}`;
}
 

