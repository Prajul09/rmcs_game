import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        //console.log(req.body, req.method)
        if(req.method === 'POST'){
            const user =  await prisma.user.create({
                data: req.body
            })
            //console.log(user)
             res.status(201).json({status:true,message: "User created successfully",user:user})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({status:false,message: "Create User Failed"})
        //console.log("Create User Failed", error)
    }
}