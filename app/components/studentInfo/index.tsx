import { myAxios } from '@/app/api/axios'
import { useEffect, useState } from 'react'
import { Student } from '@prisma/client'
import React from 'react'
import Pagination from '@/app/components/Pagination'
import { useRouter } from 'next/navigation'

export default function StudentInfo() {

	const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalStudents: 0,
    limit: 0
  })
  const [s_name, setS_name] = useState('')
  const [s_number, setS_number] = useState('')

  async function getAllStudents(page: number = 1, limit: number = 20) {
    const response = await myAxios.get(`/api/student/getAllStudent?page=${page}&limit=${limit}`)
    setStudents(response.data.data.students)
    setPagination(response.data.data.pagination)
  }

  async function getStudent(name: string, number: string) {
    let response
    if (name && number) {
      response = await myAxios.get(`/api/student/getStudent?student_name=${name}&student_number=${number}`)
    }
    else if (name) {
      response = await myAxios.get(`/api/student/getStudent?student_name=${name}`)
    }
    else {
      response = await myAxios.get(`/api/student/getStudent?student_number=${number}`)
    }
    if (response.data.status === 'error') setStudents([])
    else setStudents(response.data.data.students)
    setPagination(response.data.data.pagination)
    setS_number('')
    setS_name('')
  }

  type UserRole = 'admin' | 'teacher' | 'guider'

  const roleMap: Record<UserRole, string> = {
    admin: '管理员',
    teacher: '班主任',
    guider: '导员',
  }
  const [decodeToken, setDecodeToken] = useState<{ user_role: UserRole; user_name: string } | null>(null)

  useEffect(() => {
    getAllStudents()
    async function getUserInfo() {
      const response = await myAxios.post('/api/user/getInfo', {})
      setDecodeToken(response.data.data)
    }
    getUserInfo()
  }, [])

	function goDetails(number: string) {
		router.push(`/student/details?number=${number}`)
	}

	function goOperate(number: string) {
		router.push(`/student/operate?number=${number}`)
	}

  return (
    <>
      <div className='mb-5'>
        <p className='pl-3 mb-2'>输入姓名或学号搜索指定学生</p>
        <input
          className="mr-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
          value={s_name}
          onChange={e => setS_name(e.target.value)}
          placeholder="输入姓名"
        />
        <input
          className="mr-5 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
          value={s_number}
          onChange={e => setS_number(e.target.value)}
          placeholder="输入学号"
        />
        <button className='mr-3 text-white hover:cursor-pointer bg-amber-700 px-3 py-1 rounded-md' disabled={s_name === '' && s_number === ''} onClick={() => getStudent(s_name, s_number)}>查询</button>
        <button onClick={() => {
          getAllStudents()
        }}>返回</button>
      </div>
      <table className="table-auto w-full mx-auto">
        <thead className="bg-yellow-100">
          <tr className="h-10">
            <th>系部</th>
            <th>专业</th>
            <th>班级</th>
            <th>姓名</th>
            <th>性别</th>
            <th>学号</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {students.map((student) => (
            <tr key={student.student_id} className="h-12">
              <td>{student.department_name}</td>
              <td>{student.student_major}</td>
              <td>{student.class_name}</td>
              <td>{student.student_name}</td>
              <td>{student.student_gender === 'man' ? '男' : '女'}</td>
              <td>{student.student_number}</td>
              <td>
                <button
									className="transition duration-300 ease-in-out hover:scale-110"
									onClick={() => goDetails(student.student_number)}
									>详情</button>
                {decodeToken.user_role === 'admin' || decodeToken?.user_role === 'teacher' ? (
                  <button onClick={() => goOperate(student.student_number)} className="ml-10 transition duration-300 ease-in-out hover:scale-110">操作</button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} changePage={getAllStudents} />
    </>
  )
}
