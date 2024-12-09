'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const LogoutButton = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await fetch("api/auth/logout", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        cache:"no-store",
        credentials: "include"
      });

      if (response.redirected) {
        const redirectUrl = response.url;
        await signOut({ redirect: false });
        router.push(`${redirectUrl}`);
      }
      
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