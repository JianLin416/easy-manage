'use client'

import Logo from "@/public/icons/Logo"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { myAxios } from "@/app/api/axios"

export default function Header() {
  type UserRole = 'admin' | 'teacher' | 'guider'

  const roleMap: Record<UserRole, string> = {
    admin: '管理员',
    teacher: '班主任',
    guider: '辅导员',
  }
  const pathname = usePathname()
  const router = useRouter()
  const [decodeToken, setDecodeToken] = useState<{ user_role: UserRole; user_name: string } | null>(null)

  useEffect(() => {
    async function getUserInfo() {
      const token = localStorage.getItem('token')
      if (!token) {
        if (!pathname.startsWith('/user/')) router.push('/user/login')
        return
      }
      try {
        const response = await myAxios.post('/api/getInfo/getUser', {})
        if (response.data.status === 'error') {
          router.push('/user/login')
        } else {
          setDecodeToken(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching user info:', error)
        router.push('/user/login')
      }
    }

    getUserInfo()
  }, [pathname, router])

  function logout() {
    localStorage.removeItem("token")
    window.location.reload()
  }

  return (
    <div className='w-full h-16 shadow'>
      <div className='w-9/12 h-full mx-auto flex items-center'>
        <Link href={'/'} className='flex items-center'>
          <Logo height={40} />
          <p className='ml-4 text-lg font-bold'>easyManage</p>
        </Link>
        {decodeToken ? (
          <div className='ml-auto'>
            <a className='cursor-pointer'>【{roleMap[decodeToken.user_role]}】</a>
            <a className='cursor-pointer mx-5'>{decodeToken.user_name}</a>
            <a className='cursor-pointer' onClick={logout}>退出登陆</a>
          </div>
        ) : (
          <div className='ml-auto'>
            <a className='cursor-pointer mr-5'>【未登录】</a>
            <a className='cursor-pointer' onClick={() => router.push('/user/login')}>点击登陆</a>
          </div>
        )}
      </div>
    </div>
  )
}
