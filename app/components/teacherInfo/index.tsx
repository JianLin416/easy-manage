import { myAxios } from '@/app/api/axios'
import { useEffect, useState } from 'react'
import { teacher } from '@prisma/client'
import React from 'react'
import Pagination from '@/app/components/Pagination'

export default function TeacherInfo() {

  const [teachers, setTeachers] = useState<teacher[]>([])
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalStudents: 0,
    limit: 0
  })
  const [t_name, setT_name] = useState('')
  const [departments, setDepartments] = useState([''])

  async function getAllTeachers(page: number = 1, limit: number = 20) {
    const response = await myAxios.get(`/api/teacher/getAllTeacher?page=${page}&limit=${limit}`)
    setTeachers(response.data.data.teachers)
    setPagination(response.data.data.pagination)
    setDepartments(response.data.data.departments)
  }

  async function getTeacher(name: string) {
    const response = await myAxios.get(`/api/teacher/getTeacher?teacher_name=${name}`)
    if (response.data.status === 'error') setTeachers([])
    else setTeachers(response.data.data.teachers)
    setPagination(response.data.data.pagination)
    setT_name('')
  }

  const [departmentDropdown, setDepartmentDropdown] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  // 切换显示/隐藏下拉菜单
  const toggleDepartmentDropdown = () => setDepartmentDropdown(!departmentDropdown);

  async function filteTeachers(department: string | null = null, page: number = 1, limit: number = 20) {
    const response = await myAxios.get(`/api/teacher/filtedTeachers?department_name=${department}&page=${page}&limit=${limit}`)
    if (response.data.status === 'error') setTeachers([])
    else setTeachers(response.data.data.teachers)
    setPagination(response.data.data.pagination)
  }

  useEffect(() => {
    getAllTeachers()
  }, [])

  useEffect(() => {
    filteTeachers(selectedDepartment || '');
  }, [selectedDepartment]);

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
          setSelectedDepartment(null)
          setDepartmentDropdown(false)
        }}>返回</button>
      </div>
      <table className="table-auto w-full mx-auto">
        <thead className="bg-yellow-100">
          <tr className="h-10">
            <th className="relative">
              <button onClick={toggleDepartmentDropdown} className="hover:cursor-pointer">
                系部 ▼
              </button>
              {departmentDropdown && (
                <div className="absolute top-full rounded-md left-32  bg-yellow-100 text-black border shadow-lg mt-1 w-32 max-h-56 overflow-y-scroll">
                  <ul>
                    {departments.map((department) => (
                      <li
                        key={department}
                        onClick={() => setSelectedDepartment(department)} // 点击时设置选中的department
                        className={`rounded-md w-full cursor-pointer text-center py-2 ${selectedDepartment === department ? 'bg-amber-700 text-white' : '' // 选中时的样式
                          }`}
                      >
                        {department}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </th>
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
              <td>{teacher.teacher_job}</td>
              <td>
                <button className="transition duration-300 ease-in-out hover:scale-110">详情</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} changePage={(page: number) => selectedDepartment ? filteTeachers(selectedDepartment, page) : getAllTeachers(page)} />
    </>
  )
}