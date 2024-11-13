import { myAxios } from '@/app/api/axios'
import { useEffect, useState } from 'react'
import { Renamedclass } from '@prisma/client'
import React from 'react'
import Pagination from '@/app/components/Pagination'

export default function ClassInfo() {

  const [renamedClasses, setRenamedClasses] = useState<Renamedclass[]>([])
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalStudents: 0,
    limit: 0
  })
  const [c_name, setC_name] = useState('')
  const [departments, setDepartments] = useState([''])

  async function getAllClasses(page: number = 1, limit: number = 20) {
    const response = await myAxios.get(`/api/class/getAllClass?page=${page}&limit=${limit}`)
    setRenamedClasses(response.data.data.classes)
    setPagination(response.data.data.pagination)
    setDepartments(response.data.data.departments)
  }

  async function getClass(name: string) {
    const response = await myAxios.get(`/api/class/getClass?class_name=${name}`)
    if (response.data.status === 'error') setRenamedClasses([])
    else setRenamedClasses(response.data.data.classes)
    setPagination(response.data.data.pagination)
    setC_name('')
  }

  const [departmentDropdown, setDepartmentDropdown] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  // 切换显示/隐藏下拉菜单
  const toggleDepartmentDropdown = () => setDepartmentDropdown(!departmentDropdown);

  async function filtedClasses(department: string | null = null, page: number = 1, limit: number = 20) {
    const response = await myAxios.get(`/api/class/filtedClasses?department_name=${department}&page=${page}&limit=${limit}`)
    if (response.data.status === 'error') setRenamedClasses([])
    else setRenamedClasses(response.data.data.classes)
    setPagination(response.data.data.pagination)
  }

  useEffect(() => {
    getAllClasses()
  }, [])

  useEffect(() => {
    filtedClasses(selectedDepartment || '');
  }, [selectedDepartment]);

  return (
    <>
      <div className='mb-5'>
        <p className='pl-3 mb-2'>输入班名搜索指定班级</p>
        <input
          className="mr-5 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
          value={c_name}
          onChange={e => setC_name(e.target.value)}
          placeholder="输入班名"
        />
        <button className='mr-3 text-white hover:cursor-pointer bg-amber-700 px-3 py-1 rounded-md' disabled={c_name === ''} onClick={() => getClass(c_name)}>查询</button>
        <button onClick={() => {
          getAllClasses()
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
              <div
                className="absolute top-full rounded-md left-32  bg-yellow-100 text-black border shadow-lg mt-1 w-32 max-h-56 overflow-y-scroll">
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
          <th>班级</th>
          <th>人数</th>
          <th>班主任</th>
          <th>辅导员</th>
          <th></th>
        </tr>
        </thead>
        <tbody className="text-center">
        {renamedClasses.map((classes) => (
          <tr key={classes.class_id} className="h-12">
            <td>{classes.department_name}</td>
            <td>{classes.class_name}</td>
            <td>{classes.class_students}</td>
            <td>{classes.class_master}</td>
            <td>{classes.class_guider}</td>
            <td>
              <button className="transition duration-300 ease-in-out hover:scale-110">详情</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} changePage={(page: number) => selectedDepartment ? filtedClasses(selectedDepartment, page) : getAllClasses(page)} />
    </>
  )
}