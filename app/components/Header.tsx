import Logo from "@/public/Logo";

const Header = () => {
  return (
    <div className='w-full h-16 shadow'>
      <div className='w-9/12 h-full mx-auto flex items-center'>
        <Logo height={40}/>
        <p className='ml-4 text-lg font-bold'>easyManage</p>
        <p className='ml-auto'>【管理员】</p>
        <p className='ml-5'>用户名111</p>
        <p className='ml-5'>退出登陆</p>
      </div>
    </div>
  )
}

export default Header
