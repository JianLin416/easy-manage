'use client'

import { myAxios } from '@/app/api/axios'
import { useEffect, useState } from "react"
import moment from 'moment'
import { Student_student_gender } from '@prisma/client'

export default function Details() {

	const [showMessage, setShowMessage] = useState(false)
	const [message, setMessage] = useState('')

	const [name, setName] = useState('')
	const [gender, setGender] = useState<Student_student_gender>('man')
	const [phone, setPhone] = useState('')
	const [department, setDepartment] = useState('')
	const [major, setMajor] = useState('')
	const [number, setNumber] = useState('')
	const [IDcard, setIDcard] = useState('')
	const [birth, setBirth] = useState('')
	const [home, setHome] = useState('')

	const [allDeps, setAllDeps] = useState<string[]>([])

	async function getDepartments() {
		const response = await myAxios.get(`/api/getInfo/getDepartment`)

		setAllDeps(response.data.departments)
	}

	useEffect(() => {
		getDepartments()
	}, [])

	async function submit() {

		const response = await myAxios.post('/api/student/newStudent', {
			name: name,
			gender: gender,
			phone: phone,
			department: department,
			major: major,
			number: number,
			IDcard: IDcard,
			birth: moment(birth).format("YYYY-MM-DD"),
			home: home
		})

		if (response.data.status === 'success') {
			setShowMessage(true)
			setMessage('成功添加学生')
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
				<h1 className="text-4xl mb-10">录入学生信息</h1>
				<div className="flex justify-between w-1/2">
					<div className="flex flex-col items-center">
						<div className="flex flex-col mb-4">
							<p className="ml-3 mb-1">姓名</p>
							<input
								className="w-48 h-8 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
								placeholder="请输入学生姓名"
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</div>
						<div className="flex flex-col mb-4">
							<p className="ml-3 mb-1">性别</p>
							<select
								onChange={(e) => {
									setGender(e.target.value as Student_student_gender)
								}}
								className="w-48 h-8 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
							>
								<option value="">请选择性别</option>
								<option value={"man"}>男</option>
								<option value={"woman"}>女</option>
							</select>
						</div>
						<div className="flex flex-col mb-4">
							<p className="ml-3 mb-1">电话</p>
							<input
								className="w-48 h-8 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
								placeholder="请输入学生电话"
								value={phone}
								onChange={e => setPhone(e.target.value)}
							/>
						</div>
						<div className="flex flex-col mb-4">
							<p className="ml-3 mb-1">系部</p>
							<select
								onChange={selectDep}
								className="w-48 h-8 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
							>
								<option value="">请选择系部</option>
								{allDeps.map((deps) => (
									<option key={deps} value={deps}>{deps}</option>
								))}
							</select>
						</div>
						<div className="flex flex-col mb-4">
							<p className="ml-3 mb-1">专业</p>
							<input
								className="w-48 h-8 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
								placeholder="请输入学生专业"
								value={major}
								onChange={e => setMajor(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex flex-col items-center">
						<div className="flex flex-col mb-4">
							<p className="ml-3 mb-1">学号</p>
							<input
								className="w-48 h-8 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
								placeholder="请输入学号"
								value={number}
								onChange={e => setNumber(e.target.value)}
							/>
						</div>
						<div className="flex flex-col mb-4">
							<p className="ml-3 mb-1">身份证</p>
							<input
								className="w-48 h-8 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
								placeholder="请输入身份证"
								value={IDcard}
								onChange={e => setIDcard(e.target.value)}
							/>
						</div>
						<div className="flex flex-col mb-4">
							<p className="ml-3 mb-1">生日</p>
							<input
								className="w-48 h-8 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
								placeholder="YYYY-MM-DD"
								value={birth}
								onChange={e => {
									const value = e.target.value;
									if (/^\d{0,4}(-\d{0,2}(-\d{0,2})?)?$/.test(value)) {
										setBirth(value)
									}
								}}
							/>
						</div>
						<div className="flex flex-col mb-4">
							<p className="ml-3 mb-1">住址</p>
							<input
								className="w-48 h-8 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
								placeholder="请输入住址"
								value={home}
								onChange={e => setHome(e.target.value)}
							/>
						</div>
					</div>
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


