'use client'

import { useSearchParams } from "next/navigation"
import { myAxios } from '@/app/api/axios'
import { useEffect, useState } from "react"
import { Class } from "@prisma/client"
import StudentNumber from "@/public/icons/StudentNumber"
import Phone from "@/public/icons/Phone"
import IdCard from "@/public/icons/IdCard"
import Link from "next/link"
import Logout from "@/public/icons/Logout"
import { useRouter } from "next/navigation"

export default function Details() {

  const router = useRouter()
  const searchParams = useSearchParams()
  const class_name = searchParams.get('class_name') as string
  const [myClass, setMyClass] = useState<Class>()
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [doubleVerify, setDoubleVerify] = useState(false)

	const [allDeps, setAllDeps] = useState<string[]>([])
	const [department, setDepartment] = useState('')
	const [master, setMaster] = useState('')
	const [guider, setGuider] = useState('')

  async function getclass(class_name: string) {
    const response = await myAxios.get(`/api/class/getClass?class_name=${class_name}`)
    setMyClass(response.data.data.classes[0])
  }

	async function getDepartments() {
		const response = await myAxios.get(`/api/getInfo/getDepartment`)

		setAllDeps(response.data.departments)
	}

  useEffect(() => {
    async function getUserInfo() {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/')
        return
      }

      else getclass(class_name)
    }
    getUserInfo()

		getDepartments()
  }, [])

  async function changeDepartments(name: string, department: string) {
    const response = await myAxios.put(`/api/class/update/updateDepartment?name=${name}&department=${department}`)

    if (response.data.status === 'success') {
      setShowMessage(true)
      setMessage('成功修改')
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

	async function changeMaster(name: string, master: string) {
		const response = await myAxios.put(`/api/class/update/updateMaster?name=${name}&master=${master}`)

    if (response.data.status === 'success') {
      setShowMessage(true)
      setMessage('成功修改')
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

	async function changeGuider(name: string, guider: string) {
		const response = await myAxios.put(`/api/class/update/updateGuider?name=${name}&guider=${guider}`)

    if (response.data.status === 'success') {
      setShowMessage(true)
      setMessage('成功修改')
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

  async function removeClass(name: string) {
    const response = await myAxios.delete(`/api/class/removeClass?name=${name}`)

    if (response.data.status === 'success') {
      setShowMessage(true)
      setMessage('成功删除该班级,3秒后自动返回主页')

      setTimeout(() => {
        setShowMessage(false)
        router.push('/')
      }, 3000)
    }
  }

	function selectDep(e: any) {
		setDepartment(e.target.value)
	}

  return (

    <div
      className="p-10 overflow-y-scroll rounded-xl w-1/2 z-20 bg-yellow-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={{ minWidth: '720px' }}
    >
      <div className="flex items-center">
        <h1 className="text-5xl">{myClass ? myClass.class_name : 'Loading...'}</h1>
        <button
          className="ml-5 transition duration-300 ease-in-out hover:scale-110 text-white bg-red-500 px-2 py-1 rounded-lg"
          onClick={() => setDoubleVerify(true)}
        >删除记录</button>
        <Link href={'/'} className="ml-auto flex items-center">
          <Logout height={30} />
          <p>返回主页</p>
        </Link>
      </div>
      <div className="mx-10 mt-5 flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <Phone height={30} />
            <p className="ml-3">系部</p>
          </div>
          <p>{myClass ? myClass.department_name : 'Loading...'}</p>
          <div>
            <select
							onClick={selectDep}
							className="w-48 h-8 mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
						>
							<option value="">请选择系部</option>
							{allDeps.map((deps) => (
								<option key={deps} value={deps}>{deps}</option>
							))}
						</select>
            <button
              className="ml-1 transition duration-300 ease-in-out hover:scale-110"
              onClick={() => {changeDepartments(myClass?.class_name as string, department)}}
              disabled={department === ''}
            >
              修改
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <StudentNumber height={30} />
            <p className="ml-3">班主任</p>
          </div>
          <p>{myClass ? myClass.class_master : 'Loading...'}</p>
          <div>
            <input
              className="w-48 h-8 mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
              placeholder="在此输入修改"
              value={master}
              onChange={e => setMaster(e.target.value)}
            />
            <button
              className="ml-1 transition duration-300 ease-in-out hover:scale-110"
              onClick={() => {changeMaster(myClass?.class_name as string, master)}}
              disabled={master === ''}
            >
              修改
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <IdCard height={30} />
            <p className="ml-3">辅导员</p>
          </div>
          <p>{myClass ? myClass.class_guider : "Loading..."}</p>
          <div>
            <input
              className="w-48 h-8 mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
              placeholder="在此输入修改"
              value={guider}
              onChange={e => setGuider(e.target.value)}
            />
            <button
              className="ml-1 transition duration-300 ease-in-out hover:scale-110"
              onClick={() => {changeGuider(myClass?.class_name as string, guider)}}
              disabled={guider === ''}
            >
              修改
            </button>
          </div>
        </div>
      </div>

      {showMessage && (
        <div className="z-30 fixed top-10 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-800 text-white rounded shadow-lg">
          {message}
        </div>
      )}

      {doubleVerify && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-lg mb-4">确认删除该班级记录吗？</h2>
            <div className="flex justify-between">
              <button
                className="px-2 py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setDoubleVerify(false)} // 取消操作
              >
                取消
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => {
                  setDoubleVerify(false); // 关闭确认框
                  removeClass(myClass?.class_name as string); // 执行删除
                }}
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
