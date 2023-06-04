import ViewsTable from "@/components/views/viewsTable"
import { getServerSession } from "@/utils/authUtils"
import prisma from "@/utils/prisma"
import Link from "next/link"
import { redirect } from "next/navigation"

interface PageProps{
    params: {
        id: string
    }
}
export default async function Page({params}: PageProps){
    const id = parseInt(params.id)
    const session = await getServerSession()
    if(!session || !session.user || !session.user.name) redirect('/unauthorized')
    const tracker = await prisma.email.findUnique({where:{id:id}, include: {owner: true}})
    if(!tracker) redirect('/404')
    if(tracker.owner.username !== session.user.name) redirect('/unauthorized')
    const opens = await prisma.opens.findMany({
        where:{
            emailId:id
        }
    })
    return(
        <div className="bg-base-100">
            <div className="flex justify-between p-3">
            <Link href="/" className="">{"<-"} Back</Link>
            <h1 className="text-center">Tracker {id}</h1>
            <div className=""/>
            </div>
            <ViewsTable data={opens} />
        </div>
    )
}