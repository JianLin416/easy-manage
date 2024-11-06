import axios from 'axios'
import {useEffect, useState} from 'react'
import {Student} from "@prisma/client";
import React from 'react';

export default function StudentInfo() {

  const [students, setStudents] = useState<Student[]>([])
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalStudents: 0,
    limit: 0
  })

  async function getAllStudents(page: number = 1, limit: number = 20) {
    const response = await axios.get('/api/student/getAllStudent?' + 'page=' + page + '&limit=' + limit)
    setStudents(response.data.data.students)
    setPagination(response.data.data.pagination)
  }

  useEffect(() => {
    getAllStudents()
  }, [])

  return (
    <>
      <StudentTable students={students} />
    </>
  )
}

function StudentTable({ students }: { students: Student[] }) {
  return (
    <table className='table-auto w-full'>
      <thead className='bg-yellow-100'>
        <tr className='h-10'>
          <th>系部</th>
          <th>专业</th>
          <th>班级</th>
          <th>姓名</th>
          <th>性别</th>
          <th>学号</th>
          <th></th>
        </tr>
      </thead>
      <tbody className='text-center'>

      {students.map(student => (
        <tr key={student.student_id} className='h-12'>
          <td>{student.student_department}</td>
          <td>{student.student_major}</td>
          <td>{student.class_name}</td>
          <td>{student.student_name}</td>
          <td>{student.student_gender}</td>
          <td>{student.student_number}</td>
          <td>
            <button className='hover:text-indigo-700'>详情</button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

