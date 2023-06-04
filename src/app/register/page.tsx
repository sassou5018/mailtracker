
import { getServerSession, hash } from "@/utils/authUtils"
import prisma from "@/utils/prisma"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Register(){
     const session = await getServerSession()
     if(session) redirect('/')
    const registerAction = async(formData:FormData)=>{
        "use server"
        try{
        const username = formData.get('username')?.toString()
        const password = formData.get('password')?.toString()
        if(!username || username.length<1) throw new Error('Username is required')
        if(!password || password.length<1) throw new Error('Password is required')
        const user = await prisma.user.findUnique({where:{username:username}})
        if(user) throw new Error('User already exists')
        const newUser = await prisma.user.create({
            data:{
                username:username,
                password: await hash(password)
            }
        })
        redirect('/register/success')
    }catch(err){
        console.log("Error registering user", err)
        redirect('/register/error')
    }
    }
    return(
        <main>
            <div  className=" h-screen flex flex-col justify-center items-center bg-base-100">
                <div>
                    <h1 className="text-4xl">MailTrackJS</h1>
                </div>
                <div className="bg-base-300 rounded-xl">
                <h1 className="text-center text-xl p-2">Register</h1>
                <form action={registerAction} className="flex flex-col items-center p-5">
                    <input type="text" name="username" placeholder="username" required className="input input-bordered my-3" />
                    <input type="password" name="password" placeholder="password" required className="input input-bordered my-3" />
                    <div className="join join-vertical lg:join-horizontal my-3">
                    <Link href="/api/auth/signin" className="btn join-item">Log in</Link>
                    <button className="btn join-item btn-primary ">Register</button>
                    </div>
                </form>
                </div>
                <p>Open Source Email tracking and read reciept tool. More in <Link href="https://github.com/sassou5018/mailtracker" className="link">Github</Link></p>
            </div>
        </main>
    )
}