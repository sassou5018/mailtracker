'use client'
import { signOut } from "next-auth/react"
export default function SignOutLink(){
    return(
        <span className="hover:bg-error-content" onClick={()=>signOut()}>Logout</span>
    )
}