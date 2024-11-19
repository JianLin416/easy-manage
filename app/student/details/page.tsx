'use client'

import { useSearchParams } from "next/navigation"
import { myAxios } from '@/app/api/axios'
import { useEffect, useState } from "react"
import { Student } from "@prisma/client"
import moment from 'moment'

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
    	className="p-5 overflow-y-scroll rounded-xl w-8/12 h-4/6 z-20 bg-yellow-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
		  <div className='flex flex-col'>
		    <p>card: {student ? student.student_card : "Loading..."}</p>
				<p>name: {student ? student.student_name : 'Loading...'}</p>
				<p>home: {student ? student.student_home : 'Loading...'}</p>
				<p>birth: {student ? moment(student.student_birth).format('YYYY-MM-DD') : 'Loading...'}</p>
				<p>comes: {student ? student.student_comes : 'Loading...'}</p>
				<p>major: {student ? student.student_major : 'Loading...'}</p>
				<p>phone: {student ? student.student_phone : 'Loading...'}</p>
				<p>number: {student ? student.student_number : 'Loading...'}</p>
				<p>gender: {student ? student.student_gender : 'Loading...'}</p>
		  </div>
		</div>
	)

}
