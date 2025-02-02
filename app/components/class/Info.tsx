import { myAxios } from '@/app/api/axios'
import { useEffect, useState } from 'react'
import { Class } from '@prisma/client'
import React from 'react'
import Pagination from '@/app/components/Pagination'
import { useRouter } from 'next/navigation'

export default function ClassInfo() {

	const router = useRouter()

	const [renamedClasses, setRenamedClasses] = useState<Class[]>([])
	const [pagination, setPagination] = useState({
		currentPage: 0,
		totalPages: 0,
		totalStudents: 0,
		limit: 0
	})
	const [c_name, setC_name] = useState('')

	async function getAllClasses(page: number = 1, limit: number = 20) {
		const response = await myAxios.get(`/api/class/getAllClass?page=${page}&limit=${limit}`)
		setRenamedClasses(response.data.data.classes)
		setPagination(response.data.data.pagination)
	}

	async function getClass(name: string) {
		const response = await myAxios.get(`/api/class/getClass?class_name=${name}`)
		if (response.data.status === 'error') setRenamedClasses([])
		else setRenamedClasses(response.data.data.classes)
		setPagination(response.data.data.pagination)
		setC_name('')
	}

	type UserRole = 'admin' | 'teacher' | 'guider'

	const [decodeToken, setDecodeToken] = useState<{ user_role: UserRole; user_name: string } | null>(null)

	useEffect(() => {
		getAllClasses()
		async function getUserInfo() {
			const response = await myAxios.post('/api/getInfo/getUser', {})
			setDecodeToken(response.data.data)
		}
		getUserInfo()
	}, [])

	function goOperate(class_name: string) {
		router.push(`/class/operate?class_name=${class_name}`)
	}

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
				}}>返回</button>
			</div>
			<table className="table-auto w-full mx-auto">
				<thead className="bg-yellow-100">
					<tr className="h-10">
						<th>系部</th>
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
								{decodeToken.user_role === 'admin' ? (
									<button
										className="ml-10 transition duration-300 ease-in-out hover:scale-110"
										onClick={() => goOperate(classes.class_name)}
									>操作</button>
								) : null}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} changePage={getAllClasses} />
		</>
	)
}
