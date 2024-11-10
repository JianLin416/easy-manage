'use client'

import Logo from "@/public/Logo";
import Link from "next/link";

const Header = () => {

  return (
    <div className='w-full h-16 shadow'>
      <div className='w-9/12 h-full mx-auto flex items-center'>
        <Link href={'/'} className='flex items-center'>
          <Logo height={40} />
          <p className='ml-4 text-lg font-bold'>easyManage</p>
        </Link>
        <a className='cursor-pointer ml-auto'>【管理员】</a>
        <a className='cursor-pointer ml-5'>用户名111</a>
        <a className='cursor-pointer ml-5'>退出登陆</a>
      </div>
    </div>
  )
}

export default Header
