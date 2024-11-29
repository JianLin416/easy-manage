'use client'

import { useSearchParams } from "next/navigation"
import { myAxios } from '@/app/api/axios'
import { useEffect, useState } from "react"
import { Teacher } from "@prisma/client"
import moment from 'moment'
import Major from "@/public/icons/Major"
import StudentNumber from "@/public/icons/StudentNumber"
import Phone from "@/public/icons/Phone"
import IdCard from "@/public/icons/IdCard"
import Birthday from "@/public/icons/Birthday"
import Home from "@/public/icons/Home"
import Link from "next/link"
import Logout from "@/public/icons/Logout"
import { useRouter } from "next/navigation"

export default function Details() {

	type UserRole = 'admin' | 'teacher' | 'guider'

  const roleMap: Record<UserRole, string> = {
    admin: '管理员',
    teacher: '班主任',
    guider: '辅导员',
  }

  const router = useRouter()
  const searchParams = useSearchParams()
  const number = searchParams.get('id') as string
  const [teacher, setTeacher] = useState<Teacher>()
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [doubleVerify, setDoubleVerify] = useState(false)

  const [phone, setPhone] = useState('')
  const [job, setJob] = useState('')
  const [hire, setHire] = useState('')
  const [department, setDepartment] = useState('')
  const [idcard, setIdcard] = useState('')
  const [birthday, setBirthday] = useState('')
  const [home, setHome] = useState('')

	const [allDeps, setAllDeps] = useState<string[]>([])

  async function getTeacher(id: string) {
    const response = await myAxios.get(`/api/teacher/update/getTeacherInfo?id=${id}`)
    setTeacher(response.data.teacher)
  }

	async function getDepartments() {
		const response = await myAxios.get(`/api/getInfo/getDepartment`)

		setAllDeps(response.data.departments)
	}

  useEffect(() => {
    getTeacher(number)
		getDepartments()
  }, [])

  async function changePhone(id: number, phone: string) {
    const response = await myAxios.put(`/api/teacher/update/updatePhone?id=${id}&phone=${phone}`)

    if (response.data.status === 'success') {
      setShowMessage(true)
      setPhone('')
      setMessage('成功修改')
    }
    else {
      setShowMessage(true)
      setPhone('')
      setMessage('系统出错，请稍后再试')
    }
    setTimeout(() => {
      setShowMessage(false)
      window.location.reload()
    }, 1500)
  }

  async function changeJob(id: number, job: string) {
    const response = await myAxios.put(`/api/teacher/update/updateJob?id=${id}&job=${job}`)

    if (response.data.status === 'success') {
      setShowMessage(true)
      setPhone('')
      setMessage('成功修改')
    }
    else {
      setShowMessage(true)
      setPhone('')
      setMessage('系统出错，请稍后再试')
    }
    setTimeout(() => {
      setShowMessage(false)
      window.location.reload()
    }, 1500)
  }

  async function changeHire(id: number, hire: string) {
    const response = await myAxios.put(`/api/teacher/update/updateHire?id=${id}&hire=${hire}`)

    if (response.data.status === 'success') {
      setShowMessage(true)
      setPhone('')
      setMessage('成功修改')
    }
    else {
      setShowMessage(true)
      setPhone('')
      setMessage('系统出错，请稍后再试')
    }
    setTimeout(() => {
      setShowMessage(false)
      window.location.reload()
    }, 1500)
  }

  async function changeDepartment(id: number, department: string) {
    const response = await myAxios.put(`/api/teacher/update/updateDepartment?id=${id}&department=${department}`)

    if (response.data.status === 'success') {
      setShowMessage(true)
      setDepartment('')
      setMessage('成功修改')
    }
    else {
      setShowMessage(true)
      setDepartment('')
      setMessage('系统出错，请稍后再试')
    }
    setTimeout(() => {
      setShowMessage(false)
      window.location.reload()
    }, 1500)
  }

  async function changeID(id: number, card: string) {
    const response = await myAxios.put(`/api/teacher/update/updateIDcard?id=${id}&card=${card}`)

    if (response.data.status === 'success') {
      setShowMessage(true)
      setIdcard('')
      setMessage('成功修改')
    }
    else {
      setShowMessage(true)
      setIdcard('')
      setMessage('系统出错，请稍后再试')
    }
    setTimeout(() => {
      setShowMessage(false)
      window.location.reload()
    }, 1500)
  }

  async function changeBirth(id: number, birth: string) {
    const response = await myAxios.put(`/api/teacher/update/updateBirth?id=${id}&birth=${birth}`)

    if (response.data.status === 'success') {
      setShowMessage(true)
      setBirthday('')
      setMessage('成功修改')
    }
    else {
      setShowMessage(true)
      setBirthday('')
      setMessage('系统出错，请稍后再试')
    }
    setTimeout(() => {
      setShowMessage(false)
      window.location.reload()
    }, 1500)
  }

  async function changeHome(id: number, home: string) {
    const response = await myAxios.put(`/api/teacher/update/updateHome?id=${id}&home=${home}`)

    if (response.data.status === 'success') {
      setShowMessage(true)
      setHome('')
      setMessage('成功修改')
    }
    else {
      setShowMessage(true)
      setHome('')
      setMessage('系统出错，请稍后再试')
    }
    setTimeout(() => {
      setShowMessage(false)
      window.location.reload()
    }, 1500)
  }

  async function removeTeacher(id: number) {
    const response = await myAxios.delete(`/api/teacher/removeTeacher?id=${id}`)

    if (response.data.status === 'success') {
      setShowMessage(true)
      setMessage('成功删除该用户,3秒后自动返回主页')

      setTimeout(() => {
        setShowMessage(false)
        router.push('/')
      }, 3000)
    }
  }

	function selectDep(e: any) {
		setDepartment(e.target.value)
	}

	function selectJob(e: any) {
		setJob(e.target.value)
	}

  return (
    <div
      className="p-10 overflow-y-scroll rounded-xl w-1/2 z-20 bg-yellow-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={{ minWidth: '720px' }}
    >
      <div className="flex items-center">
        <h1 className="text-5xl">{teacher ? teacher.teacher_name : 'Loading...'}</h1>
        <p className="ml-3 self-end">{teacher ? (teacher.teacher_gender === 'man' ? '男' : '女') : 'Loading...'}</p>
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
            <Major height={30} />
            <p className="ml-3">系部</p>
          </div>
          <p>{teacher ? teacher.department_name : 'Loading...'}</p>
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
              onClick={() => { changeDepartment(teacher?.teacher_id as number, department) }}
              disabled={department === ''}
            >
              修改
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <Home height={30} />
            <p className="ml-3">职位</p>
          </div>
          <p>{teacher ? roleMap[teacher.teacher_job] : 'Loading...'}</p>
          <div>
						<select
							className="w-48 h-8 mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
							onClick={selectJob}
						>
							<option value="">请选择职位</option>
							<option value="admin">管理员</option>
							<option value="teacher">班主任</option>
							<option value="guider">辅导员</option>
						</select>	
            <button
              className="ml-1 transition duration-300 ease-in-out hover:scale-110"
              onClick={() => { changeJob(teacher?.teacher_id as number, job) }}
              disabled={job === ''}
            >
              修改
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <StudentNumber height={30} />
            <p className="ml-3">入职时间</p>
          </div>
          <p>{teacher ? moment(teacher.hire_date).format('YYYY-MM-DD') : 'Loading...'}</p>
          <div>
						<input
              className="mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
              placeholder="YYYY-MM-DD"
              value={hire}
              onChange={e => {
						    const value = e.target.value;
						    if (/^\d{0,4}(-\d{0,2}(-\d{0,2})?)?$/.test(value)) {
						      setHire(value); // 只有符合格式的内容才更新
						    }
						  }}
            />
            <button
              className="ml-1 transition duration-300 ease-in-out hover:scale-110"
              onClick={() => { changeHire(teacher?.teacher_id as number, hire) }}
              disabled={hire === ''}
            >
              修改
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <IdCard height={30} />
            <p className="ml-3">身份证</p>
          </div>
          <p>{teacher ? teacher.teacher_card : "Loading..."}</p>
          <div>
            <input
              className="w-48 h-8 mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
              placeholder="在此输入修改"
              value={idcard}
              onChange={e => setIdcard(e.target.value)}
            />
            <button
              className="ml-1 transition duration-300 ease-in-out hover:scale-110"
              onClick={() => { changeID(teacher?.teacher_id as number, idcard) }}
              disabled={idcard === ''}
            >
              修改
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <Phone height={30} />
            <p className="ml-3">电话</p>
          </div>
          <p>{teacher ? teacher.teacher_phone : 'Loading...'}</p>
          <div>
            <input
              className="w-48 h-8 mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
              placeholder="在此输入修改"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <button
              className="ml-1 transition duration-300 ease-in-out hover:scale-110"
              onClick={() => { changePhone(teacher?.teacher_id as number, phone) }}
              disabled={phone === ''}
            >
              修改
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <Birthday height={30} />
            <p className="ml-3">生日</p>
          </div>
          <p>{teacher ? moment(teacher.teacher_birth).format('YYYY-MM-DD') : 'Loading...'}</p>
          <div>
            <input
              className="w-48 h-8 mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
              placeholder="YYYY-MM-DD"
              value={birthday}
              onChange={e => {
    						const value = e.target.value;
    						if (/^\d{0,4}(-\d{0,2}(-\d{0,2})?)?$/.test(value)) {
      						setBirthday(value)
    						}
  						}}
            />
            <button
              className="ml-1 transition duration-300 ease-in-out hover:scale-110"
              onClick={() => { changeBirth(teacher?.teacher_id as number, birthday) }}
              disabled={birthday === ''}
            >
              修改
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <Home height={30} />
            <p className="ml-3">住址</p>
          </div>
          <p>{teacher ? teacher.teacher_home : 'Loading...'}</p>
          <div>
            <input
              className="w-48 h-8 mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
              placeholder="在此输入修改"
              value={home}
							onChange={e => setHome(e.target.value)}
            />
            <button
              className="ml-1 transition duration-300 ease-in-out hover:scale-110"
              onClick={() => { changeHome(teacher?.teacher_id as number, home) }}
              disabled={home === ''}
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
            <h2 className="text-lg mb-4">确认删除该教师记录吗？</h2>
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
                  removeTeacher(teacher?.teacher_id as number); // 执行删除
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
