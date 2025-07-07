"use client";
import React from 'react'
import { signOut } from 'next-auth/react';
import { LogOutIcon } from 'lucide-react';

const Signout = () => {
  return (
   <div onClick={()=>signOut({callbackUrl: "/signin"})} className='flex justify-center items-center gap-2 cursor-pointer'> 
    <LogOutIcon className='w-5 h-5'/> sign out
   </div>
  )
}

export default Signout