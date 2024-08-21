"use client"

import { useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menus, Menus2 } from "@/utils/constants";
import { Check } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CustomTooltip } from './custom-tooltip';
import useStorage from '@/hooks/useStorage';
import { MdLogout } from "react-icons/md";
import Image from 'next/image';
import dwerpLogo from '@/public/images/dwerp-full-logo.png'
import ProtectedRoute from './protected-route';
import { FaUserCog } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export const Container = ({ children, id = 1 }) => {

  const activeId = id;
  const router = useRouter();

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("");
  const [openUserInfo, setOpenUserInfo] = useState(false);
  const inputRef = useRef(null);
  const [userDetails, setUserDetails] = useState({ username: '', firstname: '', lastname: '', phone: '', mobile: '', email: '', address: '' })
  const { getItem, clearStorage } = useStorage();
  const MenuItems = getItem('role') === "2" ? Menus2 : Menus;

  useEffect(() => {

    const email = typeof window !== 'undefined' ? window.localStorage.getItem('email') : null;
    setUserDetails({ ...userDetails, email: email });

  }, []);

  const handleMenu = (data) => {
    router.push(data.link);
  }

  const handleLogOut = () => {

    clearStorage();
    router.push('/login');

  }

  const handleUserDetails = (e) => {

    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

  }

  const handleUserInfo = () => {

    setOpenUserInfo(true);

  }

  const handleCloseUserInfo = () => {

    setOpenUserInfo(false);

  }

  const handleSaveUserInfo = () => {

    setOpenUserInfo(false);

  }

  return (

    <ProtectedRoute>
      <div className="w-full h-screen relative flex">

          <Dialog open={openUserInfo} onOpenChange={handleCloseUserInfo}>

            <DialogContent className="sm:max-w-[425px]">

                <DialogHeader>
                    <DialogTitle>Add / Edit User Info</DialogTitle>
                    <DialogDescription>
                        Add / Edit necessary user details
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-3 py-4 w-full h-[300px] overflow-auto">

                    <div className='w-[98%]'>
                        <Label>First Name</Label>
                        <Input type='text' className='w-[97%] mt-1' name='firstname' value={userDetails.firstname} onChange={handleUserDetails}  />
                    </div>

                    <div className='w-[98%]'>
                        <Label>Last Name</Label>
                        <Input type='text' className='w-[97%] mt-1' name='lastname' value={userDetails.lastname} onChange={handleUserDetails}  />
                    </div>

                    <div className='w-[98%]'>
                        <Label>Phone</Label>
                        <Input type='text' className='w-[97%] mt-1' name='phone' value={userDetails.phone} onChange={handleUserDetails}  />
                    </div>

                    <div className='w-[98%]'>
                        <Label>Email</Label>
                        <Input type='email' className='w-[97%] mt-1' name='email' value={userDetails.email} onChange={handleUserDetails}  />
                    </div>

                    <div className='w-[98%]'>
                        <Label>Address</Label>
                        <Textarea rows={3} className='w-[97%] mt-1' value={userDetails.address} onChange={handleUserDetails}  />
                    </div>

                    {/* <div className='w-[98%]'>
                        <Label>Product Description</Label>
                        <Textarea rows={3} className='w-[97%] mt-1' name='description' value={addProduct.description} onChange={handleChange} />
                    </div>

                    <div className='w-[98%]'>
                        <Label>Quantity</Label>
                        <Input type='text' className='w-[97%] mt-1' name='quantity' value={addProduct.quantity} onChange={handleChange} />
                    </div> */}

                </div>

                <DialogFooter>
                    <Button type="button" variant='secondary' onClick={handleCloseUserInfo}>Cancel</Button>
                    <Button type="button" onClick={handleSaveUserInfo}>Save</Button>
                </DialogFooter>

            </DialogContent>

          </Dialog>

          <div className="border-r h-full w-[65px]">

            <div className="p-4 flex flex-col gap-4 items-center">

              {MenuItems.map((v, i) => {

                if (v?.submenu === undefined) {

                  return (
                    <div key={`MenuItem-${i}`}>
                      <CustomTooltip content={v.name}>
                        <div onClick={() => handleMenu(v)} className={`${activeId === v.id ? 'bg-orange-500 text-white' : 'hover:bg-orange-100 text-orange-500'} transition-all duration-200 p-2 rounded-md`}>
                          <v.Icon size={25} />
                        </div>
                      </CustomTooltip>
                    </div>
                  )

                }

                return (

                  <Popover open={open} onOpenChange={setOpen} key={`MenuItem-${i}`}>

                    <PopoverTrigger className={`${activeId === v.id ? 'bg-orange-500 text-white' : 'hover:bg-orange-100 text-orange-500'} transition-all duration-200 p-2 rounded-md`}>
                      <v.Icon size={25} />
                    </PopoverTrigger>
    
                    <PopoverContent className='absolute left-[10px] p-2 w-[150px]'>
    
                        {v.submenu.map((item, i) => (
                                <div
                                  key={`menu-submenu-${item}-${i}`}
                                  ref={inputRef}
                                  value={item}
                                  onClick={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false);
                                    console.log(currentValue)
                                  }}
                                >
                                  <div className='hover:bg-orange-100 rounded-sm p-1 px-2 cursor-pointer' onClick={() => setOpen(false)}>
                                    <Check className={cn("mr-2 h-2 w-2", value === item ? "opacity-100" : "opacity-0")} />
                                    {item}
                                  </div>
                                </div>
                        ))}
    
                    </PopoverContent>
    
                  </Popover>

                )
                

              })}

            </div>

            <div className='absolute bottom-0 p-3'>
                <CustomTooltip content='Log out'>
                  <div onClick={handleLogOut} className='hover:bg-orange-100 text-orange-500 transition-all duration-200 cursor-pointer p-2 rounded-md'>
                    <MdLogout size={25} />
                  </div>
                </CustomTooltip>
            </div>

          </div>

          <div className='h-full w-full'>

              <div className='w-full flex items-center justify-between p-4'>

                <div>
                  <Image src={dwerpLogo} alt='dwerp-logo' height={90} width={100} />
                </div>

                <CustomTooltip content='User Profile'>
                  <div onClick={handleUserInfo} className='hover:bg-orange-100 text-orange-500 transition-all duration-200 cursor-pointer p-2 rounded-md'>
                    <FaUserCog size={22} />
                  </div>
                </CustomTooltip>

              </div>

              <hr />

              <div className='w-full h-[90%] p-4 overflow-auto'>
                  
                {children}

              </div>

          </div>

      </div>
    </ProtectedRoute>

  );

}