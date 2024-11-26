'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const LogoutButton = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await fetch('/auth/logout', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        credentials: "include"
      });
      
      await signOut({ redirect: false });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <div>
      <button onClick={logout}>로그아웃</button>
    </div>
  )
}

export default LogoutButton