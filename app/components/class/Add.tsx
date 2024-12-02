'use client'

import { myAxios } from '@/app/api/axios'
import { useEffect, useState } from "react"

export default function Details() {

  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  const [department, setDepartment] = useState('')
  const [myClass, setMyClass] = useState('')
  const [teacher, setTeacher] = useState('')
  const [guider, setGuider] = useState('')

  const [allDeps, setAllDeps] = useState<string[]>([])

  async function getDepartments() {
    const response = await myAxios.get(`/api/getInfo/getDepartment`)

    setAllDeps(response.data.departments)
  }

  useEffect(() => {
    getDepartments()
  }, [])

  async function submit() {

    const response = await myAxios.post('/api/class/newClass', {
      department: department,
      class: myClass,
      teacher: teacher,
      guider: guider
    })

    if (response.data.status === 'success') {
      setShowMessage(true)
      setMessage('成功添加班级')
    }
    else {
      setShowMessage(true)
      setMessage('系统出错，请稍后再试')
    }
    setTimeout(() => {
      setShowMessage(false)
      window.location.reload()
    }, 1500)
  }

  function selectDep(e: any) {
    setDepartment(e.target.value)
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl">录入班级信息</h1>
        <div className="flex flex-col mb-4">
          <p className="ml-3 mb-1">班名</p>
          <input
            className="w-48 h-8 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
            placeholder="请输入班名"
            value={myClass}
            onChange={e => setMyClass(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <p className="ml-3 mb-1">系部</p>
          <select
            onClick={selectDep}
            className="w-48 h-8 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
          >
            <option value="">请选择系部</option>
            {allDeps.map((deps) => (
              <option key={deps} value={deps}>{deps}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <p className="ml-3 mb-1">班主任</p>
          <input
            className="w-48 h-8 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
            placeholder="请输入班主任"
            value={teacher}
            onChange={e => setTeacher(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <p className="ml-3 mb-1">辅导员</p>
          <input
            className="w-48 h-8 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
            placeholder="请输入辅导员"
            value={guider}
            onChange={e => setGuider(e.target.value)}
          />
        </div>
        <button className="text-white hover:cursor-pointer bg-amber-700 px-3 py-1 rounded-md" onClick={submit}>录入</button>
      </div>
      {showMessage && (
        <div className="z-30 fixed top-10 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-800 text-white rounded shadow-lg">
          {message}
        </div>
      )}
    </>
  )
}