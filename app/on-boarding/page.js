"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomGrid } from "@/components/grid";
import { redirect, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { BACKEND_API, createZodValidation, putValues } from "@/utils/constants";
import { companyData, onBoardingUserData, userData } from "@/utils/data";
import { DynamicFields } from "@/components/dynamic-fields";
import { addItem } from "@/lib/slices/list";
import { LongLoader } from "@/components/long-loader";
import useCustomToast from "@/hooks/useCustomToast";
import useStorage from "@/hooks/useStorage";
import useLoader, { Loader } from "@/hooks/useLoader";
import { useToast } from "@/components/ui/use-toast";
import useAPI from "@/hooks/useAPI";

export default function OnBoarding() {

  const [step, setStep] = useState(0);
  const router = useRouter();
  const { showToast } = useCustomToast();
  const { show, showLoader, hideLoader } = useLoader();
  const { getItem, setItem } = useStorage();
  const { isFirstLogin } = useAPI();
  const [onBoarded, setOnBoarded] = useState(false);
  // const [isFirstLogin, setFirstLogin] = useState(false);

  useEffect(() => {

    const isFirstTime = async () => {

      showLoader();
      const result = await isFirstLogin();
      setOnBoarded(result?.is_first_login);
      result?.is_first_login === false && router.push('/not-found');
      hideLoader();

    }

    isFirstTime();

  }, []);

  const defaultValues1 = putValues(companyData);
  let defaultValues2 = putValues(onBoardingUserData, 'no-default');

  const form1 = useForm({
    defaultValues: defaultValues1,
    resolver: zodResolver(createZodValidation(companyData))
  });

  const form2 = useForm({
    defaultValues: defaultValues2,
    resolver: zodResolver(createZodValidation(onBoardingUserData))
  });

  const form = [form1, form2];

  const [formData, setFormData] = useState([defaultValues1, defaultValues2]);

  if (!onBoarded) return null;

  const onSubmit = async (values) => {

    if (step < 1) {

      setStep(step + 1);
      const newArr = [...formData];
      newArr[step] = values;
      setFormData(newArr);

    } else {

      try {

        showLoader();
        const company_name = getItem('company_name');
        const reqBody = { ...formData[0], company_name: company_name };
        const reqBody2 = { ...values, company_name: company_name };

        delete reqBody2.user_role;

        reqBody2['user_role'] = 2;

        console.log({ reqBody, reqBody2 })

        const resp = await BACKEND_API.post('/branches', { ...reqBody, company_name: company_name });
        const resp2 = await BACKEND_API.post('/users', reqBody2);
        const result = resp.data;

        console.log(result)
        console.log(resp2.data);

        showToast(result.status_code, result.message)


      } catch (e) {

        toast({ title: 'Something went wrong!', variant: 'destructive' });
        hideLoader();
        return;

      } finally {

        hideLoader();
        router.push('/dashboard');
        showToast(201, 'Branch has been created successfully!');

      }

    }

  }

  const slider = {
    initial: { translateX: '-50px', opacity: 0 },
    transition: { duration: 0.8, ease: 'linear' },
    animate: { translateX: 0, opacity: 1 }
  }

  const branchSlider = {
    initial: step === 0 ? { opacity: 1, display: 'block' } : { display: 'none', opacity: 0 },
    transition: { duration: 0.5, ease: 'linear', delay: step === 0 ? 0.6 : 0 },
    animate: step === 1 ? { translateX: '20px', opacity: 0 } : { opacity: 1, display: 'block' }
  }

  const userSlider = {
    initial: step === 1 ? { opacity: 1, display: 'block' } : { display: 'none', opacity: 0 },
    transition: { duration: 0.5, ease: 'linear', delay: step === 1 ? 0.6 : 0 },
    animate: step === 1 ? { translateX: 0, opacity: 1, display: 'block' } : { translateX: '-20px', display: 'none', opacity: 0 }
  }

  const handleBack = () => {

    setStep(step - 1)

  }


  return (

    <>

      <div className="h-screen flex justify-center items-center w-full">
        <Loader show={show}>

          <div className="flex justify-center items-center bg-orange-500 w-full h-full">

            <Form {...form[step]}>

              <form onSubmit={form[step].handleSubmit(onSubmit)}>

                <motion.div initial={slider.initial} transition={slider.transition} animate={slider.animate}>

                  <Card className="md:min-w-[700px] sm:w-[500px] md:h-[500px] w-[300px] bg-white rounded-md m-2">

                    <motion.div initial={branchSlider.initial} transition={branchSlider.transition} animate={branchSlider.animate}>

                      <CardHeader>
                        <CardTitle>Company Details</CardTitle>
                        <CardDescription>Please create head branch to proceed</CardDescription>
                      </CardHeader>

                      <CardContent className='h-[340px] overflow-auto'>

                        <CustomGrid row={2}>

                          <DynamicFields data={companyData} form={form[0]} />

                        </CustomGrid>


                      </CardContent>

                      <CardFooter>
                        <Button>Next</Button>
                      </CardFooter>

                    </motion.div>

                    <motion.div initial={userSlider.initial} transition={userSlider.transition} animate={userSlider.animate}>

                      <CardHeader>
                        <CardTitle>User Details</CardTitle>
                        <CardDescription>Create user</CardDescription>
                      </CardHeader>

                      <CardContent className='h-[340px] overflow-auto'>

                        <CustomGrid row={2}>

                          <DynamicFields data={onBoardingUserData} form={form[1]} />

                        </CustomGrid>


                      </CardContent>

                      <CardFooter className='flex justify-between'>
                        <div>
                          <Button type='button' onClick={handleBack}>Back</Button>
                        </div>
                        <div className="flex gap-3">
                          {/* <Button type='button' variant='secondary' onClick={handleSkip}>Skip</Button> */}
                          <Button>Next</Button>
                        </div>
                      </CardFooter>

                    </motion.div>

                  </Card>

                </motion.div>

              </form>

            </Form>

          </div>

        </Loader>
      </div>

    </>

  );

}
