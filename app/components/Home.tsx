'use client';

import { useRouter } from "next/navigation";
import React from "react";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter()

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function studentInfo() {
    setIsOpen(!isOpen);
    router.push('/studentInfo')
  }

  return (
    <>
      <div className="flex flex-col">
        <p> is main page</p>
        <p> is main page</p>
        <p> is main page</p>
        <a onClick={studentInfo}>学生管理</a>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={handleClick}
          ></div>
          <div
            className="p-5 overflow-y-scroll rounded-xl w-8/12 h-4/6 z-20 bg-yellow-50 absolute top-1/2 left-1/2 transform
            -translate-x-1/2 -translate-y-1/2"
          >
            {children}
          </div>
        </>
      )}
    </>
  )
}