'use server'
import bcrypt from 'bcryptjs';
import { getServerSession as getNextSession } from 'next-auth';
import { authOptions } from './nextAuthConfig';
export const hash = async (password: string)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const compare = async (password: string, hashedPassword: string)=>{
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

export const getServerSession = async ()=>{
    return await getNextSession(authOptions)
}