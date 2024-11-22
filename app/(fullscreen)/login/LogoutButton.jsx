'use client'

import { signOut } from "next-auth/react"


const LogoutButton = () => {
  const test = async () => {
    await signOut();
  }

  return (
    <div>
      <button onClick={test}>로그아웃!</button>
    </div>
  )
}

export default LogoutButton