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

export default function Details() {

	const searchParams = useSearchParams()
	const number = searchParams.get('number') as string
	const [student, setStudent] = useState<Student>()

	async function getStudent(number: string) {
		const response = await myAxios.get(`/api/student/getStudent?student_number=${number}`)
		setStudent(response.data.data.students[0])
	}

	useEffect(() => {
		getStudent(number)
	}, [])

	return (

		<div
    	className="p-10 overflow-y-scroll rounded-xl w-1/2 z-20 bg-yellow-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
			<div className="flex items-center">
				<h1 className="text-5xl">{student? student.student_name : 'Loading...'}</h1>
				<p className="ml-3 self-end">{student? (student.student_gender === 'man'? '男' : '女') : 'Loading...'}</p>
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
				</div>
				<div className="flex items-center justify-between mb-5">
					<div className="flex items-center">
						<Major height={30} />
						<p className="ml-3">系部</p>
					</div>
					<p>{student ? student.student_major : 'Loading...'}</p>
				</div>
				<div className="flex items-center justify-between mb-5">
					<div className="flex items-center">
						<StudentNumber height={30} />
						<p className="ml-3">学号</p>
					</div>
					<p>{student ? student.student_number : 'Loading...'}</p>
				</div>
				<div className="flex items-center justify-between mb-5">
					<div className="flex items-center">
						<IdCard height={30} />
						<p className="ml-3">身份证</p>
					</div>
					<p>{student ? student.student_card : "Loading..."}</p>
				</div>
				<div className="flex items-center justify-between mb-5">
					<div className="flex items-center">	
						<Birthday height={30} />
						<p className="ml-3">生日</p>
					</div>
					<p>{student ? moment(student.student_birth).format('YYYY-MM-DD') : 'Loading...'}</p>
				</div>
				<div className="flex items-center justify-between mb-5">
					<div className="flex items-center">	
						<Home height={30} />
						<p className="ml-3">住址</p>
					</div>
					<p>{student ? student.student_home : 'Loading...'}</p>
				</div>
		  </div>
		</div>
	)

}
