
import { revalidatePath } from 'next/cache';
import prisma from '@/utils/prisma';
import TrackerTableAutoFill from '@/components/trackers/trackerTableAutoFill';
import SignInButton from '@/components/authButtons';
import { getServerSession } from '@/utils/authUtils';
import { redirect } from 'next/navigation';
import Link from 'next/link';



export default async function Home() {
  async function createNewTracker(data: FormData){
    'use server'
    const session = await getServerSession()
    if(!session || !session.user || !session.user.name) throw new Error('Not logged in')
    const user = await prisma.user.findUnique({where:{username:session?.user.name}})
    if(!user) throw new Error('User not found')
    const subject = data.get('subject')?.toString()
    if(!subject || subject.length<1) throw new Error('Subject is required')
    const newTracker = await prisma.email.create({
      data:{
        subject:subject,
        ownerId: user?.id
      }
    })
    revalidatePath('/')
  }

  
  return (
    <main className="bg-base-100 flex flex-col justify-center items-center">
      <div className="w-full p-1">
      {/* @ts-expect-error Async Server Component */}
      <TrackerTableAutoFill />
      </div>
      <form action={createNewTracker} className="mt-5">
        <div className="join join-vertical md:join-horizontal">
        <input type="text" className='input input-bordered join-item w-32 md:w-fit' name="subject" placeholder='subject' required />
        <button type="submit" className='btn btn-primary join-item w-32 md:w-fit'>Create new tracker</button>
        </div>
      </form>
      <div className="mt-5 tooltip tooltip-bottom" data-tip="Use your smtp email to automatically append the tracker.">
      <Link href="/send" className="btn btn-sm">Use Mail Sender</Link>
      </div>
    </main>
  )
}
