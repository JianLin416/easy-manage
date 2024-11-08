import axios from 'axios'
import { useEffect, useState } from 'react'
import { Student } from '@prisma/client'
import React from 'react'
import Pagination from '@/app/components/Pagination'

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
      <p>搜索指定学生</p>
      <input placeholder='输入名字'/>
      <input placeholder='输入学号'/>
      <button onClick={() => console.log(666)}>查询</button>
      <StudentTable students={students}/>
      <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} changePage={getAllStudents}/>
    </>
  )
}

function StudentTable({students}: { students: Student[] }) {
  return (
    <table className='table-auto w-full mx-auto'>
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
            <td>{student.student_gender === 'man'? '男': '女'}</td>
            <td>{student.student_number}</td>
            <td>
              <button className='mr-3.5 hover:text-red-700'>操作</button>
              <button className='hover:text-indigo-700'>详情</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}