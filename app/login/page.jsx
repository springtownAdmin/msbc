"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/Loading";
import { useToast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';
import DWERPLogo from '@/public/images/dwerp-logo.png';
import Image from "next/image";
import useAPI from "@/hooks/useAPI";
import useStorage from "@/hooks/useStorage";

const ErrorComponent = ({ children }) => {

  return <span className="text-rose-500 text-xs block px-2">{children}</span>;

};

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: "",
    company: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loaderSignIn, setShowLoaderSignIn] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [hasFilled, setFilled] = useState(false);
  const { toast } = useToast();
  const { authenticateUser, isFirstLogin } = useAPI();
  const { setItem } = useStorage();

  const currentState = useSelector((state) => state.list);

  const router = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "password") {

      if (value.length < 8) {
        setPasswordError("Password must be at least 8 characters long.");
      } else if (!/\d/.test(value)) {
        setPasswordError("Password must contain at least one number.");
      } else if (!/[A-Z]/.test(value)) {
        setPasswordError("Password must contain at least one uppercase letter.");
      } else if (!/[a-z]/.test(value)) {
        setPasswordError("Password must contain at least one lowercase letter.");
      } else {
        setPasswordError("");
      }

    }

    setData((prevData) => {

      const updatedData = { ...prevData, [name]: value };
      setFilled(updatedData.email !== "" && updatedData.password !== "");
      return updatedData;

    });

  };

  const handleSignIn = async () => {

    setShowLoaderSignIn(true);

    const currentUrl = window.location.href;
    let companyName = currentUrl.split('//')[1].split('.')[0].toLowerCase();

    await authenticateUser({ username: data.email, password: data.password }, companyName);
    setShowLoaderSignIn(false);

  };

  const handleKeyEnter = (e) => {

    if (e.key === 'Enter') {

      e.preventDefault();

      if (data.email !== '' && data.password !== '') {

        handleSignIn();

      }

    }

  }

  return (

    <div className={`w-full h-[100vh] flex justify-center items-center bg-orange-600`}>

      <motion.div initial={{ scale: 0 }} transition={{ duration: 0.3, ease: 'linear' }} animate={{ scale: 1 }}>

        <Card className="flex flex-col justify-between w-[400px]">

          <CardHeader>

            <div className="flex w-full justify-center">
              <Image src={DWERPLogo} alt='dwerp-logo' height={50} width={50} />
            </div>

            <CardTitle className={`text-center text-slate-800]`}>Welcome</CardTitle>

            <CardDescription className="text-center">
              Sign In to your account
            </CardDescription>

          </CardHeader>

          <CardContent className="space-y-2">

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder={"johndoe@gmail.com"} value={data.email} onKeyDown={handleKeyEnter} onChange={handleChange} required />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" name="password" onChange={handleChange} placeholder={"John@123"} onKeyDown={handleKeyEnter} type={showPassword ? "text" : "password"} value={data.password} className="" />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handleClickShowPassword}>
                  {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                </span>
              </div>
              {passwordError && (<ErrorComponent>{passwordError}</ErrorComponent>)}
            </div>

            {/* <div className="space-y-1">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" type="company" name="company" placeholder={"xyz"} value={data.company} onChange={handleChange} required />
                </div> */}

          </CardContent>

          <CardFooter className="flex-col">
            <Button className={`w-full ${!hasFilled || passwordError ? "opacity-50" : "hover:opacity-50"}`} onClick={handleSignIn} disabled={!hasFilled || passwordError}>
              {loaderSignIn ? <Loading color="#FFFFFF" /> : <div>Sign In</div>}
            </Button>
          </CardFooter>

        </Card>

      </motion.div>

    </div>

  );

};

export default Login;