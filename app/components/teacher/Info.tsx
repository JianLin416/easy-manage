import { myAxios } from '@/app/api/axios'
import { useEffect, useState } from 'react'
import { teacher } from '@prisma/client'
import React from 'react'
import Pagination from '@/app/components/Pagination'
import { useRouter } from 'next/navigation'

export default function TeacherInfo() {

  const router = useRouter()

  const [teachers, setTeachers] = useState<teacher[]>([])
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalStudents: 0,
    limit: 0
  })
  const [t_name, setT_name] = useState('')

  async function getAllTeachers(page: number = 1, limit: number = 20) {
    const response = await myAxios.get(`/api/teacher/getAllTeacher?page=${page}&limit=${limit}`)
    setTeachers(response.data.data.teachers)
    setPagination(response.data.data.pagination)
  }

  async function getTeacher(name: string) {
    const response = await myAxios.get(`/api/teacher/getTeacher?teacher_name=${name}`)
    if (response.data.status === 'error') setTeachers([])
    else setTeachers(response.data.data.teachers)
    setPagination(response.data.data.pagination)
    setT_name('')
  }

  type UserRole = 'admin' | 'teacher' | 'guider'

  const roleMap: Record<UserRole, string> = {
    admin: '管理员',
    teacher: '班主任',
    guider: '辅导员',
  }
  const [decodeToken, setDecodeToken] = useState<{ user_role: UserRole; user_name: string } | null>(null)

  useEffect(() => {
    getAllTeachers()
    async function getUserInfo() {
      const response = await myAxios.post('/api/getInfo/getUser', {})
      setDecodeToken(response.data.data)
    }
    getUserInfo()
  }, [])

  function goDetails(id: number) {
    router.push(`/teacher/details?id=${id}`)
  }

  function goOperate(id: number) {
    router.push(`/teacher/operate?id=${id}`)
  }

  return (
    <>
      <div className='mb-5'>
        <p className='pl-3 mb-2'>输入姓名搜索指定教师</p>
        <input
          className="mr-5 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
          value={t_name}
          onChange={e => setT_name(e.target.value)}
          placeholder="输入姓名"
        />
        <button className='mr-3 text-white hover:cursor-pointer bg-amber-700 px-3 py-1 rounded-md' disabled={t_name === ''} onClick={() => getTeacher(t_name)}>查询</button>
        <button onClick={() => {
          getAllTeachers()
        }}>返回</button>
      </div>
      <table className="table-auto w-full mx-auto">
        <thead className="bg-yellow-100">
          <tr className="h-10">
            <th>系部</th>
            <th>姓名</th>
            <th>性别</th>
            <th>职位</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {teachers.map((teacher) => (
            <tr key={teacher.teacher_id} className="h-12">
              <td>{teacher.department_name}</td>
              <td>{teacher.teacher_name}</td>
              <td>{teacher.teacher_gender === 'man' ? '男' : '女'}</td>
              <td>{roleMap[teacher.teacher_job]}</td>
              <td>
                <button
                  className="transition duration-300 ease-in-out hover:scale-110"
                  onClick={() => goDetails(teacher.teacher_id)}
                >
                  详情
                </button>
                {decodeToken.user_role === 'admin' ? (
                  <button
                    className="ml-10 transition duration-300 ease-in-out hover:scale-110"
                    onClick={() => goOperate(teacher.teacher_id)}
                  >
                    操作
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} changePage={getAllTeachers} />
    </>
  )
}
