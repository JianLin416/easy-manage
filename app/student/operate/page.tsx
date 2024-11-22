'use client'

import { useSearchParams } from "next/navigation"
import { myAxios } from '@/app/api/axios'
import { useEffect, useState } from "react"
import { Student } from "@prisma/client"
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
	
	const router = useRouter()
	const searchParams = useSearchParams()
	const number = searchParams.get('number') as string
	const [student, setStudent] = useState<Student>()
	const [showMessage, setShowMessage] = useState(false)
	const [message, setMessage] = useState('')
	const [doubleVerify, setDoubleVerify] = useState(false)

	const [phone, setPhone] = useState('')
	const [department, setDepartment] = useState('')
	const [studentNumber, setStudentNumber] = useState('')
	const [idcard, setIdcard] = useState('')
	const [birthday, setBirthday] = useState('')
	const [home, setHome] = useState('')


	async function getStudent(number: string) {
		const response = await myAxios.get(`/api/student/getStudent?student_number=${number}`)
		setStudent(response.data.data.students[0])
	}

	useEffect(() => {
		getStudent(number)
	}, [])

	async function changePhone(card: string, phone: string) {
		const response = await myAxios.put(`/api/student/update/updatePhone?student_card=${card}&phone=${phone}`)

		if(response.data.status === 'success') {
			setShowMessage(true)
			setMessage('成功修改')
		}
		else {
			setShowMessage(true)
			setMessage('系统出错，请稍后再试')
		}
		setTimeout(() => {
      setShowMessage(false)
    }, 1500)
	}

	async function changeDepartment(card: string, department: string) {
		const response = await myAxios.put(`/api/student/update/updateDepartment?student_card=${card}&department=${department}`)

		if(response.data.status === 'success') {
			setShowMessage(true)
			setMessage('成功修改')
		}
		else {
			setShowMessage(true)
			setMessage('系统出错，请稍后再试')
		}
		setTimeout(() => {
      setShowMessage(false)
    }, 1500)
	}

	async function changeNumber(card: string, number: string) {
		const response = await myAxios.put(`/api/student/update/updateNumber?student_card=${card}&number=${number}`)

		if(response.data.status === 'success') {
			setShowMessage(true)
			setMessage('成功修改')
		}
		else {
			setShowMessage(true)
			setMessage('系统出错，请稍后再试')
		}
		setTimeout(() => {
      setShowMessage(false)
    }, 1500)
	}

	async function changeID(card: string, id: string) {
		const response = await myAxios.put(`/api/student/update/updateIDcard?student_card=${card}&card=${id}`)

		if(response.data.status === 'success') {
			setShowMessage(true)
			setMessage('成功修改')
		}
		else {
			setShowMessage(true)
			setMessage('系统出错，请稍后再试')
		}
		setTimeout(() => {
      setShowMessage(false)
    }, 1500)
	}

	async function changeBirth(card: string, birth: string) {
		const response = await myAxios.put(`/api/student/update/updateBirth?student_card=${card}&birth=${birth}`)

		if(response.data.status === 'success') {
			setShowMessage(true)
			setMessage('成功修改')
		}
		else {
			setShowMessage(true)
			setMessage('系统出错，请稍后再试')
		}
		setTimeout(() => {
      setShowMessage(false)
    }, 1500)
	}

	async function changeHome(card: string, home: string) {
		const response = await myAxios.put(`/api/student/update/updateHome?student_card=${card}&home=${home}`)

		if(response.data.status === 'success') {
			setShowMessage(true)
			setMessage('成功修改')
		}
		else {
			setShowMessage(true)
			setMessage('系统出错，请稍后再试')
		}
		setTimeout(() => {
      setShowMessage(false)
    }, 1500)
	}

	async function removeStudent(card: string) {
		const response = await myAxios.delete(`/api/student/removeStudent?student_card=${card}`)

		if(response.data.status === 'success') {
			setShowMessage(true)
			setMessage('成功删除该用户,3秒后自动返回主页')
			
			setTimeout(() => {
        setShowMessage(false)
        router.push('/')
      }, 3000)
		}
	}

	return (

		<div
    	className="p-10 overflow-y-scroll rounded-xl w-1/2 z-20 bg-yellow-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
			<div className="flex items-center">
				<h1 className="text-5xl">{student? student.student_name : 'Loading...'}</h1>
				<p className="ml-3 self-end">{student? (student.student_gender === 'man'? '男' : '女') : 'Loading...'}</p>
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
						<p className="ml-3">电话</p>
					</div>
					<p>{student ? student.student_phone : 'Loading...'}</p>
					<div>
						<input
							className="mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
							placeholder="在此输入修改"
							value={phone}
							onChange={e => setPhone(e.target.value)}
						/>
						<button
							className="ml-1 transition duration-300 ease-in-out hover:scale-110"
							onClick={() => {changePhone(student?.student_card as string, phone)}}
							disabled={phone === ''}
						>
							修改
						</button>
					</div>
					</div>
				<div className="flex items-center justify-between mb-5">
					<div className="flex items-center">
						<Major height={30} />
						<p className="ml-3">系部</p>
					</div>
					<p>{student ? student.student_major : 'Loading...'}</p>
					<div>
						<input
							className="mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
							placeholder="在此输入修改"
							value={department}
							onChange={e => setDepartment(e.target.value)}
						/>
						<button
							className="ml-1 transition duration-300 ease-in-out hover:scale-110"
							onClick={() => {changeDepartment(student?.student_card as string, department)}}
							disabled={department === ''}
						>
							修改
						</button>	
					</div>	
				</div>
				<div className="flex items-center justify-between mb-5">
					<div className="flex items-center">
						<StudentNumber height={30} />
						<p className="ml-3">学号</p>
					</div>
					<p>{student ? student.student_number : 'Loading...'}</p>
					<div>
						<input
							className="mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
							placeholder="在此输入修改"
							value={studentNumber}
							onChange={e => setStudentNumber(e.target.value)}
						/>
						<button
							className="ml-1 transition duration-300 ease-in-out hover:scale-110"
							onClick={() => {changeNumber(student?.student_card as string, studentNumber)}}
							disabled={studentNumber === ''}
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
					<p>{student ? student.student_card : "Loading..."}</p>
					<div>
						<input
							className="mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
							placeholder="在此输入修改"
							value={idcard}
							onChange={e => setIdcard(e.target.value)}
						/>
						<button
							className="ml-1 transition duration-300 ease-in-out hover:scale-110"
							onClick={() => {changeID(student?.student_card as string, idcard)}}
							disabled={idcard === ''}
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
					<p>{student ? moment(student.student_birth).format('YYYY-MM-DD') : 'Loading...'}</p>
					<div>
						<input
							className="mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
							placeholder="在此输入修改"
							value={birthday}
							onChange={e => setBirthday(e.target.value)}
						/>
						<button
							className="ml-1 transition duration-300 ease-in-out hover:scale-110"
							onClick={() => {changeBirth(student?.student_card as string, birthday)}}
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
					<p>{student ? student.student_home : 'Loading...'}</p>
					<div>
						<input
							className="mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
							placeholder="在此输入修改"
							value={home}
							onChange={e => setHome(e.target.value)}
						/>
						<button
							className="ml-1 transition duration-300 ease-in-out hover:scale-110"
							onClick={() => {changeHome(student?.student_card as string, home)}}
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
            <h2 className="text-lg mb-4">确认删除该学生记录吗？</h2>
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
                  removeStudent(student?.student_card as string); // 执行删除
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

