import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/utils/prisma";
import { hash } from "@/utils/authUtils";


export async function POST(request: NextRequest){
    console.log("yeeeeeeeeeehaaaaaw")
    const {username, password} = await request.json();
    if(!username || !password) return NextResponse.json({status: 400, body: {error: "Username and password are required"}})
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
    if(user) return NextResponse.json({status: 400, body: {error: "Username already exists"}})
    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: await hash(password)
}
    })
    return NextResponse.json({status: 200, body: {message: "User created successfully"}})
}


