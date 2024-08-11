import { z } from "zod";

export const enquiryformSchema = z.object({

    enquiry_no: z.string({
      message: "Enquiry No is required"
    }),
  
    enquiry_date: z.string().nonempty('Enquiry date is required').refine(date => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
  
    type: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  
    enquiry_by: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  
    branch: z.string({
      message: 'Branch is required',
    }),
  
    status: z.string({
      message: 'Status is required',
    }),
    
    by: z.string().nonempty("By is required"),
    estimator: z.string(),
    sales_representative: z.string().nonempty("Sales representative is required"),
    project_name: z.string().nonempty("Project name is required"),
    architect_name: z.string(),
    site_reference: z.string().nonempty("Site reference is required"),
    tentative_project_value: z.string().nonempty("Tentative project value is required"),
    notes: z.string(),
    customer: z.string().nonempty("Customer is required"),
    contact_name: z.string().nonempty("Contact name is required"),
    customer_email: z.string().nonempty("Customer email is required"),
    mobile_no: z.string().nonempty("Mobile no is required").refine((value) => /^\d{10}$/.test(value), {
        message: "Phone number must be exactly 10 digits",
    }),
    phone_no: z.string().nonempty("Phone no is required").refine((value) => /^\d{10}$/.test(value), {
        message: "Phone number must be exactly 10 digits",
    }),
    address: z.string(),
    country: z.string().nonempty("Country is required"),
    post_code: z.string()
    .nonempty("Post code is required")
    .refine((value) => /^\d{6}$/.test(value), {
      message: "Post code must be exactly 6 digits (Non-negative)",
    }),
    delivery_address: z.string(),
    billing_address: z.string(),

});

export const fieldFormSchema = z.object({

  field_name: z.string({
    message: "Field name is required"
  }),

  label_name: z.string({
    message: "Label name is required"
  }),

  type: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),

});