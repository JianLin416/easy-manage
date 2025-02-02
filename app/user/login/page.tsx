'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");  // 控制提示信息的内容
  const [showMessage, setShowMessage] = useState(false);  // 控制提示信息是否显示

  async function sendLogin() {
    try {
      const response = await axios.post("/api/user/login", {
        user_account: account,
        user_password: password,
      });

      if (response.data.status === 'success') {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setAccount('');
        setPassword('');
        setMessage("登录成功，3秒后自动返回主页");  // 设置成功提示信息
        setShowMessage(true);

        // 3秒后跳转回主页，并隐藏提示信息
        setTimeout(() => {
          setShowMessage(false);
          window.location.reload();
        }, 3000)

      } else {
        setAccount('');
        setPassword('');
        setMessage("登录失败，请检查账号或密码");  // 设置失败提示信息
        setShowMessage(true);

        // 3秒后自动隐藏提示信息
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.error("登录请求出错:", error);
      setMessage("登录请求出错，请稍后重试");
      setShowMessage(true);

      // 3秒后自动隐藏提示信息
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) router.push("/");
  }, [])

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>

      {/* 登录表单 */}
      <div className="z-20 flex flex-col items-center justify-center mx-auto w-96 shadow-lg bg-yellow-50 rounded-md py-5"
        style={{ marginTop: "15vh" }}>
        <h1 className='text-3xl'>登录</h1>
        <input
          className="mt-5 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
          value={account}
          onChange={e => setAccount(e.target.value)}
          placeholder="输入账号"
        />
        <input
          type="password"
          className="mt-3 px-2 py-1 rounded-md border border-gray-200 focus:outline-none shadow-lg bg-yellow-150"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="输入密码"
        />
        <div className="mt-5 w-52 flex items-center">
          <Link href={'/user/forget'} className='mr-auto text-sm text-gray-500 cursor-pointer'>
            忘记密码
          </Link>
          <button
            className="ml-auto text-white text-sm hover:cursor-pointer bg-amber-700 px-3 py-1 rounded-md"
            disabled={account === '' || password === ''}
            onClick={sendLogin}
          >
            点击登录
          </button>
        </div>
      </div>

      {/* 提示信息（Toast） */}
      {showMessage && (
        <div className="z-30 fixed top-32 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-800 text-white rounded shadow-lg">
          {message}
        </div>
      )}
    </>
  );
}
