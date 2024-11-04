'use client'

import React, { Suspense, useState } from "react"

const ClassInfo = React.lazy(() => import('./components/classInfo/index'))
const StudentInfo = React.lazy(() => import('./components/studentInfo/index'))
const TeacherInfo = React.lazy(() => import('./components/teacherInfo/index'))

export default function Page() {
  const [clicked, setClicked] = useState('')  // 存储点击的按钮类型
  const [isOpen, setIsOpen] = useState(false) // 控制窗口显示

  function getView() {
    switch (clicked) {
      case 'A':
        return <ClassInfo />
      case 'B':
        return <StudentInfo />
      case 'C':
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
    <div>
      <a onClick={() => handleClick('A')}>课程管理</a>
      <a className="mx-10" onClick={() => handleClick('B')}>学生管理</a>
      <a onClick={() => handleClick('C')}>教师管理</a>

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
