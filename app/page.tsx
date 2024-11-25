'use client'

import React, { Suspense, useState, useEffect } from "react"
import ClassList from "@/public/icons/ClassList";
import StudentList from "@/public/icons/StudentList";
import TeacherList from "@/public/icons/TeacherList";
import { myAxios } from '@/app/api/axios'
import { usePathname, useRouter } from "next/navigation"

const ClassInfo = React.lazy(() => import('./components/classInfo/index'))
const StudentInfo = React.lazy(() => import('./components/studentInfo/index'))
const TeacherInfo = React.lazy(() => import('./components/teacherInfo/index'))

export default function Page() {
  const [clicked, setClicked] = useState('')  // 存储点击的按钮类型
  const [isOpen, setIsOpen] = useState(false) // 控制窗口显示

	const [class_sum, setClass_sum] = useState(0)
	const [student_sum, setStudent_sum] = useState(0)
	const [teacher_sum, setTeacher_sum] = useState(0) 

  function getView() {
    switch (clicked) {
      case 'classInfo':
        return <ClassInfo />
      case 'studentInfo':
        return <StudentInfo />
      case 'teacherInfo':
        return <TeacherInfo />
      default:
        return <></>
    }
  }

  // 点击按钮时更新点击的组件并显示窗口
  function handleClick(type: any) {
    if (localStorage.getItem('token')) {
      function handleClick(type: any) {
        setClicked(type)
        setIsOpen(true)
      }

      handleClick(type)
    }

    else {
      function handleClick(type: any) {
        return
      }
    }
  }

  useEffect(() => {
    async function getSum() {
      const token = localStorage.getItem('token')
      if (!token) return
      try {
        const response = await myAxios.get('/api/getInfo/getMainPageSum')
        if (response.data.status === 'error') return
        else {
          setClass_sum(response.data.data.class_sum)
					setStudent_sum(response.data.data.student_sum)
					setTeacher_sum(response.data.data.teacher_sum)
        }
      }
			catch (error) {
				return
			}
    }

    getSum()
  }, [])

	type UserRole = 'admin' | 'teacher' | 'guider'

  const roleMap: Record<UserRole, string> = {
    admin: '管理员',
    teacher: '班主任',
    guider: '导员',
  }
  const pathname = usePathname()
  const router = useRouter()
  const [decodeToken, setDecodeToken] = useState<{ user_role: UserRole; user_name: string } | null>(null)

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await myAxios.post('/api/getInfo/getUser', {})
        setDecodeToken(response.data.data)
      } catch (error) {
        console.error('Error fetching user info:', error)
      }
    }

    getUserInfo()
  }, [pathname, router])

	function addClass() {
		if(decodeToken?.user_role === 'admin') {
			
			function addClass() {
				router.push('/class/addClass')
			}

			addClass()
		} else {
			function addClass() {
				return
			}
		}
	}

	function addStudent() {
		if(decodeToken?.user_role != 'guider') {
			
			function addStudent() {
				router.push('/student/addStudent')
			}

			addStudent()
		} else {
			function addStudent() {
				return
			}
		}
	}

	function addTeacher() {
		if(decodeToken?.user_role === 'admin') {
			
			function addTeacher() {
				router.push('/teacher/addTeacher')
			}

			addTeacher()
		} else {
			function addTeacher() {
				return
			}
		}
	}

  return (
    <div className='w-full flex flex-col'>
			<div className="w-full flex">
				<div
					className='flex px-6 py-5 rounded-lg w-1/3 h-60 text-3xl shadow-lg cursor-pointer bg-fuchsia-700 text-white transition duration-300 ease-in-out hover:scale-105'
					onClick={addClass}	
				>
        	<div className='mt-auto w-full flex items-end'>
          	<h2 className='text-lg'>共计</h2>
						<span className='text-6xl ml-2'>{class_sum}</span>
						<span className='text-lg'>班</span>
						{decodeToken?.user_role === 'admin' ? (
							<p className='mt-5 ml-auto'>新增班级</p>
						) : null}
        	</div>
      	</div>
      	<div
					className='flex px-6 py-5 rounded-lg w-1/3 h-60 text-3xl mx-5 shadow-lg cursor-pointer bg-violet-700 text-white transition duration-300 ease-in-out hover:scale-105'
					onClick={addStudent}
				>
        	<div className='mt-auto w-full flex items-end'>
          	<h2 className='text-lg'>学生共</h2>
						<span className='text-6xl ml-2'>{student_sum}</span>
						<span className='text-lg'>人</span>
          	{decodeToken?.user_role != 'guider' ? (
							<p className='mt-5 ml-auto'>添加学生</p>
						) : null}
        	</div>
      	</div>
      	<div
					className='flex px-6 py-5 rounded-lg w-1/3 h-60 text-3xl shadow-lg cursor-pointer bg-pink-700 text-white transition duration-300 ease-in-out hover:scale-105'
					onClick={addTeacher}
				>
        	<div className='mt-auto w-full flex items-end'>
          	<h2 className='text-lg'>教师共</h2>
						<span className='text-6xl ml-2'>{teacher_sum}</span>
						<span className='text-lg'>人</span>
						{decodeToken?.user_role === 'admin' ? (
							<p className='mt-5 ml-auto'>添加教师</p>
						) : null}
        	</div>
      	</div>
			</div>
			<div className="w-full flex mt-5">
				<div onClick={() => handleClick('classInfo')} className='flex flex-col px-6 py-5 rounded-lg w-1/3 h-60 text-3xl shadow-lg cursor-pointer bg-sky-700 text-white transition duration-300 ease-in-out hover:scale-105'>
        	<div className='mt-auto'>
          	<ClassList height={70} />
          	<p className='mt-5'>班级查询与概览</p>
        	</div>
      	</div>
      	<div onClick={() => handleClick('studentInfo')}
        	className='flex px-6 py-5 rounded-lg w-1/3 h-60 text-3xl mx-5 shadow-lg cursor-pointer bg-emerald-700 text-white transition duration-300 ease-in-out hover:scale-105'>
        	<div className='mt-auto'>
          	<StudentList height={70} />
          	<p className='mt-5'>学生查询与概览</p>
        	</div>
      	</div>
      	<div onClick={() => handleClick('teacherInfo')}
        	className='flex px-6 py-5 rounded-lg w-1/3 h-60 text-3xl shadow-lg cursor-pointer bg-orange-600 text-white transition duration-300 ease-in-out hover:scale-105'>
        	<div className='mt-auto'>
          	<TeacherList height={70} />
          	<p className='mt-5'>教师查询与概览</p>
        	</div>
      	</div>
			</div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div
            className="p-5 overflow-y-scroll rounded-xl w-8/12 h-4/6 z-20 bg-yellow-50 absolute top-1/2 left-1/2 transform 
          -translate-x-1/2 -translate-y-1/2"
          >
            <Suspense fallback={<div>加载中...</div>}>
              {getView()}
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}
