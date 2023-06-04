'use client';
import { signIn, signOut } from 'next-auth/react'
export default function SignInButton() {
    return(
        <>
        <button className="btn" onClick={()=>signIn()}>Sign in</button>
        <button className="btn" onClick={()=>signOut()}>Sign out</button>
        </>
    )
}

