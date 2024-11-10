'use client'

import React, { Suspense, useState } from "react"
import Menu from "@/public/Menu";
import HumanList from "@/public/HumanList";
import Teacher from "@/public/Teacher";

const ClassInfo = React.lazy(() => import('./components/classInfo/index'))
const StudentInfo = React.lazy(() => import('./components/studentInfo/index'))
const TeacherInfo = React.lazy(() => import('./components/teacherInfo/index'))

export default function Page() {
  const [clicked, setClicked] = useState('')  // 存储点击的按钮类型
  const [isOpen, setIsOpen] = useState(false) // 控制窗口显示

  function getView() {
    switch (clicked) {
      case 'classInfo':
        return <ClassInfo />
      case 'studentInfo':
        return <StudentInfo />
      case 'teacherInfo':
        return <TeacherInfo />
      default:
        return <></>
    }
  }

  // 点击按钮时更新点击的组件并显示窗口
  function handleClick(type: any) {
    setClicked(type)
    setIsOpen(true)
  }

  return (
    <div className='w-full flex'>
      <div onClick={() => handleClick('classInfo')} className='flex flex-col px-6 py-5 rounded-lg w-1/3 h-60 text-3xl shadow-lg cursor-pointer bg-sky-700 text-white transition duration-300 ease-in-out hover:scale-105'>
        <div className='mt-auto'>
          <Menu height={70}/>
          <p className='mt-5'>班级概览</p>
        </div>
      </div>
      <div onClick={() => handleClick('studentInfo')}
           className='flex px-6 py-5 rounded-lg w-1/3 h-60 text-3xl mx-5 shadow-lg cursor-pointer bg-emerald-700 text-white transition duration-300 ease-in-out hover:scale-105'>
        <div className='mt-auto'>
          <HumanList height={70}/>
          <p className='mt-5'>学生概览</p>
        </div>
      </div>
      <div onClick={() => handleClick('teacherInfo')}
           className='flex px-6 py-5 rounded-lg w-1/3 h-60 text-3xl shadow-lg cursor-pointer bg-orange-600 text-white transition duration-300 ease-in-out hover:scale-105'>
        <div className='mt-auto'>
          <Teacher height={70}/>
          <p className='mt-5'>教师概览</p>
        </div>
      </div>


      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div
            className="p-5 overflow-y-scroll rounded-xl w-8/12 h-4/6 z-20 bg-yellow-50 absolute top-1/2 left-1/2 transform 
          -translate-x-1/2 -translate-y-1/2"
          >
            <Suspense fallback={<div>加载中...</div>}>
              {getView()}
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}
