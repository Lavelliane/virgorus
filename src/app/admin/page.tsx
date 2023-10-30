"use client"

import { signOut } from "next-auth/react"

export default function AdminPage() {
  return (
    <>
        <div>Admin Page</div>
        <button onClick={() => signOut()}>Sign out</button>
    </>
  )
}