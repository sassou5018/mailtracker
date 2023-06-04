import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "@/utils/prisma";
import { Opens } from "@prisma/client";
export async function GET(request: NextRequest){
    const id = parseInt(request.nextUrl.pathname.split("/")[3]);
    const tracker = await prisma.email.findUnique({where: {id: id}});
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split("::ffff:")[1] : request.ip
    console.log(request.headers.get("x-forwarded-for")?.split("::ffff:"))
    if(tracker){
       const open = await prisma.opens.create({
        data:{
            emailId: tracker.id,
            ipAddress: ip || null,
        }
       })
       console.log(open);
    }
    const filepath = path.resolve(".", "public/1x1.png");
    const fileBuffer = fs.readFileSync(filepath);
    return new Response(fileBuffer, {status: 200, headers: {"Content-Type": "image/png", 'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'}})
}