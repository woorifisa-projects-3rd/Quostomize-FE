'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const LogoutButton = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        cache: "no-store",
        credentials:"include",
        body: {
          message: "로그아웃 요청"
        }
      });
      
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await signOut({ redirect: false });    
      router.push('/login');
    }
  }

  return (
    <div className="active:bg-slate-400">
      <button onClick={logout}>로그아웃</button>
    </div>
  )
}

export default LogoutButton