import { getServerSession } from "@/utils/authUtils";
import sendEmail from "@/utils/nodeMailer";
import prisma from "@/utils/prisma";
import { NextRequest } from "next/server";
import { FormInterface } from "@/utils/nodeMailer";

export async function POST(request:NextRequest){
    const body: FormInterface = await request.json();
    try{
        const session = await getServerSession();
        if(!session || !session.user || !session.user.name ) throw new Error("Unauthorized");
        const user = await prisma.user.findUnique({
            where: {
                username: session?.user?.name
            }
        });
        if(!user) throw new Error("Unauthorized");
        const newTracker = await prisma.email.create({
            data:{
                subject: body.subject,
                ownerId: user?.id
            }
        });
        console.log(body.host)
        await sendEmail({
            host: body.host,
            port: body.port,
            username: body.username,
            password: body.password,
            recipients: body.recipients,
            subject: body.subject,
            contents: body.contents,
            trackerLink: `${process.env.NEXT_PUBLIC_BASE_URL}/api/tracker/${newTracker.id}`
        });
        return new Response(JSON.stringify(newTracker), {status: 200, headers: {"Content-Type": "application/json"}})
    }catch(err){
        console.log(err);
        return new Response(JSON.stringify({error: "Error"}), {status: 500, headers: {"Content-Type": "application/json"}})
    }
}